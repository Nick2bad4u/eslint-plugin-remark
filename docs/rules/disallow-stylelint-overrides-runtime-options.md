# disallow-stylelint-overrides-runtime-options

Disallow runtime-only Stylelint options (`allowEmptyInput`, `cache`, `fix`) inside `overrides` entries.

## Targeted pattern scope

This rule targets Stylelint config modules such as `stylelint.config.ts`, `stylelint.config.mjs`, and `.stylelintrc.js`.

It focuses on top-level exported config objects, including configs wrapped in `defineConfig(...)`.

## What this rule reports

This rule reports override entries that configure:

- `allowEmptyInput`
- `cache`
- `fix`

## Why this rule exists

Stylelint documents these as runtime options that should not be overridden per-file. Keeping them inside override blocks creates confusing behavior and weakens execution-level policy.

## ❌ Incorrect

```ts
export default {
    overrides: [
        {
            files: ["**/*.scss"],
            fix: true,
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

- This rule auto-fixes by removing the runtime-only option from each invalid override entry.
- Use execution-time controls (`eslint --fix`, Stylelint CLI options, task-runner settings) for runtime behavior.

## ESLint flat config example

```ts
import stylelint2 from "eslint-plugin-stylelint-2";

export default [stylelint2.configs.configuration];
```

## When not to use it

Do not use this rule if your team intentionally accepts override-local runtime behavior and understands the resulting execution coupling.

## Package documentation

Stylelint package documentation:

> **Rule catalog ID:** R036

## Further reading

- [Stylelint `allowEmptyInput`](https://stylelint.io/user-guide/configure/#allowemptyinput)
- [Stylelint `cache`](https://stylelint.io/user-guide/configure/#cache)
- [Stylelint `fix`](https://stylelint.io/user-guide/configure/#fix)
- [Stylelint `overrides`](https://stylelint.io/user-guide/configure/#overrides)
