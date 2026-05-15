# prefer-stylelint-extends-array

Prefer array form for top-level Stylelint `extends` declarations.

## Targeted pattern scope

This rule targets Stylelint config modules such as `stylelint.config.ts`, `stylelint.config.mjs`, and `.stylelintrc.js`.

It focuses on top-level exported config objects, including configs wrapped in `defineConfig(...)`.

## What this rule reports

Reports `extends` when it is defined as a single string instead of an array.

## Why this rule exists

Array form is easier to append, reorder, and review safely in shared config files.

## ❌ Incorrect

```ts
export default {
    extends: "stylelint-config-standard",
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

This rule auto-fixes scalar string form to a single-entry array.

## ESLint flat config example

```ts
import stylelint2 from "eslint-plugin-stylelint-2";

export default [stylelint2.configs.configuration];
```

## When not to use it

Do not use this rule if your repository intentionally enforces scalar `extends` syntax in every Stylelint config file.

## Package documentation

Stylelint package documentation:

> **Rule catalog ID:** R021

## Further reading

- [Stylelint extends](https://stylelint.io/user-guide/configure/#extends)
