# prefer-stylelint-report-invalid-scope-disables

Require enabling Stylelint's `reportInvalidScopeDisables` config option in authored Stylelint config files.

## Targeted pattern scope

This rule targets Stylelint config modules such as `stylelint.config.ts`, `stylelint.config.mjs`, and `.stylelintrc.js`.

It focuses on top-level exported config objects, including configs wrapped in `defineConfig(...)`.

## What this rule reports

This rule reports Stylelint config objects when `reportInvalidScopeDisables` is:

- missing
- explicitly `false`
- configured as an array whose primary option is not `true`

## Why this rule exists

Stylelint can report disable comments that reference rules outside the active config. That catches stale or mistyped disable comments that silently stop being meaningful.

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
export default {
    reportInvalidScopeDisables: true,
    rules: {
        "color-no-invalid-hex": true,
    },
};
```

## Behavior and migration notes

- Missing properties are autofixed by inserting `reportInvalidScopeDisables: true`.
- `false` values are autofixed to `true`.
- Array-form values preserve secondary options while rewriting the primary option to `true`.

## Additional examples

### ✅ Correct — keep secondary options

```ts
export default {
    reportInvalidScopeDisables: [true, { severity: "warning" }],
};
```

## ESLint flat config example

```ts
import stylelint2 from "eslint-plugin-stylelint-2";

export default [
    stylelint2.configs.configuration,
];
```

## When not to use it

Do not use this rule if your team intentionally allows invalid-scope disable comments to pass silently.

## Package documentation

Stylelint package documentation:

> **Rule catalog ID:** R004

## Further reading

- [Stylelint configuring guide](https://stylelint.io/user-guide/configure/#reportinvalidscopedisables)
- [Stylelint ignore-code guide](https://stylelint.io/user-guide/ignore-code/)
