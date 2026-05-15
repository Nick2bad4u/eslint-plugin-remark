# sort-stylelint-extends

Enforce sorted entries in top-level Stylelint `extends` declarations.

## Targeted pattern scope

This rule targets Stylelint config modules such as `stylelint.config.ts`, `stylelint.config.mjs`, and `.stylelintrc.js`.

It focuses on top-level exported config objects, including configs wrapped in `defineConfig(...)`.

## What this rule reports

Reports `extends` arrays whose string entries are not in ascending lexical order.

## Why this rule exists

Stable sorted arrays reduce diff noise and keep shared config layering predictable.

## ❌ Incorrect

```ts
export default {
    extends: ["stylelint-config-standard", "stylelint-config-recommended"],
    rules: {},
};
```

## ✅ Correct

```ts
export default {
    extends: ["stylelint-config-recommended", "stylelint-config-standard"],
    rules: {},
};
```

## Behavior and migration notes

This rule auto-fixes by sorting `extends` entries lexically.

## ESLint flat config example

```ts
import stylelint2 from "eslint-plugin-stylelint-2";

export default [stylelint2.configs.configuration];
```

## When not to use it

Do not use this rule if your repository intentionally relies on non-lexical manual ordering for readability conventions.

## Package documentation

Stylelint package documentation:

> **Rule catalog ID:** R025

## Further reading

- [Stylelint extends](https://stylelint.io/user-guide/configure/#extends)
