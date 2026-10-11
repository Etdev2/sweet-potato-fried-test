import { describe, expect, it } from "vitest";
import { credentialFileName, maskEmail } from "../src/domain/identity";

describe("maskEmail", () => {
  it("keeps the first letter of each part and the last domain label", () => {
    expect(maskEmail("tess@lumen.example")).toBe("t•••@l•••.example");
  });

  it("hides middle domain labels", () => {
    expect(maskEmail("a@mail.corp.example")).toBe("a•••@m•••.example");
  });

  it("does not leak the length of the hidden text", () => {
    expect(maskEmail("t@l.example")).toBe("t•••@l•••.example");
  });
});

describe("credentialFileName", () => {
  const emailCredential = { provider: "claude", account: { kind: "email", email: "tess@lumen.example" } } as const;

  it("masks the address by default", () => {
    expect(credentialFileName(emailCredential, "masked")).toBe("claude-t•••@l•••.example.json");
  });

  it("shows the address when asked", () => {
    expect(credentialFileName(emailCredential, "shown")).toBe("claude-tess@lumen.example.json");
  });

  it("uses the label of a credential that has no address", () => {
    const local = { provider: "codex", account: { kind: "local", label: "this-mac" } } as const;
    expect(credentialFileName(local, "masked")).toBe("codex-this-mac.json");
    expect(credentialFileName(local, "shown")).toBe("codex-this-mac.json");
  });
});
