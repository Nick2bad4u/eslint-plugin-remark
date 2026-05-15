# disallow-stylelint-default-severity

Disallow configuring Stylelint's top-level `defaultSeverity` option inside authored Stylelint config files.

## Targeted pattern scope

This rule targets Stylelint config modules such as `stylelint.config.ts`, `stylelint.config.mjs`, and `.stylelintrc.js`.

It focuses on top-level exported config objects, including configs wrapped in `defineConfig(...)`.

## What this rule reports

This rule reports Stylelint config objects that include a top-level `defaultSeverity` property.

## Why this rule exists

`defaultSeverity` applies a global warning/error policy across rules. In an ESLint-first workflow, that global Stylelint severity layer can conflict with the severity contract already defined at the ESLint rule boundary.

Keeping severity explicit per Stylelint rule (or enforced at the ESLint config layer) makes review outcomes easier to reason about and avoids hidden global severity drift.

## ❌ Incorrect

```ts
export default {
    defaultSeverity: "warning",
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

- This rule removes the top-level `defaultSeverity` property.
- It preserves the rest of the config object.
- If you need warning/error policy differences, keep them explicit in rule-level secondary options or the ESLint config that enables this plugin.

## Additional examples

### ✅ Correct — severity stays local to a rule

```ts
export default {
    rules: {
        "number-max-precision": [2, { severity: "warning" }],
    },
};
```

## ESLint flat config example

```ts
import stylelint2 from "eslint-plugin-stylelint-2";

export default [stylelint2.configs.configuration];
```

## When not to use it

Do not use this rule if your team intentionally enforces one global Stylelint default severity in committed config and accepts that policy being coupled to shared config files.

## Package documentation

Stylelint package documentation:

> **Rule catalog ID:** R009

## Further reading

- [Stylelint configuring guide](https://stylelint.io/user-guide/configure/#defaultseverity)
- [Stylelint severity option](https://stylelint.io/user-guide/configure/#severity)
