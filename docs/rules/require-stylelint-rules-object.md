# require-stylelint-rules-object

Require a top-level `rules` object in authored Stylelint config files.

## Targeted pattern scope

This rule targets Stylelint config modules such as `stylelint.config.ts`, `stylelint.config.mjs`, and `.stylelintrc.js`.

It focuses on top-level exported config objects, including configs wrapped in `defineConfig(...)`.

## What this rule reports

This rule reports Stylelint config objects that do not define a top-level `rules` property.

## Why this rule exists

A missing `rules` object often indicates partial or placeholder config exports that are hard to review and reason about. Requiring an explicit `rules` object keeps lint intent visible.

## ❌ Incorrect

```ts
export default {
    reportDescriptionlessDisables: true,
};
```

## ✅ Correct

```ts
export default {
    reportDescriptionlessDisables: true,
    rules: {},
};
```

## Behavior and migration notes

- This rule inserts `rules: {},` when missing.
- The fixer preserves surrounding object structure and formatting style.

## ESLint flat config example

```ts
import stylelint2 from "eslint-plugin-stylelint-2";

export default [stylelint2.configs.configuration];
```

## When not to use it

Do not use this rule if your team intentionally treats Stylelint config files as non-rule-only wrappers and does not want to enforce explicit `rules` declarations.

## Package documentation

Stylelint package documentation:

> **Rule catalog ID:** R017

## Further reading

- [Stylelint configuring guide](https://stylelint.io/user-guide/configure/)
