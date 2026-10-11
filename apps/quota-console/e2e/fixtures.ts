import { readFileSync } from "node:fs";
import type { Page } from "@playwright/test";
import { parseQuotaDocument, type Credential, type QuotaDocument } from "../src/domain/quota-document";

export const SAMPLE_ROUTE = "**/data/quota.sample.json";

// The committed sample, read through the same parser the page uses.
export function sampleDocument(): QuotaDocument {
  const raw: unknown = JSON.parse(readFileSync(new URL("../public/data/quota.sample.json", import.meta.url), "utf8"));
  const result = parseQuotaDocument(raw);
  if (!result.ok) throw new Error(result.issues.join("\n"));
  return result.document;
}

export function withCredentials(document: QuotaDocument, change: (credentials: readonly Credential[]) => Credential[]): QuotaDocument {
  return { ...document, credentials: change(document.credentials) };
}

// Sets the measured remaining percentage of one limit on one credential.
export function withRemaining(document: QuotaDocument, credentialId: string, limitId: string, percent: number): QuotaDocument {
  return withCredentials(document, (credentials) =>
    credentials.map((credential) =>
      credential.id !== credentialId
        ? credential
        : {
            ...credential,
            limits: credential.limits.map((limit) =>
              limit.id !== limitId ? limit : { ...limit, remaining: { status: "measured", percent } },
            ),
          },
    ),
  );
}

export interface Served {
  readonly requests: () => number;
}

// Answers each request for the sample file with the next body in `bodies`,
// repeating the last one. A number is served as that HTTP status.
export async function serveSample(page: Page, bodies: readonly (QuotaDocument | string | number)[]): Promise<Served> {
  let count = 0;
  await page.route(SAMPLE_ROUTE, async (route) => {
    const body = bodies[Math.min(count, bodies.length - 1)];
    count += 1;
    if (body === undefined) {
      await route.abort();
    } else if (typeof body === "number") {
      await route.fulfill({ status: body, contentType: "text/plain", body: "error" });
    } else if (typeof body === "string") {
      await route.fulfill({ status: 200, contentType: "application/json", body });
    } else {
      await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(body) });
    }
  });
  return { requests: () => count };
}
