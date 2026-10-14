import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: [".next", "node_modules", "public", "test-results", "playwright-report", "next-env.d.ts"] },
  js.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname },
    },
    linterOptions: { reportUnusedDisableDirectives: "error", noInlineConfig: true },
    rules: {
      // `as const` stays legal. Every other assertion is banned, so the ST-1
      // JSON reaches domain types only through the parsers.
      "@typescript-eslint/consistent-type-assertions": ["error", { assertionStyle: "never" }],
      "@typescript-eslint/no-non-null-assertion": "error",
      "@typescript-eslint/switch-exhaustiveness-check": [
        "error",
        { allowDefaultCaseForExhaustiveSwitch: false, requireDefaultForNonUnion: true },
      ],
    },
  },
  {
    // Domain logic must run without React, Next.js, the browser or the disk.
    files: ["src/domain/**/*.ts"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["react", "react-dom", "react/*", "next", "next/*", "node:*", "../ui/*", "../data/*", "../app/*"],
              message: "src/domain must not depend on the framework, the UI or the loader.",
            },
          ],
        },
      ],
      "no-restricted-globals": ["error", "window", "document", "fetch", "process"],
    },
  },
  {
    // Components that run in the browser must not reach the file loader.
    files: ["src/ui/**/*.tsx"],
    rules: {
      "no-restricted-imports": [
        "error",
        { patterns: [{ group: ["../data/*", "node:*"], message: "src/ui must not read files. Load in src/app and pass props." }] },
      ],
    },
  },
  {
    // Plain Node scripts and config have no type information to lint against.
    files: ["**/*.mjs"],
    ...tseslint.configs.disableTypeChecked,
    languageOptions: {
      ...tseslint.configs.disableTypeChecked.languageOptions,
      globals: { process: "readonly", console: "readonly" },
    },
  },
);
