# Presets

`eslint-plugin-remark` exposes focused flat-config presets for Markdown linting and Remark config authoring.

## Rule matrix

Fix legend:
- `🔧` = autofixable
- `—` = report only

Preset key legend:
  - [`🟡`](./recommended.md) — [`remark.configs.recommended`](./recommended.md)
  - [`📝`](./remark-only.md) — [`remark.configs.remarkOnly`](./remark-only.md)
  - [`🔧`](./configuration.md) — [`remark.configs.configuration`](./configuration.md)
  - [`🟣`](./all.md) — [`remark.configs.all`](./all.md)

| Rule | Fix | Preset key |
| --- | :-: | :-- |
| [`remark`](https://nick2bad4u.github.io/eslint-plugin-remark/docs/rules/remark) | 🔧 | [🟡](./recommended.md) [📝](./remark-only.md) [🟣](./all.md) |
| [`prefer-remark-plugins-array`](https://nick2bad4u.github.io/eslint-plugin-remark/docs/rules/prefer-remark-plugins-array) | 🔧 | [🟡](./recommended.md) [🔧](./configuration.md) [🟣](./all.md) |
| [`disallow-unknown-remark-config-properties`](https://nick2bad4u.github.io/eslint-plugin-remark/docs/rules/disallow-unknown-remark-config-properties) | 🔧 | [🟡](./recommended.md) [🔧](./configuration.md) [🟣](./all.md) |
| [`require-remark-settings-object`](https://nick2bad4u.github.io/eslint-plugin-remark/docs/rules/require-remark-settings-object) | — | [🟡](./recommended.md) [🔧](./configuration.md) [🟣](./all.md) |
| [`disallow-empty-remark-config-values`](https://nick2bad4u.github.io/eslint-plugin-remark/docs/rules/disallow-empty-remark-config-values) | 🔧 | [🟡](./recommended.md) [🔧](./configuration.md) [🟣](./all.md) |
| [`disallow-empty-remark-plugin-specifiers`](https://nick2bad4u.github.io/eslint-plugin-remark/docs/rules/disallow-empty-remark-plugin-specifiers) | 🔧 | [🟡](./recommended.md) [🔧](./configuration.md) [🟣](./all.md) |
| [`disallow-invalid-remark-plugin-tuples`](https://nick2bad4u.github.io/eslint-plugin-remark/docs/rules/disallow-invalid-remark-plugin-tuples) | — | [🟡](./recommended.md) [🔧](./configuration.md) [🟣](./all.md) |
| [`trim-remark-plugin-specifiers`](https://nick2bad4u.github.io/eslint-plugin-remark/docs/rules/trim-remark-plugin-specifiers) | 🔧 | [🟡](./recommended.md) [🔧](./configuration.md) [🟣](./all.md) |
| [`disallow-remark-duplicate-plugins`](https://nick2bad4u.github.io/eslint-plugin-remark/docs/rules/disallow-remark-duplicate-plugins) | 🔧 | [🟡](./recommended.md) [🔧](./configuration.md) [🟣](./all.md) |
| [`sort-remark-plugins`](https://nick2bad4u.github.io/eslint-plugin-remark/docs/rules/sort-remark-plugins) | 🔧 | [🟡](./recommended.md) [🔧](./configuration.md) [🟣](./all.md) |
| [`disallow-remark-relative-plugin-paths`](https://nick2bad4u.github.io/eslint-plugin-remark/docs/rules/disallow-remark-relative-plugin-paths) | — | [🟡](./recommended.md) [🔧](./configuration.md) [🟣](./all.md) |
| [`require-remark-plugins-packages-installed`](https://nick2bad4u.github.io/eslint-plugin-remark/docs/rules/require-remark-plugins-packages-installed) | — | [🟡](./recommended.md) [🔧](./configuration.md) [🟣](./all.md) |
| [`require-remark-config-file-naming-convention`](https://nick2bad4u.github.io/eslint-plugin-remark/docs/rules/require-remark-config-file-naming-convention) | — | [🟡](./recommended.md) [🔧](./configuration.md) [🟣](./all.md) |