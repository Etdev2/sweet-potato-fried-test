import "server-only";

import { readFile } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";

import { parseDeckContent, type DeckContent, type Parsed } from "../domain/deck";
import { parseFinance, type Finance } from "../domain/finance";

// The app lives in apps/st1-site and the build runs from there, so the ST-1
// folder is two levels up. Pages read it only while the site is being built.
const ST1_DIR = path.resolve(process.cwd(), "..", "..", "ST-1");

export const MARKDOWN_FILES = {
  report: "financial-report.md",
  story: "greg-fiction.md",
  decisions: "decisions.md",
} as const;
export type MarkdownKey = keyof typeof MARKDOWN_FILES;

async function readJson(name: string): Promise<unknown> {
  const parsed: unknown = JSON.parse(await readFile(path.join(ST1_DIR, name), "utf8"));
  return parsed;
}

function unwrap<T>(name: string, parsed: Parsed<T>): T {
  if (parsed.ok) {
    return parsed.value;
  }
  throw new Error(`ST-1/${name} is not in the shape the site expects:\n- ${parsed.problems.join("\n- ")}`);
}

export const loadDeckContent = cache(async (): Promise<DeckContent> => {
  return unwrap("deck-content.json", parseDeckContent(await readJson("deck-content.json")));
});

export const loadFinance = cache(async (): Promise<Finance> => {
  return unwrap("finance.json", parseFinance(await readJson("finance.json")));
});

export const loadMarkdown = cache(async (key: MarkdownKey): Promise<string> => {
  return readFile(path.join(ST1_DIR, MARKDOWN_FILES[key]), "utf8");
});
