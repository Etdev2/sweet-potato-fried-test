import { readFileSync, readdirSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { parseQuotaDocument } from "../src/domain/quota-document";
import { countByProvider, countLoaded } from "../src/domain/summary";

const dataDirectory = new URL("../public/data/", import.meta.url);

function read(name: string): unknown {
  const parsed: unknown = JSON.parse(readFileSync(new URL(name, dataDirectory), "utf8"));
  return parsed;
}

describe("committed data files", () => {
  it("are exactly the sample and the malformed fixture", () => {
    expect(readdirSync(dataDirectory).sort()).toEqual(["quota.malformed.json", "quota.sample.json"]);
  });

  it("the sample parses and matches the reference screenshot's counts", () => {
    const result = parseQuotaDocument(read("quota.sample.json"));
    if (!result.ok) throw new Error(result.issues.join("\n"));
    expect(result.document.credentials).toHaveLength(10);
    expect(countLoaded(result.document.credentials)).toBe(10);
    expect(countByProvider(result.document.credentials)).toEqual({ claude: 5, antigravity: 0, codex: 3, xai: 1, kimi: 1 });
  });

  it("every address in every data file uses the reserved .example domain", () => {
    for (const name of readdirSync(dataDirectory)) {
      const text = readFileSync(new URL(name, dataDirectory), "utf8");
      const addresses = text.match(/[^\s"@]+@[^\s"@]+/g) ?? [];
      expect(addresses.length).toBeGreaterThan(0);
      for (const address of addresses) expect(address).toMatch(/\.example$/);
    }
  });

  it("the malformed fixture is refused, with each fault named", () => {
    const result = parseQuotaDocument(read("quota.malformed.json"));
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.issues.map((issue) => issue.split(":")[0])).toEqual([
      "generatedAt",
      "credentials[0].limits[0].remaining.percent",
      "credentials[1].provider",
      "credentials[1].limits[0].remaining.percent",
      "credentials[1].limits[0].reset",
    ]);
  });
});
