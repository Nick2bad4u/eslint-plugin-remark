# require-stylelint-plugins-packages-installed

Require top-level Stylelint `plugins` package specifiers to be listed in workspace dependencies.

## Targeted pattern scope

This rule targets Stylelint config modules such as `stylelint.config.ts`, `stylelint.config.mjs`, and `.stylelintrc.js`.

It focuses on top-level exported config objects, including configs wrapped in `defineConfig(...)`.

## What this rule reports

Reports package-backed `plugins` entries that do not resolve to a declared dependency in the nearest workspace package.json.

## Why this rule exists

Plugin references in shared config should be reproducible across contributors and CI. Missing plugin dependency declarations are a common source of broken lint runs.

## ❌ Incorrect

```ts
export default {
    plugins: ["stylelint-plugin-does-not-exist"],
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

This rule reports unresolved package references and does not auto-fix because dependency installation strategy is repository-specific.

## ESLint flat config example

```ts
import stylelint2 from "eslint-plugin-stylelint-2";

export default [stylelint2.configs.configuration];
```

## When not to use it

Do not use this rule if your repository intentionally loads plugins from non-standard dependency resolution paths.

## Package documentation

Stylelint package documentation:

> **Rule catalog ID:** R034

## Further reading

- [Stylelint plugins](https://stylelint.io/user-guide/configure/#plugins)
