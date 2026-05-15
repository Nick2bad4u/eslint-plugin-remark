# disallow-stylelint-duplicate-plugins

Disallow duplicate entries in top-level Stylelint `plugins` declarations.

## Targeted pattern scope

This rule targets Stylelint config modules such as `stylelint.config.ts`, `stylelint.config.mjs`, and `.stylelintrc.js`.

It focuses on top-level exported config objects, including configs wrapped in `defineConfig(...)`.

## What this rule reports

Reports duplicate string entries in top-level `plugins` arrays.

## Why this rule exists

Duplicate plugin references make config harder to reason about and create unnecessary churn in shared lint setup.

## ❌ Incorrect

```ts
export default {
    plugins: ["stylelint-order", "stylelint-order"],
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

This rule auto-fixes by keeping the first occurrence of each plugin entry.

## ESLint flat config example

```ts
import stylelint2 from "eslint-plugin-stylelint-2";

export default [stylelint2.configs.configuration];
```

## When not to use it

Do not use this rule if duplicate plugin entries are intentionally required by external code-generation workflows.

## Package documentation

Stylelint package documentation:

> **Rule catalog ID:** R024

## Further reading

- [Stylelint plugins](https://stylelint.io/user-guide/configure/#plugins)
