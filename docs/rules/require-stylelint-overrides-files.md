# require-stylelint-overrides-files

Require every Stylelint `overrides` entry to define a non-empty `files` matcher.

## Targeted pattern scope

This rule targets Stylelint config modules such as `stylelint.config.ts`, `stylelint.config.mjs`, and `.stylelintrc.js`.

It focuses on top-level exported config objects, including configs wrapped in `defineConfig(...)`.

## What this rule reports

This rule reports override entries that:

- omit `files`, or
- set `files` to an empty string, or
- set `files` to an empty array.

## Why this rule exists

Overrides without explicit file scope are brittle and easy to misread. A non-empty `files` matcher makes override intent explicit and auditable.

## ❌ Incorrect

```ts
export default {
    overrides: [
        {
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

## ✅ Correct

```ts
export default {
    overrides: [
        {
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

- This rule reports invalid or missing `files` in override entries.
- It does not auto-fix because correct glob scopes are repository-specific.

## ESLint flat config example

```ts
import stylelint2 from "eslint-plugin-stylelint-2";

export default [stylelint2.configs.configuration];
```

## When not to use it

Do not use this rule if your repository intentionally permits non-standard override objects without explicit file globs.

## Package documentation

Stylelint package documentation:

> **Rule catalog ID:** R019

## Further reading

- [Stylelint overrides](https://stylelint.io/user-guide/configure/#overrides)
