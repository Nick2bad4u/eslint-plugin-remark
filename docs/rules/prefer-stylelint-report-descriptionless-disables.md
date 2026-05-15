# prefer-stylelint-report-descriptionless-disables

Require enabling Stylelint's `reportDescriptionlessDisables` config option in authored Stylelint config files.

## Targeted pattern scope

This rule targets Stylelint config modules such as `stylelint.config.ts`, `stylelint.config.mjs`, and `.stylelintrc.js`.

It focuses on top-level exported config objects, including configs wrapped in `defineConfig(...)`.

## What this rule reports

This rule reports Stylelint config objects when `reportDescriptionlessDisables` is:

- missing
- explicitly `false`
- configured as an array whose primary option is not `true`

## Why this rule exists

Stylelint already ships a built-in config option for reporting disable comments that do not explain why a rule was turned off.

Enabling that option improves review quality because disable comments stop being silent escapes with no context.

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
    reportDescriptionlessDisables: true,
    rules: {
        "color-no-invalid-hex": true,
    },
};
```

## Behavior and migration notes

- Missing properties are autofixed by inserting `reportDescriptionlessDisables: true`.
- `false` values are autofixed to `true`.
- Array-form values preserve the secondary options object while rewriting the primary option to `true`.

## Additional examples

### ✅ Correct — keep secondary options

```ts
export default {
    reportDescriptionlessDisables: [true, { severity: "warning" }],
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

Do not use this rule if your team intentionally allows undocumented Stylelint disable comments and does not want Stylelint to report them.

## Package documentation

Stylelint package documentation:

> **Rule catalog ID:** R003

## Further reading

- [Stylelint ignore-code guide](https://stylelint.io/user-guide/ignore-code/)
- [Stylelint configuring guide](https://stylelint.io/user-guide/configure/#reportdescriptionlessdisables)
