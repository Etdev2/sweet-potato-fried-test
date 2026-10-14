import { readFileSync } from "node:fs";
import path from "node:path";

// Tests parse the real ST-1 files, the same ones the build reads.
const ST1_DIR = path.resolve(import.meta.dirname, "..", "..", "..", "ST-1");

export function readSt1Json(name: string): unknown {
  const parsed: unknown = JSON.parse(readFileSync(path.join(ST1_DIR, name), "utf8"));
  return parsed;
}

/** A deep copy that a test can break on purpose. */
export function mutable(value: unknown): Record<string, unknown> {
  const copy: unknown = structuredClone(value);
  if (typeof copy !== "object" || copy === null || Array.isArray(copy)) {
    throw new Error("Expected a JSON object.");
  }
  return Object.fromEntries(Object.entries(copy));
}
