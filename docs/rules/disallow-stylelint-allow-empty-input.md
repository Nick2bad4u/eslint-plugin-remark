# disallow-stylelint-allow-empty-input

Disallow configuring Stylelint's top-level `allowEmptyInput` option inside authored Stylelint config files.

## Targeted pattern scope

This rule targets Stylelint config modules such as `stylelint.config.ts`, `stylelint.config.mjs`, and `.stylelintrc.js`.

It focuses on top-level exported config objects, including configs wrapped in `defineConfig(...)`.

## What this rule reports

This rule reports Stylelint config objects that include a top-level `allowEmptyInput` property.

## Why this rule exists

`allowEmptyInput` changes runtime behavior for file discovery and no-op lint runs. That policy is an execution concern and should be controlled at invocation level, not embedded in shared config state.

## ❌ Incorrect

```ts
export default {
    allowEmptyInput: true,
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

- This rule removes the top-level `allowEmptyInput` property.
- It preserves the rest of the config object.
- Prefer explicit file globs and task-level invocation behavior for empty-input handling.

## ESLint flat config example

```ts
import stylelint2 from "eslint-plugin-stylelint-2";

export default [stylelint2.configs.configuration];
```

## When not to use it

Do not use this rule if your team intentionally enforces one shared `allowEmptyInput` policy in committed Stylelint config files.

## Package documentation

Stylelint package documentation:

> **Rule catalog ID:** R013

## Further reading

- [Stylelint configuring guide](https://stylelint.io/user-guide/configure/#allowemptyinput)
