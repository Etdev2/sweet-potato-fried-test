import { describe, expect, it } from "vitest";
import { parseQuotaDocument, type QuotaDocument } from "../src/domain/quota-document";
import { countByProvider, countLoaded, formatPercent, summarizeLimits, toneFor } from "../src/domain/summary";

interface LimitInput {
  readonly id: string;
  readonly percent: number | null;
  // An ISO time, or "none" for no pending reset. Omitted means unavailable.
  readonly reset?: string;
}

function credential(id: string, provider: string, limits: readonly LimitInput[], state = "loaded"): unknown {
  return {
    id,
    provider,
    account: { kind: "email", email: `${id}@fixture.example` },
    plan: null,
    state,
    limits: limits.map((limit) => ({
      id: limit.id,
      label: `Label for ${limit.id}`,
      remaining: limit.percent === null ? { status: "unavailable" } : { status: "measured", percent: limit.percent },
      reset:
        limit.reset === undefined
          ? { status: "unavailable" }
          : limit.reset === "none"
            ? { status: "none" }
            : { status: "scheduled", at: limit.reset },
    })),
  };
}

function documentOf(credentials: readonly unknown[]): QuotaDocument {
  const result = parseQuotaDocument({ schemaVersion: 1, generatedAt: "2026-09-11T20:00:00Z", credentials });
  if (!result.ok) throw new Error(result.issues.join("\n"));
  return result.document;
}

describe("counts", () => {
  const document = documentOf([
    credential("a", "claude", [{ id: "weekly", percent: 1 }]),
    credential("b", "claude", [{ id: "weekly", percent: 1 }], "failed"),
    credential("c", "kimi", [{ id: "weekly", percent: 1 }]),
  ]);

  it("counts credentials per provider, including providers with none", () => {
    expect(countByProvider(document.credentials)).toEqual({ claude: 2, antigravity: 0, codex: 0, xai: 0, kimi: 1 });
  });

  it("counts only credentials that loaded", () => {
    expect(countLoaded(document.credentials)).toBe(2);
  });
});

describe("summarizeLimits", () => {
  it("adds up one limit across credentials and keeps one segment per credential", () => {
    const document = documentOf([
      credential("a", "claude", [{ id: "model", percent: 58, reset: "2026-09-13T13:00:00Z" }]),
      credential("b", "claude", [{ id: "model", percent: 100, reset: "2026-09-15T22:00:00Z" }]),
      credential("c", "claude", [{ id: "model", percent: 100, reset: "2026-09-16T14:00:00Z" }]),
      credential("d", "claude", [{ id: "model", percent: 51, reset: "2026-09-12T23:00:00Z" }]),
      credential("e", "claude", [{ id: "model", percent: 100, reset: "none" }]),
    ]);
    const [summary, ...rest] = summarizeLimits(document.credentials);
    expect(rest).toEqual([]);
    expect(summary?.total).toEqual({ status: "measured", percent: 409 });
    expect(summary?.capacityPercent).toBe(500);
    expect(summary?.segments.map((segment) => (segment.status === "measured" ? segment.percent : null))).toEqual([
      58, 100, 100, 51, 100,
    ]);
    expect(summary?.nextReset).toEqual({ status: "scheduled", at: "2026-09-12T23:00:00Z" });
  });

  it("lists limits in the order they first appear", () => {
    const document = documentOf([
      credential("a", "claude", [
        { id: "model", percent: 10 },
        { id: "five-hour", percent: 20 },
      ]),
      credential("b", "claude", [
        { id: "five-hour", percent: 30 },
        { id: "seven-day", percent: 40 },
      ]),
    ]);
    const summaries = summarizeLimits(document.credentials);
    expect(summaries.map((summary) => summary.id)).toEqual(["model", "five-hour", "seven-day"]);
    expect(summaries.map((summary) => summary.total)).toEqual([
      { status: "measured", percent: 10 },
      { status: "measured", percent: 50 },
      { status: "measured", percent: 40 },
    ]);
  });

  it("treats a credential without the limit as unavailable, not as zero", () => {
    const document = documentOf([
      credential("a", "claude", [{ id: "model", percent: 10 }]),
      credential("b", "claude", [{ id: "other", percent: 30 }]),
    ]);
    const model = summarizeLimits(document.credentials)[0];
    expect(model?.segments).toEqual([{ status: "measured", percent: 10 }, { status: "unavailable" }]);
    expect(model?.capacityPercent).toBe(200);
  });

  it("reports the total as unavailable when no credential has a measurement", () => {
    const document = documentOf([credential("x", "xai", [{ id: "weekly", percent: null, reset: "2026-09-17T17:29:00Z" }])]);
    const weekly = summarizeLimits(document.credentials)[0];
    expect(weekly?.total).toEqual({ status: "unavailable" });
    expect(weekly?.nextReset).toEqual({ status: "scheduled", at: "2026-09-17T17:29:00Z" });
  });

  it("picks the earliest reset by instant, across time zone offsets", () => {
    const document = documentOf([
      credential("a", "codex", [{ id: "weekly", percent: 1, reset: "2026-09-14T09:00:00+09:00" }]),
      credential("b", "codex", [{ id: "weekly", percent: 1, reset: "2026-09-14T01:00:00Z" }]),
    ]);
    expect(summarizeLimits(document.credentials)[0]?.nextReset).toEqual({
      status: "scheduled",
      at: "2026-09-14T09:00:00+09:00",
    });
  });

  it("says no reset is pending only when some credential reports that", () => {
    const none = documentOf([
      credential("a", "kimi", [{ id: "weekly", percent: 1, reset: "none" }]),
      credential("b", "kimi", [{ id: "weekly", percent: 1 }]),
    ]);
    expect(summarizeLimits(none.credentials)[0]?.nextReset).toEqual({ status: "none" });
    const unknown = documentOf([credential("a", "kimi", [{ id: "weekly", percent: 1 }])]);
    expect(summarizeLimits(unknown.credentials)[0]?.nextReset).toEqual({ status: "unavailable" });
  });

  it("returns nothing for no credentials", () => {
    expect(summarizeLimits([])).toEqual([]);
  });
});

describe("formatPercent", () => {
  it("prints whole numbers bare and fractions to one decimal place", () => {
    expect(formatPercent(409)).toBe("409%");
    expect(formatPercent(0)).toBe("0%");
    expect(formatPercent(12.34)).toBe("12.3%");
    expect(formatPercent(99.96)).toBe("100%");
  });
});

describe("toneFor", () => {
  it("marks low, middling and healthy remaining quota", () => {
    expect([0, 17, 24.9].map(toneFor)).toEqual(["low", "low", "low"]);
    expect([25, 51, 58, 59.9].map(toneFor)).toEqual(["mid", "mid", "mid", "mid"]);
    expect([60, 75, 79, 100].map(toneFor)).toEqual(["high", "high", "high", "high"]);
  });
});
