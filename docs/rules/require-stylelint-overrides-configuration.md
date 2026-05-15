# require-stylelint-overrides-configuration

Require each Stylelint `overrides` entry to include effective configuration content beyond `files` and optional `name`.

## Targeted pattern scope

This rule targets Stylelint config modules such as `stylelint.config.ts`, `stylelint.config.mjs`, and `.stylelintrc.js`.

It focuses on top-level exported config objects, including configs wrapped in `defineConfig(...)`.

## What this rule reports

This rule reports override entries that only contain structural fields (`files` and optional `name`) and no effective config payload (for example `rules`, `customSyntax`, `extends`, `plugins`).

## Why this rule exists

Stylelint override entries are intended to apply specific configuration changes to a file subset. Entries without effective config content are misleading and increase maintenance noise.

## ❌ Incorrect

```ts
export default {
    overrides: [
        {
            files: ["**/*.scss"],
            name: "SCSS files",
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
            customSyntax: "postcss-scss",
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

- This rule reports override entries that contain no effective config payload.
- It intentionally skips entries with spread elements (`...foo`) because static analysis cannot safely prove whether effective config content is present.
- It does not auto-fix because the correct override payload is repository-specific.

## ESLint flat config example

```ts
import stylelint2 from "eslint-plugin-stylelint-2";

export default [stylelint2.configs.configuration];
```

## When not to use it

Do not use this rule if your repository intentionally keeps placeholder override entries as an intermediate migration step.

## Package documentation

Stylelint package documentation:

> **Rule catalog ID:** R037

## Further reading

- [Stylelint `overrides`](https://stylelint.io/user-guide/configure/#overrides)
