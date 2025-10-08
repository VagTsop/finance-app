import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import angular from "@angular-eslint/eslint-plugin";
import angularTemplate from "@angular-eslint/eslint-plugin-template";

export default [
  {
    files: ["**/*.ts"],
    ignores: ["**/node_modules/**", "dist/**"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
        sourceType: "module"
      }
    },
    plugins: {
      "@typescript-eslint": tseslint,
      "@angular-eslint": angular
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tseslint.configs["recommended-type-checked"].rules,
      ...angular.configs.recommended.rules
    }
  },
  {
    files: ["**/*.html"],
    plugins: {
      "@angular-eslint/template": angularTemplate
    },
    rules: {
      ...angularTemplate.configs.recommended.rules
    }
  }
];
