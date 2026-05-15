# disallow-stylelint-null-rule-config

Disallow `null` values in top-level Stylelint `rules` entries.

## Targeted pattern scope

This rule targets Stylelint config modules such as `stylelint.config.ts`, `stylelint.config.mjs`, and `.stylelintrc.js`.

It focuses on top-level exported config objects, including configs wrapped in `defineConfig(...)`.

## What this rule reports

Reports top-level rule entries configured as `null`, for example `"at-rule-no-unknown": null`.

## Why this rule exists

`null` entries hide rule intent in shared configs and can mask policy drift. Explicit rule values are easier to audit and maintain.

## ❌ Incorrect

```ts
export default {
    rules: {
        "at-rule-no-unknown": null,
    },
};
```

## ✅ Correct

```ts
export default {
    rules: {
        "at-rule-no-unknown": true,
    },
};
```

## Behavior and migration notes

This rule reports null rule entries and does not auto-fix because desired replacement values are policy-specific.

## ESLint flat config example

```ts
import stylelint2 from "eslint-plugin-stylelint-2";

export default [stylelint2.configs.configuration];
```

## When not to use it

Do not use this rule if your team intentionally uses `null` to disable inherited rules in shared config files.

## Package documentation

Stylelint package documentation:

> **Rule catalog ID:** R030

## Further reading

- [Stylelint rules](https://stylelint.io/user-guide/rules/list)
