import { parseQuotaDocument, type QuotaDocument } from "../domain/quota-document";

// Every file the page may read. The page takes a source name, never a URL, so
// a link cannot point it at another origin.
const DATA_SOURCES = {
  sample: "data/quota.sample.json",
  malformed: "data/quota.malformed.json",
} as const;

export type DataSourceId = keyof typeof DATA_SOURCES;

function isDataSourceId(value: string): value is DataSourceId {
  return Object.hasOwn(DATA_SOURCES, value);
}

export type SourceResolution =
  | { readonly ok: true; readonly id: DataSourceId; readonly url: string }
  | { readonly ok: false; readonly requested: string; readonly known: readonly string[] };

export function resolveSource(search: string): SourceResolution {
  const requested = new URLSearchParams(search).get("source") ?? "sample";
  if (!isDataSourceId(requested)) return { ok: false, requested, known: Object.keys(DATA_SOURCES) };
  return { ok: true, id: requested, url: DATA_SOURCES[requested] };
}

export type LoadError =
  | { readonly kind: "network"; readonly message: string }
  | { readonly kind: "http"; readonly status: number }
  | { readonly kind: "not-json" }
  | { readonly kind: "invalid"; readonly issues: readonly string[] };

export type LoadResult =
  | { readonly ok: true; readonly document: QuotaDocument }
  | { readonly ok: false; readonly error: LoadError };

export async function loadQuota(url: string, fetcher: typeof fetch = fetch): Promise<LoadResult> {
  let response: Response;
  try {
    response = await fetcher(url, { cache: "no-store" });
  } catch (cause) {
    return { ok: false, error: { kind: "network", message: cause instanceof Error ? cause.message : String(cause) } };
  }
  if (!response.ok) return { ok: false, error: { kind: "http", status: response.status } };

  let body: unknown;
  try {
    body = await response.json();
  } catch {
    return { ok: false, error: { kind: "not-json" } };
  }

  const parsed = parseQuotaDocument(body);
  if (!parsed.ok) return { ok: false, error: { kind: "invalid", issues: parsed.issues } };
  return { ok: true, document: parsed.document };
}

export interface ErrorDescription {
  readonly title: string;
  readonly details: readonly string[];
}

export function describeLoadError(error: LoadError, url: string): ErrorDescription {
  switch (error.kind) {
    case "network":
      return { title: `Could not load ${url}`, details: [`The request failed: ${error.message}`] };
    case "http":
      return { title: `Could not load ${url}`, details: [`The server answered with HTTP status ${String(error.status)}.`] };
    case "not-json":
      return { title: `${url} is not valid JSON`, details: ["The file could not be parsed as JSON."] };
    case "invalid":
      return { title: `${url} does not match the quota format`, details: error.issues };
  }
}
