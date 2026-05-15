# disallow-stylelint-configuration-comment

Disallow configuring Stylelint's top-level `configurationComment` option inside authored Stylelint config files.

## Targeted pattern scope

This rule targets Stylelint config modules such as `stylelint.config.ts`, `stylelint.config.mjs`, and `.stylelintrc.js`.

It focuses on top-level exported config objects, including configs wrapped in `defineConfig(...)`.

## What this rule reports

This rule reports Stylelint config objects that include a top-level `configurationComment` property.

## Why this rule exists

`configurationComment` changes how in-source configuration comments are interpreted. In shared configs, overriding this can create hard-to-debug behavior differences across repositories and tooling.

## ❌ Incorrect

```ts
export default {
    configurationComment: "stylelint-enable",
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

- This rule removes top-level `configurationComment`.
- It preserves the rest of the config object.
- Keep configuration-comment behavior aligned with Stylelint defaults unless there is a strict organization-wide policy.

## ESLint flat config example

```ts
import stylelint2 from "eslint-plugin-stylelint-2";

export default [stylelint2.configs.configuration];
```

## When not to use it

Do not use this rule if your organization explicitly standardizes a non-default Stylelint configuration comment token.

## Package documentation

Stylelint package documentation:

> **Rule catalog ID:** R016

## Further reading

- [Stylelint configuration comments](https://stylelint.io/user-guide/ignore-code/)
