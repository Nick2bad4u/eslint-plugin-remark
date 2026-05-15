# require-stylelint-custom-syntax-in-overrides

Require top-level `customSyntax` usage to be moved into scoped `overrides` entries.

## Targeted pattern scope

This rule targets Stylelint config modules such as `stylelint.config.ts`, `stylelint.config.mjs`, and `.stylelintrc.js`.

It focuses on top-level exported config objects, including configs wrapped in `defineConfig(...)`.

## What this rule reports

This rule reports top-level `customSyntax` declarations that are not mirrored by at least one override entry with a concrete `customSyntax` value.

## Why this rule exists

Global syntax declarations can accidentally affect unrelated file types. Declaring syntax inside overrides keeps parser behavior explicit and file-scoped.

## ❌ Incorrect

```ts
export default {
    customSyntax: "postcss-scss",
    rules: {
        "color-no-invalid-hex": true,
    },
};
```

## ✅ Correct

```ts
export default {
    customSyntax: "postcss-scss",
    overrides: [
        {
            customSyntax: "postcss-scss",
            files: ["**/*.scss"],
            rules: {
                "at-rule-no-unknown": null,
            },
        },
    ],
    rules: {
        "color-no-invalid-hex": true,
    },
};
```

## Behavior and migration notes

- This rule reports unscoped top-level `customSyntax` usage.
- It does not auto-fix because correct override file patterns are repository-specific.
- Pair this with `disallow-stylelint-custom-syntax` for stricter top-level policy.

## ESLint flat config example

```ts
import stylelint2 from "eslint-plugin-stylelint-2";

export default [stylelint2.configs.configuration];
```

## When not to use it

Do not use this rule if your repository intentionally applies one global syntax for all linted files.

## Package documentation

Stylelint package documentation:

> **Rule catalog ID:** R020

## Further reading

- [Stylelint customSyntax](https://stylelint.io/user-guide/configure/#customsyntax)
- [Stylelint overrides](https://stylelint.io/user-guide/configure/#overrides)
