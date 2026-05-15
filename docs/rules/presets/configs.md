# configs

Legacy alias page for the preferred `configuration` preset.

Use [`stylelint2.configs.configuration`](./configuration.md) for new documentation and examples.

`stylelint2.configs.configs` remains supported as a backwards-compatible alias.

## Flat config example

```ts
import stylelint2 from "eslint-plugin-stylelint-2";

export default [
    stylelint2.configs.configs,
];
```

## What this preset includes

- Legacy alias export for this plugin's preset surface (`stylelint2.configs.configs`)
- Same active rule set as [`recommended`](./recommended.md)

## What this preset does not include

- Additional rules beyond what `recommended` already enables
- Any behavior differences from `recommended` (it is an alias)

## Related preset docs

- [Configuration-only preset](./configuration.md)
- [Presets overview](./index.md)

## Rules in this preset

For the exhaustive generated rule matrix, see [Configuration-only preset](./configuration.md) and [Presets overview](./index.md).

| Rule                                                                                                                                                                     | Fix |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :-: |
| [`prefer-stylelint-cache`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/prefer-stylelint-cache)                                                     |  🔧 |
| [`disallow-stylelint-default-severity`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-default-severity)                           |  🔧 |
| [`prefer-stylelint-fix`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/prefer-stylelint-fix)                                                         |  🔧 |
| [`prefer-stylelint-formatter`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/prefer-stylelint-formatter)                                             |  —  |
| [`disallow-stylelint-ignore-disables`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-ignore-disables)                             |  🔧 |
| [`disallow-stylelint-ignore-files`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-ignore-files)                                   |  🔧 |
| [`prefer-stylelint-define-config`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/prefer-stylelint-define-config)                                     |  🔧 |
| [`prefer-stylelint-report-descriptionless-disables`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/prefer-stylelint-report-descriptionless-disables) |  🔧 |
| [`prefer-stylelint-report-invalid-scope-disables`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/prefer-stylelint-report-invalid-scope-disables)     |  🔧 |
| [`prefer-stylelint-report-needless-disables`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/prefer-stylelint-report-needless-disables)               |  🔧 |
| [`prefer-stylelint-report-unscoped-disables`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/prefer-stylelint-report-unscoped-disables)               |  🔧 |
