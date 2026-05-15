# prefer-stylelint-define-config

Prefer wrapping exported Stylelint config objects in `defineConfig()` from `stylelint-define-config`.

## Targeted pattern scope

This rule targets direct default object exports in Stylelint config files such as `stylelint.config.ts` and `.stylelintrc.js`.

It intentionally focuses on the narrow case that can be autofixed safely.

## What this rule reports

This rule reports `export default { ... }` object exports in Stylelint config files when the object is not wrapped in `defineConfig(...)`.

## Why this rule exists

`defineConfig()` makes the intent of a Stylelint config module explicit and improves tooling support for config authoring.

The helper also gives teams a single recognizable pattern for authored config modules instead of a mix of raw objects and helper-wrapped objects.

## ❌ Incorrect

```ts
export default {
    rules: {
        "color-no-invalid-hex": true,
    },
};
```

## ✅ Correct

```ts
import { defineConfig } from "stylelint-define-config";

export default defineConfig({
    rules: {
        "color-no-invalid-hex": true,
    },
});
```

## Behavior and migration notes

- The current autofix rewrites direct object exports only.
- The rule does not try to rewrite CommonJS config modules.
- The rule does not try to rewrite `export default config` when `config` is declared elsewhere.

That restraint is deliberate. Broad config rewrites are easier to get wrong than direct object-export fixes.

## Additional examples

### ✅ Correct — already wrapped export

```ts
import { defineConfig } from "stylelint-define-config";

const config = defineConfig({
    rules: {
        "color-no-invalid-hex": true,
    },
});

export default config;
```

## ESLint flat config example

```ts
import stylelint2 from "eslint-plugin-stylelint-2";

export default [
    stylelint2.configs.configuration,
];
```

## When not to use it

Do not use this rule if your project intentionally keeps Stylelint configs in CommonJS or uses a custom config factory that should stay unchanged.

## Package documentation

Stylelint package documentation:

> **Rule catalog ID:** R002

## Further reading

- [stylelint-define-config](https://www.npmjs.com/package/stylelint-define-config)
- [Stylelint configuration guide](https://stylelint.io/user-guide/configure)
