# prefer-stylelint-formatter

Prefer explicit top-level Stylelint `formatter` configuration in authored Stylelint config files.

## Targeted pattern scope

This rule targets Stylelint config modules such as `stylelint.config.ts`, `stylelint.config.mjs`, and `.stylelintrc.js`.

It focuses on top-level exported config objects, including configs wrapped in `defineConfig(...)`.

## What this rule reports

This rule reports Stylelint config objects that omit `formatter`, or configure it with an unusable empty string.

## Why this rule exists

If your team wants Stylelint output shape to be explicit across runners, an explicit shared `formatter` setting keeps that policy visible in the config instead of burying it in task wiring.

This is an opinionated rule. It is useful only when consistent formatter selection is part of your repository policy.

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
    formatter: "json",
    rules: {},
};
```

## Behavior and migration notes

- This rule reports missing or unusable top-level `formatter` configuration.
- It does not auto-fix because the correct formatter choice is repository-specific.
- Non-literal formatter expressions are accepted to avoid false positives in JavaScript-based config modules.

## Additional examples

### ✅ Correct — formatter belongs in the runner

```ts
await stylelint.lint({
    code,
    formatter: "string",
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

Do not use this rule if your team prefers formatter choice to remain purely at invocation scope.

## Package documentation

Stylelint package documentation:

> **Rule catalog ID:** R007

## Further reading

- [Stylelint configuring guide](https://stylelint.io/user-guide/configure/#formatter)
- [Stylelint Node API](https://stylelint.io/user-guide/node-api/)
