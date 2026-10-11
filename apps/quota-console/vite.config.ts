import { defineConfig } from "vitest/config";

// appType "mpa" turns off the single-page fallback, so a missing data file
// answers 404 instead of index.html.
export default defineConfig({
  appType: "mpa",
  esbuild: { jsx: "automatic" },
  test: {
    include: ["tests/**/*.test.ts"],
  },
});
