import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";


export default defineConfig([
  { ignores: [".next/**", "node_modules/**", "next-env.d.ts"] },
  { files: ["**/*.{js,mjs,cjs,ts,mts,cts}"], plugins: { js }, extends: ["js/recommended"] },
  { files: ["**/*.{js,mjs,cjs,ts,mts,cts}"], languageOptions: { globals: globals.browser } },
  { files: ["*.config.{js,mjs,cjs,ts}", "postcss.config.js"], languageOptions: { globals: globals.node } },
  tseslint.configs.recommended,
]);
