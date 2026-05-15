# disallow-stylelint-duplicate-extends

Disallow duplicate entries in top-level Stylelint `extends` declarations.

## Targeted pattern scope

This rule targets Stylelint config modules such as `stylelint.config.ts`, `stylelint.config.mjs`, and `.stylelintrc.js`.

It focuses on top-level exported config objects, including configs wrapped in `defineConfig(...)`.

## What this rule reports

Reports duplicate string entries in top-level `extends` arrays.

## Why this rule exists

Duplicate shared-config layers add noise and can obscure real config intent.

## ❌ Incorrect

```ts
export default {
    extends: ["stylelint-config-standard", "stylelint-config-standard"],
    rules: {},
};
```

## ✅ Correct

```ts
export default {
    extends: ["stylelint-config-standard"],
    rules: {},
};
```

## Behavior and migration notes

This rule auto-fixes by keeping the first occurrence of each entry.

## ESLint flat config example

```ts
import stylelint2 from "eslint-plugin-stylelint-2";

export default [stylelint2.configs.configuration];
```

## When not to use it

Do not use this rule if your repository intentionally keeps duplicate entries for generated tooling compatibility.

## Package documentation

Stylelint package documentation:

> **Rule catalog ID:** R023

## Further reading

- [Stylelint extends](https://stylelint.io/user-guide/configure/#extends)
