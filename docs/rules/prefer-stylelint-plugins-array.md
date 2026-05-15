# prefer-stylelint-plugins-array

Prefer array form for top-level Stylelint `plugins` declarations.

## Targeted pattern scope

This rule targets Stylelint config modules such as `stylelint.config.ts`, `stylelint.config.mjs`, and `.stylelintrc.js`.

It focuses on top-level exported config objects, including configs wrapped in `defineConfig(...)`.

## What this rule reports

Reports `plugins` when it is defined as a single string instead of an array.

## Why this rule exists

Array form makes plugin composition deterministic and easier to maintain in shared configuration.

## ❌ Incorrect

```ts
export default {
    plugins: "stylelint-order",
    rules: {},
};
```

## ✅ Correct

```ts
export default {
    plugins: ["stylelint-order"],
    rules: {},
};
```

## Behavior and migration notes

This rule auto-fixes scalar string form to a single-entry array.

## ESLint flat config example

```ts
import stylelint2 from "eslint-plugin-stylelint-2";

export default [stylelint2.configs.configuration];
```

## When not to use it

Do not use this rule if your repository intentionally enforces scalar `plugins` syntax.

## Package documentation

Stylelint package documentation:

> **Rule catalog ID:** R022

## Further reading

- [Stylelint plugins](https://stylelint.io/user-guide/configure/#plugins)
