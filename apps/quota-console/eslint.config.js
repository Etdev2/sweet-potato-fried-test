import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist", "node_modules", "test-results", "playwright-report", "eslint.config.js"] },
  js.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname },
    },
    linterOptions: { reportUnusedDisableDirectives: "error", noInlineConfig: true },
    rules: {
      // `as const` stays legal. Every other assertion is banned, so external
      // data reaches domain types only through the parser.
      "@typescript-eslint/consistent-type-assertions": ["error", { assertionStyle: "never" }],
      "@typescript-eslint/no-non-null-assertion": "error",
      "@typescript-eslint/switch-exhaustiveness-check": [
        "error",
        { allowDefaultCaseForExhaustiveSwitch: false, requireDefaultForNonUnion: true },
      ],
    },
  },
  {
    // Domain logic must run without the UI framework or the browser.
    files: ["src/domain/**/*.ts"],
    rules: {
      "no-restricted-imports": [
        "error",
        { patterns: [{ group: ["react", "react-dom", "react/*", "react-dom/*", "../ui/*", "../data/*"], message: "src/domain must not depend on the UI or the loader." }] },
      ],
      "no-restricted-globals": ["error", "window", "document", "fetch", "localStorage"],
    },
  },
);
