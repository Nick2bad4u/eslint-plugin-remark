# prefer-stylelint-cache

Prefer enabling Stylelint's top-level `cache` option in authored Stylelint config files.

This rule is intentionally excluded from `stylelint2.configs.recommended` because it encodes an opinionated operational default rather than a broadly applicable config-hygiene rule.

## Targeted pattern scope

This rule targets Stylelint config modules such as `stylelint.config.ts`, `stylelint.config.mjs`, and `.stylelintrc.js`.

It focuses on top-level exported config objects, including configs wrapped in `defineConfig(...)`.

## What this rule reports

This rule reports Stylelint config objects that omit `cache`, or configure it as a disabled value.

## Why this rule exists

If your team consistently runs Stylelint with caching enabled, an explicit top-level `cache` setting makes that default visible in the shared config instead of leaving it implicit in scattered scripts.

This rule is opinionated. It is useful when you want config files to advertise that fast repeated lint runs are part of the default workflow.

## ❌ Incorrect

```ts
export default {
    rules: {},
};
```

## ✅ Correct

```ts
export default {
    cache: true,
    rules: {},
};
```

## Behavior and migration notes

- This rule auto-fixes missing or disabled top-level `cache` configuration to `cache: true`.
- It preserves the rest of the config object.
- Use this rule only when cache-on-by-default is a deliberate repository policy.

## Additional examples

### ✅ Correct — cache policy at invocation level

```json
{
    "scripts": {
        "lint:stylelint": "stylelint --cache \"src/**/*.{css,scss}\""
    }
}
```

## ESLint flat config example

```ts
import stylelint2 from "eslint-plugin-stylelint-2";

export default [stylelint2.configs.configuration];
```

## When not to use it

Do not use this rule if your team prefers cache behavior to stay entirely at invocation scope or wants different runners to choose different cache strategies.

## Package documentation

Stylelint package documentation:

> **Rule catalog ID:** R012

## Further reading

- [Stylelint configuring guide](https://stylelint.io/user-guide/configure/#cache)
- [Stylelint cache option](https://stylelint.io/user-guide/options/#cache)
