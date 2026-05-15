# sort-stylelint-plugins

Enforce sorted entries in top-level Stylelint `plugins` declarations.

## Targeted pattern scope

This rule targets Stylelint config modules such as `stylelint.config.ts`, `stylelint.config.mjs`, and `.stylelintrc.js`.

It focuses on top-level exported config objects, including configs wrapped in `defineConfig(...)`.

## What this rule reports

Reports `plugins` arrays whose string entries are not in ascending lexical order.

## Why this rule exists

Sorted plugin arrays create deterministic diffs and improve scanability of shared config.

## ❌ Incorrect

```ts
export default {
    plugins: ["stylelint-order", "stylelint-a11y"],
    rules: {},
};
```

## ✅ Correct

```ts
export default {
    plugins: ["stylelint-a11y", "stylelint-order"],
    rules: {},
};
```

## Behavior and migration notes

This rule auto-fixes by sorting `plugins` entries lexically.

## ESLint flat config example

```ts
import stylelint2 from "eslint-plugin-stylelint-2";

export default [stylelint2.configs.configuration];
```

## When not to use it

Do not use this rule if your repository intentionally uses non-lexical plugin ordering conventions.

## Package documentation

Stylelint package documentation:

> **Rule catalog ID:** R026

## Further reading

- [Stylelint plugins](https://stylelint.io/user-guide/configure/#plugins)
