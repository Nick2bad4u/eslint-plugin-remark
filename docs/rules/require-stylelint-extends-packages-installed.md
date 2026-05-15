# require-stylelint-extends-packages-installed

Require top-level Stylelint `extends` package specifiers to be listed in workspace dependencies.

## Targeted pattern scope

This rule targets Stylelint config modules such as `stylelint.config.ts`, `stylelint.config.mjs`, and `.stylelintrc.js`.

It focuses on top-level exported config objects, including configs wrapped in `defineConfig(...)`.

## What this rule reports

Reports package-backed `extends` entries that do not resolve to a declared dependency in the nearest workspace package.json.

## Why this rule exists

Shared Stylelint configs should reference installed packages explicitly. Missing dependency declarations create non-reproducible lint behavior across machines and CI jobs.

## ❌ Incorrect

```ts
export default {
    extends: ["stylelint-config-does-not-exist"],
    rules: {},
};
```

## ✅ Correct

```ts
export default {
    extends: ["stylelint-config-standard"],
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

Do not use this rule if your repository intentionally resolves `extends` packages through non-package-manager mechanisms.

## Package documentation

Stylelint package documentation:

> **Rule catalog ID:** R033

## Further reading

- [Stylelint extends](https://stylelint.io/user-guide/configure/#extends)
