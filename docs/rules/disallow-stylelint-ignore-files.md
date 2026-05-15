# disallow-stylelint-ignore-files

Disallow configuring Stylelint's top-level `ignoreFiles` option inside authored Stylelint config files.

## Targeted pattern scope

This rule targets Stylelint config modules such as `stylelint.config.ts`, `stylelint.config.mjs`, and `.stylelintrc.js`.

It focuses on top-level exported config objects, including configs wrapped in `defineConfig(...)`.

## What this rule reports

This rule reports Stylelint config objects that include a top-level `ignoreFiles` property.

## Why this rule exists

`ignoreFiles` changes lint coverage at the config level and can accidentally hide files from linting across editor, CI, and local workflows.

Stylelint also documents that `ignoreFiles` is not efficient for broad ignore coverage and can override default `node_modules` ignore behavior. In shared configs, ignore scope is usually clearer in `.stylelintignore` or invocation-level file globs.

## ❌ Incorrect

```ts
export default {
    ignoreFiles: ["**/vendor/**/*.css"],
    rules: {},
};
```

## ✅ Correct

```ts
export default {
    rules: {},
};
```

## Behavior and migration notes

- This rule removes the top-level `ignoreFiles` property.
- It preserves the rest of the config object.
- Move ignore patterns to `.stylelintignore` (preferred for file-scope ignores) or to explicit invocation globs in scripts.

## Additional examples

### ✅ Correct — ignore scope moved out of shared config

```ts
// package.json
{
    "scripts": {
        "lint:css": "stylelint \"src/**/*.{css,scss}\""
    }
}
```

## ESLint flat config example

```ts
import stylelint2 from "eslint-plugin-stylelint-2";

export default [stylelint2.configs.configuration];
```

## When not to use it

Do not use this rule if your team intentionally controls all Stylelint ignore patterns directly in the committed config object and accepts that coupling.

## Package documentation

Stylelint package documentation:

> **Rule catalog ID:** R010

## Further reading

- [Stylelint configuring guide](https://stylelint.io/user-guide/configure/#ignorefiles)
- [Stylelint ignoring code](https://stylelint.io/user-guide/ignore-code/)
