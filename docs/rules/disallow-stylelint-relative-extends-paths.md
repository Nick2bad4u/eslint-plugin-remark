# disallow-stylelint-relative-extends-paths

Disallow relative-path entries in top-level Stylelint `extends` declarations.

## Targeted pattern scope

This rule targets Stylelint config modules such as `stylelint.config.ts`, `stylelint.config.mjs`, and `.stylelintrc.js`.

It focuses on top-level exported config objects, including configs wrapped in `defineConfig(...)`.

## What this rule reports

Reports `extends` entries that start with `./`, `../`, `.\\`, or `..\\`.

## Why this rule exists

Relative path references in shared configs are fragile across package boundaries and monorepos. Package-based identifiers are more portable and predictable.

## ❌ Incorrect

```ts
export default {
    extends: ["../shared/stylelint.cjs"],
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

This rule reports relative-path entries and does not auto-fix because replacement identifiers are repository-specific.

## ESLint flat config example

```ts
import stylelint2 from "eslint-plugin-stylelint-2";

export default [stylelint2.configs.configuration];
```

## When not to use it

Do not use this rule if your config architecture intentionally relies on relative extends references.

## Package documentation

Stylelint package documentation:

> **Rule catalog ID:** R027

## Further reading

- [Stylelint extends](https://stylelint.io/user-guide/configure/#extends)
