import { describe, expect, it } from "vitest";
import { describeLoadError, loadQuota, resolveSource } from "../src/data/load-quota";

const valid = { schemaVersion: 1, generatedAt: "2026-09-11T20:00:00Z", credentials: [] };

function respondWith(body: string, status = 200): typeof fetch {
  return () => Promise.resolve(new Response(body, { status }));
}

describe("loadQuota", () => {
  it("returns the parsed document", async () => {
    const result = await loadQuota("data/quota.sample.json", respondWith(JSON.stringify(valid)));
    expect(result).toEqual({ ok: true, document: valid });
  });

  it("reports a missing file by its HTTP status", async () => {
    const result = await loadQuota("data/quota.sample.json", respondWith("Not found", 404));
    expect(result).toEqual({ ok: false, error: { kind: "http", status: 404 } });
  });

  it("reports a body that is not JSON", async () => {
    const result = await loadQuota("data/quota.sample.json", respondWith("<!doctype html>"));
    expect(result).toEqual({ ok: false, error: { kind: "not-json" } });
  });

  it("reports every fault in JSON of the wrong shape", async () => {
    const result = await loadQuota("data/quota.sample.json", respondWith(JSON.stringify({ ...valid, schemaVersion: 7, credentials: "none" })));
    expect(result.ok).toBe(false);
    if (result.ok || result.error.kind !== "invalid") throw new Error("expected an invalid-document error");
    expect(result.error.issues).toHaveLength(2);
  });

  it("reports a request that never completes", async () => {
    const result = await loadQuota("data/quota.sample.json", () => Promise.reject(new TypeError("Failed to fetch")));
    expect(result).toEqual({ ok: false, error: { kind: "network", message: "Failed to fetch" } });
  });
});

describe("describeLoadError", () => {
  it("names the file and says what is wrong with it", () => {
    expect(describeLoadError({ kind: "http", status: 404 }, "data/quota.sample.json")).toEqual({
      title: "Could not load data/quota.sample.json",
      details: ["The server answered with HTTP status 404."],
    });
    expect(describeLoadError({ kind: "invalid", issues: ["credentials[0].provider: Invalid option"] }, "data/x.json")).toEqual({
      title: "data/x.json does not match the quota format",
      details: ["credentials[0].provider: Invalid option"],
    });
  });
});

describe("resolveSource", () => {
  it("defaults to the committed sample", () => {
    expect(resolveSource("")).toEqual({ ok: true, id: "sample", url: "data/quota.sample.json" });
  });

  it("accepts a known source name", () => {
    expect(resolveSource("?source=malformed")).toEqual({ ok: true, id: "malformed", url: "data/quota.malformed.json" });
  });

  it("refuses a name it does not know, so the page never fetches an arbitrary URL", () => {
    expect(resolveSource("?source=https://evil.example/x.json")).toEqual({
      ok: false,
      requested: "https://evil.example/x.json",
      known: ["sample", "malformed"],
    });
  });
});
