import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import { FlatCompat } from "@eslint/eslintrc";
import { defineConfig, globalIgnores } from "eslint/config";

const compat = new FlatCompat({ baseDirectory: import.meta.dirname });

export default defineConfig([
  globalIgnores(["dist", ".next", "node_modules", "next-env.d.ts"]),

  // Next.js's own recommended rules (Core Web Vitals + TypeScript), bridged
  // from its legacy eslintrc format via FlatCompat.
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Project source: strict TypeScript, React hooks correctness.
  {
    files: ["**/*.{ts,tsx}"],
    extends: [tseslint.configs.recommended],
    plugins: { "react-hooks": reactHooks },
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      ...reactHooks.configs["recommended-latest"].rules,
      "@typescript-eslint/no-unused-vars": [
        "error",
        { varsIgnorePattern: "^[A-Z_]", argsIgnorePattern: "^_" },
      ],
    },
  },

  // Root-level Node config files (this file, postcss.config.mjs) — plain JS.
  {
    files: ["*.js", "*.mjs"],
    extends: [js.configs.recommended],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.node,
    },
  },
]);
