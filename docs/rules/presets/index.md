---
title: Presets
description: Preset reference for eslint-plugin-stylelint-2.
---

# Presets

The plugin currently exposes four presets:

- `stylelint2.configs.recommended`
- `stylelint2.configs.stylelintOnly`
- `stylelint2.configs.configuration`
- `stylelint2.configs.all`

Legacy aliases remain available:

- `stylelint2.configs.stylesheets` → `stylelint2.configs.stylelintOnly`
- `stylelint2.configs.configs` → `stylelint2.configs.configuration`

## Preset setup guides

Use the setup page for the preset you want to enable:

| Preset                                                    | Purpose                                                                                               | Setup page                                            |
| --------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| [`stylelint2.configs.recommended`](./recommended.md)      | Enable both stylesheet linting and Stylelint config authoring guidance.                               | [Recommended preset guide](./recommended.md)          |
| [`stylelint2.configs.stylelintOnly`](./stylelint-only.md) | Enable only the Stylelint bridge workflow for stylesheets and ESLint-side autofix.                    | [Stylelint-only preset guide](./stylelint-only.md)    |
| [`stylelint2.configs.configuration`](./configuration.md)  | Lint only Stylelint config modules and disable-comment reporting settings, with no stylesheet bridge. | [Configuration-only preset guide](./configuration.md) |
| [`stylelint2.configs.all`](./all.md)                      | Enable every preset entry currently shipped by this plugin.                                           | [All preset guide](./all.md)                          |

## Rule matrix

Fix legend:
- `🔧` = autofixable
- `—` = report only

Preset key legend:
  - [`🟡`](./recommended.md) — [`stylelint2.configs.recommended`](./recommended.md)
  - [`🎨`](./stylelint-only.md) — [`stylelint2.configs.stylelintOnly`](./stylelint-only.md)
  - [`🔧`](./configuration.md) — [`stylelint2.configs.configuration`](./configuration.md)
  - [`🟣`](./all.md) — [`stylelint2.configs.all`](./all.md)

| Rule | Fix | Preset key |
| --- | :-: | :-- |
| [`stylelint`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/stylelint) | 🔧 | [🟡](./recommended.md) [🎨](./stylelint-only.md) [🟣](./all.md) |
| [`disallow-stylelint-allow-empty-input`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-allow-empty-input) | 🔧 | [🟡](./recommended.md) [🔧](./configuration.md) [🟣](./all.md) |
| [`disallow-stylelint-configuration-comment`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-configuration-comment) | 🔧 | [🟡](./recommended.md) [🔧](./configuration.md) [🟣](./all.md) |
| [`disallow-stylelint-custom-syntax`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-custom-syntax) | 🔧 | [🟡](./recommended.md) [🔧](./configuration.md) [🟣](./all.md) |
| [`disallow-stylelint-default-severity`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-default-severity) | 🔧 | [🔧](./configuration.md) [🟣](./all.md) |
| [`disallow-stylelint-duplicate-extends`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-duplicate-extends) | 🔧 | [🟡](./recommended.md) [🔧](./configuration.md) [🟣](./all.md) |
| [`disallow-stylelint-duplicate-plugins`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-duplicate-plugins) | 🔧 | [🟡](./recommended.md) [🔧](./configuration.md) [🟣](./all.md) |
| [`disallow-stylelint-duplicate-rule-option-values`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-duplicate-rule-option-values) | 🔧 | [🟡](./recommended.md) [🔧](./configuration.md) [🟣](./all.md) |
| [`disallow-stylelint-empty-rules-object`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-empty-rules-object) | — | [🟡](./recommended.md) [🔧](./configuration.md) [🟣](./all.md) |
| [`disallow-stylelint-ignore-disables`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-ignore-disables) | 🔧 | [🔧](./configuration.md) [🟣](./all.md) |
| [`disallow-stylelint-ignore-files`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-ignore-files) | 🔧 | [🔧](./configuration.md) [🟣](./all.md) |
| [`disallow-stylelint-null-rule-config`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-null-rule-config) | — | [🟡](./recommended.md) [🔧](./configuration.md) [🟣](./all.md) |
| [`disallow-stylelint-overrides-runtime-options`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-overrides-runtime-options) | 🔧 | [🟡](./recommended.md) [🔧](./configuration.md) [🟣](./all.md) |
| [`disallow-stylelint-processors`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-processors) | 🔧 | [🟡](./recommended.md) [🔧](./configuration.md) [🟣](./all.md) |
| [`disallow-stylelint-relative-extends-paths`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-relative-extends-paths) | — | [🟡](./recommended.md) [🔧](./configuration.md) [🟣](./all.md) |
| [`disallow-stylelint-relative-plugin-paths`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-relative-plugin-paths) | — | [🟡](./recommended.md) [🔧](./configuration.md) [🟣](./all.md) |
| [`prefer-stylelint-cache`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/prefer-stylelint-cache) | 🔧 | [🔧](./configuration.md) [🟣](./all.md) |
| [`prefer-stylelint-define-config`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/prefer-stylelint-define-config) | 🔧 | [🟡](./recommended.md) [🔧](./configuration.md) [🟣](./all.md) |
| [`prefer-stylelint-extends-array`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/prefer-stylelint-extends-array) | 🔧 | [🟡](./recommended.md) [🔧](./configuration.md) [🟣](./all.md) |
| [`prefer-stylelint-fix`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/prefer-stylelint-fix) | 🔧 | [🔧](./configuration.md) [🟣](./all.md) |
| [`prefer-stylelint-formatter`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/prefer-stylelint-formatter) | — | [🔧](./configuration.md) [🟣](./all.md) |
| [`prefer-stylelint-plugins-array`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/prefer-stylelint-plugins-array) | 🔧 | [🟡](./recommended.md) [🔧](./configuration.md) [🟣](./all.md) |
| [`prefer-stylelint-report-descriptionless-disables`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/prefer-stylelint-report-descriptionless-disables) | 🔧 | [🟡](./recommended.md) [🔧](./configuration.md) [🟣](./all.md) |
| [`prefer-stylelint-report-invalid-scope-disables`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/prefer-stylelint-report-invalid-scope-disables) | 🔧 | [🟡](./recommended.md) [🔧](./configuration.md) [🟣](./all.md) |
| [`prefer-stylelint-report-needless-disables`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/prefer-stylelint-report-needless-disables) | 🔧 | [🟡](./recommended.md) [🔧](./configuration.md) [🟣](./all.md) |
| [`prefer-stylelint-report-unscoped-disables`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/prefer-stylelint-report-unscoped-disables) | 🔧 | [🟡](./recommended.md) [🔧](./configuration.md) [🟣](./all.md) |
| [`require-stylelint-custom-syntax-in-overrides`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/require-stylelint-custom-syntax-in-overrides) | — | [🟡](./recommended.md) [🔧](./configuration.md) [🟣](./all.md) |
| [`require-stylelint-config-file-naming-convention`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/require-stylelint-config-file-naming-convention) | — | [🟡](./recommended.md) [🔧](./configuration.md) [🟣](./all.md) |
| [`require-stylelint-extends-packages-installed`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/require-stylelint-extends-packages-installed) | — | [🟡](./recommended.md) [🔧](./configuration.md) [🟣](./all.md) |
| [`require-stylelint-overrides-configuration`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/require-stylelint-overrides-configuration) | — | [🟡](./recommended.md) [🔧](./configuration.md) [🟣](./all.md) |
| [`require-stylelint-overrides-files-array`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/require-stylelint-overrides-files-array) | — | [🟡](./recommended.md) [🔧](./configuration.md) [🟣](./all.md) |
| [`require-stylelint-overrides-files`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/require-stylelint-overrides-files) | — | [🟡](./recommended.md) [🔧](./configuration.md) [🟣](./all.md) |
| [`require-stylelint-plugins-packages-installed`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/require-stylelint-plugins-packages-installed) | — | [🟡](./recommended.md) [🔧](./configuration.md) [🟣](./all.md) |
| [`require-stylelint-report-disables`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/require-stylelint-report-disables) | 🔧 | [🟡](./recommended.md) [🔧](./configuration.md) [🟣](./all.md) |
| [`require-stylelint-rules-object`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/require-stylelint-rules-object) | 🔧 | [🟡](./recommended.md) [🔧](./configuration.md) [🟣](./all.md) |
| [`sort-stylelint-extends`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/sort-stylelint-extends) | 🔧 | [🟡](./recommended.md) [🔧](./configuration.md) [🟣](./all.md) |
| [`sort-stylelint-plugins`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/sort-stylelint-plugins) | 🔧 | [🟡](./recommended.md) [🔧](./configuration.md) [🟣](./all.md) |
| [`sort-stylelint-rule-keys`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/sort-stylelint-rule-keys) | 🔧 | [🟡](./recommended.md) [🔧](./configuration.md) [🟣](./all.md) |