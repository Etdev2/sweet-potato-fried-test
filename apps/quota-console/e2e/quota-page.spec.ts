import { expect, test, type Locator, type Page } from "@playwright/test";
import { sampleDocument, serveSample, withCredentials, withRemaining } from "./fixtures";

const card = (page: Page, provider: string): Locator => page.getByRole("article", { name: `${provider} summary` });
const row = (page: Page, id: string): Locator => page.locator(`[data-credential="${id}"]`);
const limit = (page: Page, id: string, limitId: string): Locator => row(page, id).locator(`[data-limit="${limitId}"]`);

// The filled share of a progress bar, measured from the rendered boxes.
async function filledShare(bar: Locator): Promise<number> {
  const track = await bar.boundingBox();
  const fill = await bar.locator(".bar-fill").boundingBox();
  if (track === null || fill === null) throw new Error("The bar has no rendered box.");
  return fill.width / track.width;
}

test.describe("layout from the committed sample", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await expect(page.getByTestId("page-meta")).toHaveText("10 credentials · 10 loaded");
  });

  test("sidebar lists the four groups with Quota Management selected", async ({ page }) => {
    const nav = page.getByRole("navigation", { name: "Console sections" });
    for (const group of ["Operate", "Gateway", "Observe", "Control"]) {
      await expect(nav.getByRole("heading", { name: group })).toBeVisible();
    }
    await expect(nav.getByRole("link", { name: "Quota Management" })).toHaveAttribute("aria-current", "page");
    await expect(nav.locator('[aria-current="page"]')).toHaveCount(1);
  });

  test("tabs carry per-provider counts", async ({ page }) => {
    const tabs = page.getByRole("tablist", { name: "Providers" }).getByRole("tab");
    await expect(tabs).toHaveText(["All10", "CClaude5", "AAntigravity0", "CCodex3", "XxAI1", "KKimi1"]);
    await expect(page.getByRole("tab", { name: /^All/ })).toHaveAttribute("aria-selected", "true");
  });

  test("one summary card per provider that has credentials", async ({ page }) => {
    await expect(page.getByRole("article")).toHaveCount(4);
    await expect(card(page, "Antigravity")).toHaveCount(0);

    const claude = card(page, "Claude");
    await expect(claude).toContainText("5 credentials");
    await expect(claude).toContainText("7-day Fable 5");
    await expect(claude.getByTestId("card-total")).toHaveText("409%");
    await expect(claude).toContainText("of 500%");
    await expect(claude).toContainText("in 1 day · 09/12, 23:00");
    await expect(claude.getByTestId("card-secondary-total")).toHaveText("454%");

    await expect(card(page, "Codex").getByTestId("card-total")).toHaveText("17%");
    await expect(card(page, "Codex")).toContainText("of 300%");
    await expect(card(page, "Codex")).toContainText("in 2 days · 09/14, 18:23");
    await expect(card(page, "Kimi").getByTestId("card-total")).toHaveText("100%");
  });

  test("a card bar has one segment per credential, each as wide as its percentage", async ({ page }) => {
    const segments = card(page, "Claude").getByRole("group", { name: "Claude 7-day Fable 5 by credential" }).getByRole("progressbar");
    await expect(segments).toHaveCount(5);
    const expected = [58, 100, 100, 51, 100];
    for (const [index, percent] of expected.entries()) {
      await expect(segments.nth(index)).toHaveAttribute("aria-valuenow", String(percent));
      expect(await filledShare(segments.nth(index))).toBeCloseTo(percent / 100, 2);
    }
    await expect(segments.nth(0).locator(".bar-fill")).toHaveAttribute("data-tone", "mid");
    await expect(segments.nth(1).locator(".bar-fill")).toHaveAttribute("data-tone", "high");
    await expect(card(page, "Codex").getByRole("progressbar").first().locator(".bar-fill")).toHaveAttribute("data-tone", "low");
  });

  test("a missing measurement reads as unavailable, not as zero", async ({ page }) => {
    const xai = card(page, "xAI");
    await expect(xai.getByTestId("card-total")).toHaveText("--");
    await expect(xai.getByTestId("card-total").getByLabel("unavailable")).toBeVisible();
    const bar = xai.getByRole("progressbar");
    await expect(bar).toHaveAttribute("aria-valuetext", "unavailable");
    await expect(bar).not.toHaveAttribute("aria-valuenow");
    await expect(bar.locator(".bar-fill")).toHaveCount(0);
  });

  test("each Claude credential row shows three limits and a refresh action", async ({ page }) => {
    const group = page.getByRole("region", { name: "Claude credentials" });
    await expect(group.getByRole("heading", { name: "Claude 5" })).toBeVisible();
    await expect(group.locator(".row")).toHaveCount(5);

    const first = row(page, "claude-1");
    await expect(first.locator(".file-name")).toHaveText("claude-t•••@l•••.example.json");
    await expect(first.locator(".plan")).toHaveText("Max");
    await expect(first.locator(".limit-head")).toHaveText(["7-day Fable 558%", "5-hour limit100%", "7-day limit79%"]);
    await expect(limit(page, "claude-1", "seven-day-model")).toContainText("in 1 day · 09/13, 13:00");
    await expect(limit(page, "claude-1", "five-hour")).toContainText("No reset pending");
    await expect(first.getByRole("button", { name: /^Refresh quota for/ })).toBeEnabled();

    expect(await filledShare(limit(page, "claude-1", "seven-day-model").getByRole("progressbar"))).toBeCloseTo(0.58, 2);
    expect(await filledShare(limit(page, "claude-1", "seven-day").getByRole("progressbar"))).toBeCloseTo(0.79, 2);
    expect(await filledShare(limit(page, "claude-4", "five-hour").getByRole("progressbar"))).toBeCloseTo(0.99, 2);
  });

  test("the summary card expands to show the other limits", async ({ page }) => {
    const claude = card(page, "Claude");
    await expect(claude.getByRole("progressbar")).toHaveCount(5);
    await claude.getByRole("button", { name: "Show" }).click();
    await expect(claude.getByRole("button", { name: "Hide" })).toHaveAttribute("aria-expanded", "true");
    await expect(claude.getByRole("group", { name: "Claude 5-hour limit by credential" }).getByRole("progressbar")).toHaveCount(5);
    await expect(claude.getByRole("progressbar")).toHaveCount(15);
    await claude.getByRole("button", { name: "Hide" }).click();
    await expect(claude.getByRole("progressbar")).toHaveCount(5);
    // Codex has a single limit, so there is nothing to expand.
    await expect(card(page, "Codex").getByRole("button")).toHaveCount(0);
  });

  test("the sidebar collapses and expands", async ({ page }) => {
    const label = page.getByRole("navigation").getByText("Logs Viewer");
    await expect(label).toBeVisible();
    await page.getByRole("button", { name: "Collapse sidebar" }).click();
    await expect(label).toBeHidden();
    await page.getByRole("button", { name: "Expand sidebar" }).click();
    await expect(label).toBeVisible();
  });
});

test.describe("tabs", () => {
  test("filter the cards and the credential rows", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".row")).toHaveCount(10);

    await page.getByRole("tab", { name: /Codex/ }).click();
    await expect(page.getByRole("tab", { name: /Codex/ })).toHaveAttribute("aria-selected", "true");
    await expect(page.getByRole("article")).toHaveCount(1);
    await expect(card(page, "Codex")).toBeVisible();
    await expect(page.locator(".row")).toHaveCount(3);
    await expect(page.locator(".file-name")).toHaveText([
      "codex-c•••@c•••.example.json",
      "codex-c•••@c•••.example.json",
      "codex-c•••@c•••.example.json",
    ]);

    await page.getByRole("tab", { name: /Antigravity/ }).click();
    await expect(page.getByText("No Antigravity credentials.")).toBeVisible();
    await expect(page.getByRole("article")).toHaveCount(0);
    await expect(page.locator(".row")).toHaveCount(0);

    await page.getByRole("tab", { name: /^All/ }).click();
    await expect(page.getByRole("article")).toHaveCount(4);
    await expect(page.locator(".row")).toHaveCount(10);
  });
});

test.describe("Show emails", () => {
  test("reveals the fake addresses and hides them again", async ({ page }) => {
    await page.goto("/");
    const names = page.getByRole("region", { name: "Claude credentials" }).locator(".file-name");
    const toggle = page.getByRole("button", { name: "Show emails" });
    await expect(toggle).toHaveAttribute("aria-pressed", "false");
    await expect(names.first()).toHaveText("claude-t•••@l•••.example.json");
    await expect(page.getByText("tess@lumen.example")).toHaveCount(0);

    await toggle.click();
    const hide = page.getByRole("button", { name: "Hide emails" });
    await expect(hide).toHaveAttribute("aria-pressed", "true");
    await expect(names).toHaveText([
      "claude-tess@lumen.example.json",
      "claude-tom@prism.example.json",
      "claude-tara@tidal.example.json",
      "claude-theo@tundra.example.json",
      "claude-tilly@tango.example.json",
    ]);
    await expect(row(page, "kimi-1").locator(".file-name")).toHaveText("kimi-kit@kelp.example.json");

    await hide.click();
    await expect(names.first()).toHaveText("claude-t•••@l•••.example.json");
    await expect(page.locator(".file-name").filter({ hasText: "tess" })).toHaveCount(0);
  });
});

test.describe("values come from the data", () => {
  test("different data gives different counts, card totals and bar widths", async ({ page }) => {
    const sample = sampleDocument();
    const changed = withCredentials(withRemaining(sample, "claude-1", "seven-day-model", 20), (credentials) =>
      credentials
        .filter((credential) => credential.id !== "claude-5" && credential.id !== "codex-3")
        .map((credential) => {
          if (credential.id === "claude-2") return { ...credential, state: "failed" };
          if (credential.id === "kimi-1") return { ...credential, provider: "antigravity" };
          return credential;
        }),
    );
    await serveSample(page, [changed]);
    await page.goto("/");

    await expect(page.getByTestId("page-meta")).toHaveText("8 credentials · 7 loaded");
    await expect(page.getByRole("tablist").getByRole("tab")).toHaveText([
      "All8",
      "CClaude4",
      "AAntigravity1",
      "CCodex2",
      "XxAI1",
      "KKimi0",
    ]);
    await expect(page.getByRole("navigation").locator(".badge")).toHaveText("8");

    const claude = card(page, "Claude");
    await expect(claude).toContainText("4 credentials");
    await expect(claude.getByTestId("card-total")).toHaveText("271%");
    await expect(claude).toContainText("of 400%");
    const segments = claude.getByRole("progressbar");
    await expect(segments).toHaveCount(4);
    expect(await filledShare(segments.first())).toBeCloseTo(0.2, 2);
    await expect(segments.first().locator(".bar-fill")).toHaveAttribute("data-tone", "low");

    await expect(card(page, "Codex")).toContainText("of 200%");
    await expect(card(page, "Kimi")).toHaveCount(0);
    await expect(card(page, "Antigravity").getByTestId("card-total")).toHaveText("100%");

    expect(await filledShare(limit(page, "claude-1", "seven-day-model").getByRole("progressbar"))).toBeCloseTo(0.2, 2);
    await expect(row(page, "claude-2")).toContainText("Failed to load");
  });
});

test.describe("Refresh", () => {
  test("reads the file again and shows the new values", async ({ page }) => {
    const sample = sampleDocument();
    const later = {
      ...withCredentials(withRemaining(sample, "codex-1", "weekly", 64), (credentials) =>
        credentials.filter((credential) => credential.id !== "kimi-1"),
      ),
      generatedAt: "2026-09-12T06:30:00Z",
    };
    const served = await serveSample(page, [sample, later]);
    await page.goto("/");
    await expect(page.getByTestId("page-meta")).toHaveText("10 credentials · 10 loaded");
    await expect(page.getByTestId("as-of")).toHaveText("Data as of 09/11, 20:00");
    await expect(card(page, "Codex").getByTestId("card-total")).toHaveText("17%");
    expect(served.requests()).toBe(1);

    await page.getByRole("button", { name: "Refresh", exact: true }).click();

    await expect(page.getByTestId("page-meta")).toHaveText("9 credentials · 9 loaded");
    await expect(page.getByTestId("as-of")).toHaveText("Data as of 09/12, 06:30");
    await expect(card(page, "Codex").getByTestId("card-total")).toHaveText("64%");
    await expect(card(page, "Kimi")).toHaveCount(0);
    // The same reset instant is now closer, because the document is newer.
    await expect(card(page, "Claude")).toContainText("in 16 hours · 09/12, 23:00");
    expect(served.requests()).toBe(2);
  });

  test("shows a clear error when the refreshed file is bad, and recovers on retry", async ({ page }) => {
    const sample = sampleDocument();
    await serveSample(page, [sample, "{ this is not json", sample]);
    await page.goto("/");
    await expect(page.locator(".row")).toHaveCount(10);

    await page.getByRole("button", { name: "Refresh", exact: true }).click();
    const alert = page.getByRole("alert");
    await expect(alert.getByRole("heading")).toHaveText("data/quota.sample.json is not valid JSON");
    await expect(page.locator(".row")).toHaveCount(0);
    await expect(page.getByTestId("page-meta")).toHaveText("No credentials loaded");

    await alert.getByRole("button", { name: "Try again" }).click();
    await expect(page.getByRole("alert")).toHaveCount(0);
    await expect(page.locator(".row")).toHaveCount(10);
  });
});

test.describe("Refresh quota on one row", () => {
  test("updates that credential only", async ({ page }) => {
    const sample = sampleDocument();
    const later = withRemaining(withRemaining(sample, "claude-1", "seven-day-model", 12), "claude-2", "seven-day-model", 40);
    const served = await serveSample(page, [sample, later]);
    await page.goto("/");
    await expect(limit(page, "claude-1", "seven-day-model").locator(".limit-head")).toHaveText("7-day Fable 558%");

    await row(page, "claude-1").getByRole("button", { name: /^Refresh quota for/ }).click();

    await expect(row(page, "claude-1").locator(".row-notice")).toHaveText("Refreshed");
    await expect(limit(page, "claude-1", "seven-day-model").locator(".limit-head")).toHaveText("7-day Fable 512%");
    expect(await filledShare(limit(page, "claude-1", "seven-day-model").getByRole("progressbar"))).toBeCloseTo(0.12, 2);
    // claude-2 also changed in the file, but nobody refreshed that row.
    await expect(limit(page, "claude-2", "seven-day-model").locator(".limit-head")).toHaveText("7-day Fable 5100%");
    // 409 - 58 + 12: the card follows the rows it summarises.
    await expect(card(page, "Claude").getByTestId("card-total")).toHaveText("363%");
    await expect(page.locator(".row-notice")).toHaveCount(1);
    expect(served.requests()).toBe(2);
  });

  test("reports a failed refresh on the row and keeps the old values", async ({ page }) => {
    const sample = sampleDocument();
    await serveSample(page, [sample, 503]);
    await page.goto("/");
    await row(page, "codex-1").getByRole("button", { name: /^Refresh quota for/ }).click();

    await expect(row(page, "codex-1").getByRole("alert")).toHaveText("Could not load data/quota.sample.json");
    await expect(limit(page, "codex-1", "weekly").locator(".limit-head")).toHaveText("Weekly limit17%");
    await expect(page.locator(".row")).toHaveCount(10);
  });

  test("says so when the credential has gone from the data", async ({ page }) => {
    const sample = sampleDocument();
    const later = withCredentials(sample, (credentials) => credentials.filter((credential) => credential.id !== "xai-1"));
    await serveSample(page, [sample, later]);
    await page.goto("/");
    await row(page, "xai-1").getByRole("button", { name: /^Refresh quota for/ }).click();
    await expect(row(page, "xai-1").getByRole("alert")).toHaveText("This credential is no longer in the data. Refresh the page.");
  });
});

test.describe("bad data fails with a clear error", () => {
  test("the committed malformed fixture names every fault", async ({ page }) => {
    await page.goto("/?source=malformed");
    const alert = page.getByRole("alert");
    await expect(alert.getByRole("heading")).toHaveText("data/quota.malformed.json does not match the quota format");
    const faults = alert.getByRole("listitem");
    await expect(faults).toHaveCount(5);
    await expect(faults.nth(0)).toContainText("generatedAt:");
    await expect(faults.nth(1)).toContainText("credentials[0].limits[0].remaining.percent:");
    await expect(faults.nth(2)).toContainText("credentials[1].provider:");
    await expect(faults.nth(4)).toContainText("credentials[1].limits[0].reset:");
    await expect(page.getByRole("tablist")).toHaveCount(0);
    await expect(page.getByRole("article")).toHaveCount(0);
    await expect(page.getByRole("button", { name: "Show emails" })).toBeDisabled();
  });

  test("a missing file reports its HTTP status", async ({ page }) => {
    await serveSample(page, [404]);
    await page.goto("/");
    const alert = page.getByRole("alert");
    await expect(alert.getByRole("heading")).toHaveText("Could not load data/quota.sample.json");
    await expect(alert).toContainText("The server answered with HTTP status 404.");
  });

  test("the built site answers 404 for a data file that does not exist", async ({ request }) => {
    const response = await request.get("/data/quota.local.json");
    expect(response.status()).toBe(404);
  });

  test("an unknown source name is refused without a request", async ({ page }) => {
    const dataRequests: string[] = [];
    page.on("request", (request) => {
      const target = new URL(request.url());
      if (target.pathname.startsWith("/data/") || target.hostname === "evil.example") dataRequests.push(request.url());
    });
    await page.goto("/?source=https://evil.example/quota.json");
    const alert = page.getByRole("alert");
    await expect(alert.getByRole("heading")).toHaveText('Unknown data source "https://evil.example/quota.json"');
    await expect(alert).toContainText("Use one of: sample, malformed.");
    await expect(page.getByRole("button", { name: "Refresh", exact: true })).toBeDisabled();
    expect(dataRequests).toEqual([]);
  });
});
