# disallow-stylelint-relative-plugin-paths

Disallow relative-path entries in top-level Stylelint `plugins` declarations.

## Targeted pattern scope

This rule targets Stylelint config modules such as `stylelint.config.ts`, `stylelint.config.mjs`, and `.stylelintrc.js`.

It focuses on top-level exported config objects, including configs wrapped in `defineConfig(...)`.

## What this rule reports

Reports `plugins` entries that start with `./`, `../`, `.\\`, or `..\\`.

## Why this rule exists

Relative plugin paths are brittle in shared configs and can break when package roots or workspace layouts change.

## ❌ Incorrect

```ts
export default {
    plugins: ["./plugins/local-stylelint-plugin.cjs"],
    rules: {},
};
```

## ✅ Correct

```ts
export default {
    plugins: ["stylelint-order"],
    rules: {},
};
```

## Behavior and migration notes

This rule reports relative-path entries and does not auto-fix because package replacement names are project-specific.

## ESLint flat config example

```ts
import stylelint2 from "eslint-plugin-stylelint-2";

export default [stylelint2.configs.configuration];
```

## When not to use it

Do not use this rule if your repository intentionally loads local relative plugin modules.

## Package documentation

Stylelint package documentation:

> **Rule catalog ID:** R028

## Further reading

- [Stylelint plugins](https://stylelint.io/user-guide/configure/#plugins)
