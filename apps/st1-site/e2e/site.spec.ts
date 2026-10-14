import path from "node:path";

import { expect, test, type Page } from "@playwright/test";

const PAGES = ["/", "/decks/owner", "/decks/advertiser", "/decks/internal", "/report", "/story", "/decisions"];
const DECKS = [
  { id: "owner", title: "Ohtani’s Dodgers contract", file: "st1-owner-agency" },
  { id: "advertiser", title: "Two modes. One standard.", file: "st1-us-advertiser" },
  { id: "internal", title: "Greg versus Fred", file: "st1-greg-versus-fred" },
];

// scripts/verify-st1-site.sh sets ST1_PROOF_DIR when a proof bundle is being written.
async function proofShot(page: Page, name: string, fullPage = false): Promise<void> {
  const dir = process.env.ST1_PROOF_DIR;
  if (dir !== undefined && dir !== "") {
    await page.screenshot({ path: path.join(dir, "screenshots", name), fullPage });
  }
}

test("home page shows the contract figures and links the three decks", async ({ page }, testInfo) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Ohtani’s Dodgers contract");
  const tiles = page.locator(".tile");
  await expect(tiles).toHaveCount(4);
  await expect(tiles.nth(0)).toContainText("$700m");
  await expect(tiles.nth(1)).toContainText("$20m");
  await expect(tiles.nth(2)).toContainText("$680m");
  await expect(tiles.nth(3)).toContainText("5%");
  for (const deck of DECKS) {
    await expect(page.locator(".deck-card").getByRole("link", { name: deck.title })).toHaveAttribute(
      "href",
      `/decks/${deck.id}`,
    );
  }
  await expect(page.locator('.deck-card[data-deck="internal"] .fiction-tag')).toHaveText("Fiction");
  await proofShot(page, `home-${testInfo.project.name}.png`, true);
});

for (const deck of DECKS) {
  test(`${deck.id} deck renders ten slides and offers both downloads`, async ({ page, request }) => {
    await page.goto(`/decks/${deck.id}`);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(deck.title);
    await expect(page.locator("section.slide")).toHaveCount(10);
    await expect(page.locator(".slide-number").last()).toHaveText("10 / 10");

    const pdf = await request.get(`/downloads/${deck.file}.pdf`);
    expect(pdf.status()).toBe(200);
    expect(pdf.headers()["content-type"]).toContain("application/pdf");
    expect((await pdf.body()).subarray(0, 5).toString()).toBe("%PDF-");

    const pptx = await request.get(`/downloads/${deck.file}.pptx`);
    expect(pptx.status()).toBe(200);
    expect((await pptx.body()).subarray(0, 2).toString()).toBe("PK");
  });
}

test("every slide of the internal deck carries the fiction label, and no other deck does", async ({ page }, testInfo) => {
  await page.goto("/decks/internal");
  await expect(page.locator(".fiction-banner")).toContainText("This is fiction.");
  await expect(page.locator("section.slide .slide-foot .fiction-tag")).toHaveCount(10);
  await expect(page.locator("section.slide .slide-foot .fiction-tag").first()).toHaveText("FICTIONAL SATIRE");
  await proofShot(page, `internal-deck-${testInfo.project.name}.png`);

  for (const id of ["owner", "advertiser"]) {
    await page.goto(`/decks/${id}`);
    await expect(page.locator(".fiction-tag")).toHaveCount(0);
    await expect(page.locator(".fiction-banner")).toHaveCount(0);
  }
});

test("the payment chart shows a value on hover or tap, on focus, and as a table", async ({ page }, testInfo) => {
  await page.goto("/decks/owner");
  const chart = page.locator("section.slide").nth(4).locator("figure.chart");
  await expect(chart.locator("figcaption")).toContainText("Contract payment timing");
  await expect(chart.locator(".chart-bar")).toHaveCount(20);
  // Only the two bars where the payment changes carry a printed value.
  await expect(chart.locator(".chart-value")).toHaveText(["$2m", "$68m"]);

  const deferred = chart.getByRole("img", { name: "2034: $68m" });
  await deferred.scrollIntoViewIfNeeded();
  if (testInfo.project.name === "phone") {
    await deferred.tap();
  } else {
    await deferred.hover();
  }
  await expect(chart.locator(".chart-tip")).toHaveText("2034$68m");
  await proofShot(page, `owner-chart-${testInfo.project.name}.png`);

  await chart.getByRole("img", { name: "2024: $2m" }).focus();
  await expect(chart.locator(".chart-tip")).toHaveText("2024$2m");

  await chart.getByText("Show the data as a table").click();
  await expect(chart.locator(".chart-table tbody tr")).toHaveCount(20);
  await expect(chart.locator(".chart-table tbody tr").last()).toHaveText("2043$68m");
});

test("the finance report renders its tables and both model charts", async ({ page }, testInfo) => {
  await page.goto("/report");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Ohtani valuation and U.S. endorsement report");
  expect(await page.locator(".prose table").count()).toBeGreaterThan(0);
  await expect(page.locator(".report-charts figure.chart")).toHaveCount(2);
  await expect(page.locator(".prose").getByRole("link", { name: "finance.json" }).first()).toHaveAttribute(
    "href",
    "https://github.com/Etdev2/sweet-potato-fried-test/blob/main/ST-1/finance.json",
  );
  await proofShot(page, `report-${testInfo.project.name}.png`);
});

test("the story is labelled as fiction and the decisions page renders", async ({ page }) => {
  await page.goto("/story");
  await expect(page.locator(".fiction-banner")).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Greg, Fred, and the sort order");
  await page.goto("/decisions");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("ST-1 decisions");
});

test("an unknown deck is a 404", async ({ page }) => {
  const response = await page.goto("/decks/secret");
  expect(response?.status()).toBe(404);
});

test("no page scrolls sideways or logs an error", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") {
      errors.push(message.text());
    }
  });
  page.on("pageerror", (error) => {
    errors.push(error.message);
  });
  for (const url of PAGES) {
    await page.goto(url);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow, `${url} is wider than the screen`).toBeLessThanOrEqual(0);
  }
  expect(errors).toEqual([]);
});
