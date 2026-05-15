# sort-stylelint-rule-keys

Enforce sorted top-level Stylelint `rules` keys in shared config files.

## Targeted pattern scope

This rule targets Stylelint config modules such as `stylelint.config.ts`, `stylelint.config.mjs`, and `.stylelintrc.js`.

It focuses on top-level exported config objects, including configs wrapped in `defineConfig(...)`.

## What this rule reports

Reports `rules` objects whose keys are not in ascending lexical order.

## Why this rule exists

Stable key ordering reduces diff noise and makes large shared rulesets easier to scan and review.

## ❌ Incorrect

```ts
export default {
    rules: {
        "color-named": "never",
        "at-rule-no-unknown": true,
    },
};
```

## ✅ Correct

```ts
export default {
    rules: {
        "at-rule-no-unknown": true,
        "color-named": "never",
    },
};
```

## Behavior and migration notes

This rule auto-fixes when sorting can be done safely (for example, no nearby comments attached to rule entries).

## ESLint flat config example

```ts
import stylelint2 from "eslint-plugin-stylelint-2";

export default [stylelint2.configs.configuration];
```

## When not to use it

Do not use this rule if your team intentionally uses non-lexical grouping for rule keys.

## Package documentation

Stylelint package documentation:

> **Rule catalog ID:** R031

## Further reading

- [Stylelint rules](https://stylelint.io/user-guide/rules/list)
