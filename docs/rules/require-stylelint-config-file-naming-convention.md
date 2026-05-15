# require-stylelint-config-file-naming-convention

Require canonical `stylelint.config.*` naming for shared Stylelint config files.

## Targeted pattern scope

This rule targets Stylelint config modules such as `stylelint.config.ts`, `stylelint.config.mjs`, and `.stylelintrc.js`.

It focuses on top-level exported config objects, including configs wrapped in `defineConfig(...)`.

## What this rule reports

Reports Stylelint config files that are valid config targets but do not follow canonical `stylelint.config.*` naming.

## Why this rule exists

Canonical filenames improve discoverability in editors, scripts, and monorepos. Mixed `.stylelintrc*` and `stylelint.config.*` naming increases operational drift.

## ❌ Incorrect

```js
// .stylelintrc.js
export default {
    rules: {},
};
```

## ✅ Correct

```ts
// stylelint.config.ts
export default {
    rules: {},
};
```

## Behavior and migration notes

This rule reports non-canonical filenames and does not auto-fix because file renaming is outside safe text-fixer scope.

## ESLint flat config example

```ts
import stylelint2 from "eslint-plugin-stylelint-2";

export default [stylelint2.configs.configuration];
```

## When not to use it

Do not use this rule if your repository intentionally standardizes on `.stylelintrc*` filenames.

## Package documentation

Stylelint package documentation:

> **Rule catalog ID:** R035

## Further reading

- [Stylelint config formats](https://stylelint.io/user-guide/configure/)
