# require-stylelint-report-disables

Require `reportDisables: true` in authored Stylelint config files.

## Targeted pattern scope

This rule targets Stylelint config modules such as `stylelint.config.ts`, `stylelint.config.mjs`, and `.stylelintrc.js`.

It focuses on top-level exported config objects, including configs wrapped in `defineConfig(...)`.

## What this rule reports

Reports configs where `reportDisables` is missing or explicitly set to `false`.

## Why this rule exists

Disable-comment usage should stay visible during lint runs. Enabling `reportDisables` improves governance and reviewability in shared lint policy.

## ❌ Incorrect

```ts
export default {
    rules: {},
};
```

```ts
export default {
    reportDisables: false,
    rules: {},
};
```

## ✅ Correct

```ts
export default {
    reportDisables: true,
    rules: {},
};
```

## Behavior and migration notes

This rule auto-fixes by inserting or setting `reportDisables: true`.

## ESLint flat config example

```ts
import stylelint2 from "eslint-plugin-stylelint-2";

export default [stylelint2.configs.configuration];
```

## When not to use it

Do not use this rule if your team intentionally suppresses disable-comment reporting.

## Package documentation

Stylelint package documentation:

> **Rule catalog ID:** R029

## Further reading

- [Stylelint reportDisables](https://stylelint.io/user-guide/configure/#reportdisables)
