# require-stylelint-overrides-files-array

Require each Stylelint `overrides` entry `files` value to be an explicit non-empty array of glob strings.

## Targeted pattern scope

This rule targets Stylelint config modules such as `stylelint.config.ts`, `stylelint.config.mjs`, and `.stylelintrc.js`.

It focuses on top-level exported config objects, including configs wrapped in `defineConfig(...)`.

## What this rule reports

This rule reports override `files` values that are not explicit non-empty string arrays, including:

- scalar strings (`files: "**/*.scss"`)
- empty arrays (`files: []`)
- arrays containing non-string or empty elements

## Why this rule exists

Stylelint documents `overrides.files` as an array of glob patterns. Enforcing explicit arrays makes override scope predictable and easier to review at scale.

## ❌ Incorrect

```ts
export default {
    overrides: [
        {
            files: "**/*.scss",
            rules: {
                "at-rule-no-unknown": null,
            },
        },
    ],
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
};
```

## Behavior and migration notes

- This rule reports invalid `overrides.files` array shape.
- It does not auto-fix because converting dynamic patterns to explicit globs requires repository-specific intent.

## ESLint flat config example

```ts
import stylelint2 from "eslint-plugin-stylelint-2";

export default [stylelint2.configs.configuration];
```

## When not to use it

Do not use this rule if your repository intentionally allows dynamic glob expressions for override matching.

## Package documentation

Stylelint package documentation:

> **Rule catalog ID:** R038

## Further reading

- [Stylelint `overrides`](https://stylelint.io/user-guide/configure/#overrides)
