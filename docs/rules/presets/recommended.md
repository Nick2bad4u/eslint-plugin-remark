# recommended

Enable both primary workflows in `eslint-plugin-stylelint-2`:

- run the Stylelint bridge from ESLint for stylesheet files
- enforce the broadly useful Stylelint configuration-authoring rules in config modules

Use this preset when you want the default rollout path without opting into every operational or repository-specific Stylelint config preference.

`recommended` intentionally leaves out the more opinionated policy rules around cache defaults, formatter defaults, autofix defaults, global ignore globs, disable-comment bypasses, and global default severity.

## Flat config example

```ts
import stylelint2 from "eslint-plugin-stylelint-2";

export default [
    ...stylelint2.configs.recommended,
];
```

## What this preset includes

- The Stylelint bridge rule (`stylelint`)
- High-signal configuration policy rules for common production usage

## What this preset does not include

- The full strict policy surface from [`all`](./all.md)
- Configuration-only mode semantics from [`configuration`](./configuration.md)

## Related preset docs

- [Presets overview](./index.md)
- [Stylelint-only preset](./stylelint-only.md)
- [Configuration-only preset](./configuration.md)
- [All preset](./all.md)

## Rules in this preset

For the exhaustive generated rule matrix, see [Presets overview](./index.md).

| Rule                                                                                                                                                                     | Fix |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :-: |
| [`stylelint`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/stylelint)                                                                               |  🔧 |
| [`prefer-stylelint-define-config`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/prefer-stylelint-define-config)                                     |  🔧 |
| [`prefer-stylelint-report-descriptionless-disables`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/prefer-stylelint-report-descriptionless-disables) |  🔧 |
| [`prefer-stylelint-report-invalid-scope-disables`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/prefer-stylelint-report-invalid-scope-disables)     |  🔧 |
| [`prefer-stylelint-report-needless-disables`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/prefer-stylelint-report-needless-disables)               |  🔧 |
| [`prefer-stylelint-report-unscoped-disables`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/prefer-stylelint-report-unscoped-disables)               |  🔧 |
