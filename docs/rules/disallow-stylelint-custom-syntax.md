# disallow-stylelint-custom-syntax

Disallow configuring Stylelint's top-level `customSyntax` option inside authored Stylelint config files.

## Targeted pattern scope

This rule targets Stylelint config modules such as `stylelint.config.ts`, `stylelint.config.mjs`, and `.stylelintrc.js`.

It focuses on top-level exported config objects, including configs wrapped in `defineConfig(...)`.

## What this rule reports

This rule reports Stylelint config objects that include a top-level `customSyntax` property.

## Why this rule exists

Top-level `customSyntax` applies globally and can accidentally affect unrelated file types. Syntax selection is safer when scoped to `overrides` entries with explicit `files` matchers.

## ❌ Incorrect

```ts
export default {
    customSyntax: "postcss-scss",
    rules: {},
};
```

## ✅ Correct

```ts
export default {
    overrides: [
        {
            customSyntax: "postcss-scss",
            files: ["**/*.scss"],
            rules: {},
        },
    ],
    rules: {},
};
```

## Behavior and migration notes

- This rule removes top-level `customSyntax`.
- It preserves the rest of the config object.
- Move syntax declarations into override entries that include explicit file patterns.

## ESLint flat config example

```ts
import stylelint2 from "eslint-plugin-stylelint-2";

export default [stylelint2.configs.configuration];
```

## When not to use it

Do not use this rule if your repository intentionally uses one global syntax parser for every linted file.

## Package documentation

Stylelint package documentation:

> **Rule catalog ID:** R014

## Further reading

- [Stylelint customSyntax](https://stylelint.io/user-guide/configure/#customsyntax)
- [Stylelint overrides](https://stylelint.io/user-guide/configure/#overrides)
