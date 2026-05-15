# disallow-stylelint-duplicate-rule-option-values

Disallow duplicate scalar literals in array-valued Stylelint secondary rule options.

## Targeted pattern scope

This rule targets Stylelint config modules such as `stylelint.config.ts`, `stylelint.config.mjs`, and `.stylelintrc.js`.

It focuses on top-level exported config objects, including configs wrapped in `defineConfig(...)`.

## What this rule reports

Reports duplicate scalar literals in array-valued properties inside secondary option objects.

## Why this rule exists

Duplicate option values add noise and can obscure actual rule intent during config review.

## ❌ Incorrect

```ts
export default {
    rules: {
        "selector-class-pattern": [
            "^[a-z]+$",
            {
                resolveNestedSelectors: [":global", ":global", ":host"],
            },
        ],
    },
};
```

## ✅ Correct

```ts
export default {
    rules: {
        "selector-class-pattern": [
            "^[a-z]+$",
            {
                resolveNestedSelectors: [":global", ":host"],
            },
        ],
    },
};
```

## Behavior and migration notes

This rule auto-fixes by keeping the first occurrence of each duplicate scalar literal value.

## ESLint flat config example

```ts
import stylelint2 from "eslint-plugin-stylelint-2";

export default [stylelint2.configs.configuration];
```

## When not to use it

Do not use this rule if your stylelint secondary option arrays intentionally include duplicate scalar values for generated-tool compatibility.

## Package documentation

Stylelint package documentation:

> **Rule catalog ID:** R032

## Further reading

- [Stylelint secondary options](https://stylelint.io/user-guide/configure/)
