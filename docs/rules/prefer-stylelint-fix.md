# prefer-stylelint-fix

Prefer enabling Stylelint's top-level `fix` option in authored Stylelint config files.

## Targeted pattern scope

This rule targets Stylelint config modules such as `stylelint.config.ts`, `stylelint.config.mjs`, and `.stylelintrc.js`.

It focuses on top-level exported config objects, including configs wrapped in `defineConfig(...)`.

## What this rule reports

This rule reports Stylelint config objects that omit `fix`, or configure it with a disabled value.

## Why this rule exists

If your repository expects Stylelint autofix to be on by default, an explicit top-level `fix` setting makes that operational choice visible and consistent.

This rule is intentionally opinionated and best suited for repositories that want shared Stylelint config files to declare autofix-on behavior directly.

This rule is intentionally excluded from `stylelint2.configs.recommended` because it encodes an opinionated operational default rather than a broadly applicable config-hygiene rule.

## ❌ Incorrect

```ts
export default {
    rules: {},
};
```

## ✅ Correct

```ts
export default {
    fix: true,
    rules: {},
};
```

## Behavior and migration notes

- This rule auto-fixes missing or disabled top-level `fix` configuration to `fix: true`.
- Existing enabled values such as `"strict"` and `"lax"` are accepted.
- Use this rule only when enabling autofix in shared config is an intentional repository policy.

## Additional examples

### ✅ Correct — execution controls autofix

```json
{
    "scripts": {
        "lint:styles": "eslint \"src/**/*.{css,scss}\""
    }
}
```

## ESLint flat config example

```ts
import stylelint2 from "eslint-plugin-stylelint-2";

export default [stylelint2.configs.configuration];
```

## When not to use it

Do not use this rule if your team wants autofix to stay an invocation-only decision or needs different fix modes across environments.

## Package documentation

Stylelint package documentation:

> **Rule catalog ID:** R011

## Further reading

- [Stylelint configuring guide](https://stylelint.io/user-guide/configure/#fix)
- [Stylelint autofix documentation](https://stylelint.io/user-guide/options/#fix)
