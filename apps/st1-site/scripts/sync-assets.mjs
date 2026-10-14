// Copies the six ST-1 deck exports into public/downloads so the site can offer
// them as downloads. Each file must match the hash ST-1 recorded for it, so a
// changed or missing export fails the build.
import { createHash } from "node:crypto";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const appDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const decksDir = path.resolve(appDir, "..", "..", "ST-1", "decks");
const outDir = path.join(appDir, "public", "downloads");

const recorded = JSON.parse(await readFile(path.join(decksDir, "sha256.json"), "utf8"));
const names = Object.keys(recorded).filter((name) => /^st1-[a-z0-9-]+\.(pdf|pptx)$/.test(name));
if (names.length !== 6) {
  console.error(`Expected six deck exports in ST-1/decks/sha256.json, found ${String(names.length)}.`);
  process.exit(1);
}

await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });
for (const name of names) {
  const bytes = await readFile(path.join(decksDir, name));
  const actual = createHash("sha256").update(bytes).digest("hex");
  if (actual !== recorded[name]) {
    console.error(`${name} does not match the hash in ST-1/decks/sha256.json.`);
    process.exit(1);
  }
  await writeFile(path.join(outDir, name), bytes);
}
console.log(`Copied ${String(names.length)} deck exports into public/downloads, hashes verified.`);
