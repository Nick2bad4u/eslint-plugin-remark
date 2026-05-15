# all

`all` enables the stylesheet bridge plus the full configuration-rule catalog, including the more opinionated operational policy rules that `recommended` intentionally leaves out.

## Flat config example

```ts
import stylelint2 from "eslint-plugin-stylelint-2";

export default [
    ...stylelint2.configs.all,
];
```

## What this preset includes

- The Stylelint bridge rule (`stylelint`)
- Configuration-authoring policy rules
- Opinionated operational policy rules (cache/formatter/fix/default-severity/reporting preferences)

## What this preset does not include

- Nothing from this plugin is excluded; this is the broadest preset.

## Related preset docs

- [Presets overview](./index.md)
- [Recommended preset](./recommended.md)
- [Stylelint-only preset](./stylelint-only.md)
- [Configuration-only preset](./configuration.md)

## Rules in this preset

For the exhaustive generated rule matrix, see [Presets overview](./index.md).

| Rule                                                                                                                                                                     | Fix |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :-: |
| [`stylelint`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/stylelint)                                                                               |  🔧 |
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
