import { z } from "zod";
import { PROVIDER_IDS } from "./providers";

// The one place quota JSON becomes domain types. Everything past this parser
// may trust the shapes below.

const remainingSchema = z.discriminatedUnion("status", [
  z.strictObject({ status: z.literal("measured"), percent: z.number().min(0).max(100) }),
  z.strictObject({ status: z.literal("unavailable") }),
]);

const resetSchema = z.discriminatedUnion("status", [
  z.strictObject({ status: z.literal("scheduled"), at: z.iso.datetime({ offset: true }) }),
  z.strictObject({ status: z.literal("none") }),
  z.strictObject({ status: z.literal("unavailable") }),
]);

const limitSchema = z.strictObject({
  id: z.string().min(1).brand<"LimitId">(),
  label: z.string().min(1),
  remaining: remainingSchema,
  reset: resetSchema,
});

const accountSchema = z.discriminatedUnion("kind", [
  z.strictObject({ kind: z.literal("email"), email: z.email() }),
  z.strictObject({ kind: z.literal("local"), label: z.string().min(1) }),
]);

const credentialSchema = z
  .strictObject({
    id: z.string().min(1).brand<"CredentialId">(),
    provider: z.enum(PROVIDER_IDS),
    account: accountSchema,
    plan: z.string().min(1).nullable(),
    state: z.enum(["loaded", "failed"]),
    limits: z.array(limitSchema).min(1),
  })
  .superRefine((credential, context) => {
    const seen = new Set<string>();
    credential.limits.forEach((limit, index) => {
      if (seen.has(limit.id)) {
        context.addIssue({ code: "custom", path: ["limits", index, "id"], message: `Duplicate limit id "${limit.id}"` });
      }
      seen.add(limit.id);
    });
  });

const quotaDocumentSchema = z
  .strictObject({
    schemaVersion: z.literal(1),
    generatedAt: z.iso.datetime({ offset: true }),
    credentials: z.array(credentialSchema),
  })
  .superRefine((document, context) => {
    const seen = new Set<string>();
    document.credentials.forEach((credential, index) => {
      if (seen.has(credential.id)) {
        context.addIssue({
          code: "custom",
          path: ["credentials", index, "id"],
          message: `Duplicate credential id "${credential.id}"`,
        });
      }
      seen.add(credential.id);
    });
  });

export type Remaining = z.infer<typeof remainingSchema>;
export type Reset = z.infer<typeof resetSchema>;
export type Limit = z.infer<typeof limitSchema>;
export type LimitId = Limit["id"];
export type Account = z.infer<typeof accountSchema>;
export type Credential = z.infer<typeof credentialSchema>;
export type CredentialId = Credential["id"];
export type QuotaDocument = z.infer<typeof quotaDocumentSchema>;

export type ParseResult =
  | { readonly ok: true; readonly document: QuotaDocument }
  | { readonly ok: false; readonly issues: readonly string[] };

function formatPath(path: readonly PropertyKey[]): string {
  if (path.length === 0) return "document";
  return path.reduce<string>((text, key) => {
    if (typeof key === "number") return `${text}[${String(key)}]`;
    return text === "" ? String(key) : `${text}.${String(key)}`;
  }, "");
}

export function parseQuotaDocument(input: unknown): ParseResult {
  const parsed = quotaDocumentSchema.safeParse(input);
  if (parsed.success) return { ok: true, document: parsed.data };
  return {
    ok: false,
    issues: parsed.error.issues.map((issue) => `${formatPath(issue.path)}: ${issue.message}`),
  };
}
