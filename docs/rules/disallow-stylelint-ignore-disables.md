# disallow-stylelint-ignore-disables

Disallow configuring Stylelint's top-level `ignoreDisables` option inside authored Stylelint config files.

## Targeted pattern scope

This rule targets Stylelint config modules such as `stylelint.config.ts`, `stylelint.config.mjs`, and `.stylelintrc.js`.

It focuses on top-level exported config objects, including configs wrapped in `defineConfig(...)`.

## What this rule reports

This rule reports Stylelint config objects that include a top-level `ignoreDisables` property.

## Why this rule exists

This plugin now provides a family of rules that reinforce Stylelint disable-comment reporting. `ignoreDisables: true` undermines that governance by making Stylelint disregard disable comments entirely.

That setting is an execution policy decision and is usually a poor fit for a shared committed config object.

## ❌ Incorrect

```ts
export default {
    ignoreDisables: true,
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

- This rule removes the top-level `ignoreDisables` property.
- It preserves the rest of the config object.
- If you truly need to ignore disable comments, set that at the Stylelint invocation layer instead of the shared config file.

## Additional examples

### ✅ Correct — leave invocation-only behavior to the runner

```ts
await stylelint.lint({
    code,
    ignoreDisables: true,
});
```

## ESLint flat config example

```ts
import stylelint2 from "eslint-plugin-stylelint-2";

export default [
    stylelint2.configs.configuration,
];
```

## When not to use it

Do not use this rule if your team intentionally wants a committed shared Stylelint config to ignore disable comments across every environment.

## Package documentation

Stylelint package documentation:

> **Rule catalog ID:** R008

## Further reading

- [Stylelint configuring guide](https://stylelint.io/user-guide/configure/#ignoredisables)
- [Stylelint ignore-code guide](https://stylelint.io/user-guide/ignore-code/)
