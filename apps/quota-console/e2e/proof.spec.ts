import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { expect, test } from "@playwright/test";

// Captures the proof screenshots. It runs only when QUOTA_PROOF_DIR names the
// folder to write to, which scripts/prove-quota-console.sh does.
const proofDirectory = process.env.QUOTA_PROOF_DIR;

test.describe("proof screenshots", () => {
  test.skip(proofDirectory === undefined || proofDirectory === "", "QUOTA_PROOF_DIR is not set");

  const shot = (name: string): string => {
    const directory = join(proofDirectory ?? "", "screenshots");
    mkdirSync(directory, { recursive: true });
    return join(directory, name);
  };

  test("the page from the sample data", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".row")).toHaveCount(10);
    await page.screenshot({ path: shot("quota-all.png"), fullPage: true });
  });

  test("emails shown and the Claude card expanded", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Show emails" }).click();
    await page.getByRole("tab", { name: /Claude/ }).click();
    await page.getByRole("article", { name: "Claude summary" }).getByRole("button", { name: "Show" }).click();
    await expect(page.locator(".row")).toHaveCount(5);
    await page.screenshot({ path: shot("quota-claude-emails-shown.png"), fullPage: true });
  });

  test("the error for malformed data", async ({ page }) => {
    await page.goto("/?source=malformed");
    await expect(page.getByRole("alert")).toBeVisible();
    await page.screenshot({ path: shot("quota-malformed-error.png") });
  });
});
