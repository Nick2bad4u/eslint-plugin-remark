# disallow-stylelint-empty-rules-object

Disallow an empty top-level `rules` object in authored Stylelint config files.

## Targeted pattern scope

This rule targets Stylelint config modules such as `stylelint.config.ts`, `stylelint.config.mjs`, and `.stylelintrc.js`.

It focuses on top-level exported config objects, including configs wrapped in `defineConfig(...)`.

## What this rule reports

This rule reports config objects that include `rules: {}` with no configured rules.

## Why this rule exists

An empty `rules` object in committed shared config is usually accidental drift. It communicates that rule policy exists while actually enabling nothing.

## ❌ Incorrect

```ts
export default {
    rules: {},
};
```

## ✅ Correct

```ts
export default {
    rules: {
        "color-no-invalid-hex": true,
    },
};
```

## Behavior and migration notes

- This rule reports empty rules objects.
- It does not auto-fix because the desired replacement depends on your policy (add real rules or remove the object).

## ESLint flat config example

```ts
import stylelint2 from "eslint-plugin-stylelint-2";

export default [stylelint2.configs.configuration];
```

## When not to use it

Do not use this rule if your team intentionally keeps empty `rules` objects as scaffolding placeholders.

## Package documentation

Stylelint package documentation:

> **Rule catalog ID:** R018

## Further reading

- [Stylelint rules reference](https://stylelint.io/user-guide/rules/list)
