import { describe, expect, it } from "vitest";
import { parseQuotaDocument } from "../src/domain/quota-document";

const minimal = {
  schemaVersion: 1,
  generatedAt: "2026-09-11T20:00:00Z",
  credentials: [
    {
      id: "claude-1",
      provider: "claude",
      account: { kind: "email", email: "tess@lumen.example" },
      plan: "Max",
      state: "loaded",
      limits: [
        {
          id: "seven-day-model",
          label: "7-day Fable 5",
          remaining: { status: "measured", percent: 58 },
          reset: { status: "scheduled", at: "2026-09-13T13:00:00Z" },
        },
      ],
    },
  ],
};

describe("parseQuotaDocument", () => {
  it("accepts a well-formed document", () => {
    const result = parseQuotaDocument(minimal);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.document.credentials).toHaveLength(1);
    expect(result.document.credentials[0]?.limits[0]?.remaining).toEqual({ status: "measured", percent: 58 });
  });
});

function withFirstCredential(patch: Record<string, unknown>): unknown {
  return { ...minimal, credentials: [{ ...minimal.credentials[0], ...patch }] };
}

describe("parseQuotaDocument rejects bad data with the path to the fault", () => {
  it("names a percentage above 100", () => {
    const result = parseQuotaDocument(
      withFirstCredential({
        limits: [{ id: "weekly", label: "Weekly limit", remaining: { status: "measured", percent: 140 }, reset: { status: "none" } }],
      }),
    );
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.issues).toHaveLength(1);
    expect(result.issues[0]).toMatch(/^credentials\[0\]\.limits\[0\]\.remaining\.percent: /);
  });

  it("names an unknown provider", () => {
    const result = parseQuotaDocument(withFirstCredential({ provider: "gemini" }));
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.issues[0]).toMatch(/^credentials\[0\]\.provider: /);
  });

  it("refuses a measured value that also claims to be unavailable", () => {
    const result = parseQuotaDocument(
      withFirstCredential({
        limits: [{ id: "weekly", label: "Weekly limit", remaining: { status: "unavailable", percent: 0 }, reset: { status: "none" } }],
      }),
    );
    expect(result.ok).toBe(false);
  });

  it("refuses two credentials with the same id", () => {
    const result = parseQuotaDocument({ ...minimal, credentials: [minimal.credentials[0], minimal.credentials[0]] });
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.issues).toEqual(['credentials[1].id: Duplicate credential id "claude-1"']);
  });

  it("refuses a reset time that is not an ISO timestamp", () => {
    const result = parseQuotaDocument(
      withFirstCredential({
        limits: [{ id: "weekly", label: "Weekly limit", remaining: { status: "measured", percent: 5 }, reset: { status: "scheduled", at: "tomorrow" } }],
      }),
    );
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.issues[0]).toMatch(/^credentials\[0\]\.limits\[0\]\.reset\.at: /);
  });

  it("refuses a document that is not an object", () => {
    const result = parseQuotaDocument(["not", "a", "document"]);
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.issues[0]).toMatch(/^document: /);
  });

  it("refuses an unknown schema version", () => {
    const result = parseQuotaDocument({ ...minimal, schemaVersion: 2 });
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.issues[0]).toMatch(/^schemaVersion: /);
  });
});
