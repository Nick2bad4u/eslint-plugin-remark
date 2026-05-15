# disallow-stylelint-processors

Disallow configuring Stylelint's top-level `processors` option inside authored Stylelint config files.

## Targeted pattern scope

This rule targets Stylelint config modules such as `stylelint.config.ts`, `stylelint.config.mjs`, and `.stylelintrc.js`.

It focuses on top-level exported config objects, including configs wrapped in `defineConfig(...)`.

## What this rule reports

This rule reports Stylelint config objects that include a top-level `processors` property.

## Why this rule exists

Processor pipelines are often legacy integration paths that hide parsing behavior and introduce brittle lint flows. Modern Stylelint usage favors explicit syntax selection and rule config composition.

## ❌ Incorrect

```ts
export default {
    processors: ["stylelint-processor-styled-components"],
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

- This rule removes top-level `processors`.
- It preserves the rest of the config object.
- Prefer modern syntax-aware configuration and explicit file scoping.

## ESLint flat config example

```ts
import stylelint2 from "eslint-plugin-stylelint-2";

export default [stylelint2.configs.configuration];
```

## When not to use it

Do not use this rule if your repository still relies on processor-based Stylelint integration and cannot migrate yet.

## Package documentation

Stylelint package documentation:

> **Rule catalog ID:** R015

## Further reading

- [Stylelint configuring guide](https://stylelint.io/user-guide/configure/)
