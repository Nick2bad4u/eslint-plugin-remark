# remark.configs.remarkOnly

Enable only the Remark bridge rule for Markdown files.

Use this preset when you want the smallest adoption surface: Markdown files are processed by Remark through ESLint, but Remark config files are not checked by the config-authoring rules.

## Configuration

```ts
import remark from "eslint-plugin-remark";

export default [remark.configs.remarkOnly];
```

This preset applies `remark/remark` to `**/*.{md,mdx,markdown}` with the plugin's internal full-document Markdown parser. The parser intentionally produces an empty ESTree program while preserving `context.sourceCode.text`, so the Remark bridge receives the complete Markdown document on both ESLint 9 and ESLint 10.

## Best fit

- Repositories that already have stable Remark config conventions.
- Incremental migrations from a standalone Remark CLI command.
- Teams that want to evaluate bridge diagnostics before enforcing config rules.

## Rollout notes

Start here when Markdown diagnostics are the only immediate goal. Move to [`recommended`](./recommended.md) when you also want deterministic Remark config authoring.

## Rule matrix

<!-- GENERATED_PRESET_RULES_MATRIX_START -->

This table is generated from runtime plugin metadata for `remark.configs.remarkOnly`.

Fix legend:

- `🔧` = autofixable
- `—` = report only

| Rule                                                                                                                                                        | Fix | This preset | Also enabled in                                                |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------- | :-: | :---------- | :------------------------------------------------------------- |
| [`remark`](https://nick2bad4u.github.io/eslint-plugin-remark/docs/rules/remark)                                                                             | 🔧  | 📝 Enabled  | [🟡](./recommended.md) [🟣](./all.md)                          |
| [`prefer-remark-plugins-array`](https://nick2bad4u.github.io/eslint-plugin-remark/docs/rules/prefer-remark-plugins-array)                                   | 🔧  | —           | [🟡](./recommended.md) [🔧](./configuration.md) [🟣](./all.md) |
| [`disallow-unknown-remark-config-properties`](https://nick2bad4u.github.io/eslint-plugin-remark/docs/rules/disallow-unknown-remark-config-properties)       | 🔧  | —           | [🟡](./recommended.md) [🔧](./configuration.md) [🟣](./all.md) |
| [`require-remark-settings-object`](https://nick2bad4u.github.io/eslint-plugin-remark/docs/rules/require-remark-settings-object)                             |  —  | —           | [🟡](./recommended.md) [🔧](./configuration.md) [🟣](./all.md) |
| [`disallow-empty-remark-config-values`](https://nick2bad4u.github.io/eslint-plugin-remark/docs/rules/disallow-empty-remark-config-values)                   | 🔧  | —           | [🟡](./recommended.md) [🔧](./configuration.md) [🟣](./all.md) |
| [`disallow-empty-remark-plugin-specifiers`](https://nick2bad4u.github.io/eslint-plugin-remark/docs/rules/disallow-empty-remark-plugin-specifiers)           | 🔧  | —           | [🟡](./recommended.md) [🔧](./configuration.md) [🟣](./all.md) |
| [`disallow-invalid-remark-plugin-tuples`](https://nick2bad4u.github.io/eslint-plugin-remark/docs/rules/disallow-invalid-remark-plugin-tuples)               |  —  | —           | [🟡](./recommended.md) [🔧](./configuration.md) [🟣](./all.md) |
| [`trim-remark-plugin-specifiers`](https://nick2bad4u.github.io/eslint-plugin-remark/docs/rules/trim-remark-plugin-specifiers)                               | 🔧  | —           | [🟡](./recommended.md) [🔧](./configuration.md) [🟣](./all.md) |
| [`disallow-remark-duplicate-plugins`](https://nick2bad4u.github.io/eslint-plugin-remark/docs/rules/disallow-remark-duplicate-plugins)                       | 🔧  | —           | [🟡](./recommended.md) [🔧](./configuration.md) [🟣](./all.md) |
| [`sort-remark-plugins`](https://nick2bad4u.github.io/eslint-plugin-remark/docs/rules/sort-remark-plugins)                                                   | 🔧  | —           | [🟡](./recommended.md) [🔧](./configuration.md) [🟣](./all.md) |
| [`disallow-remark-relative-plugin-paths`](https://nick2bad4u.github.io/eslint-plugin-remark/docs/rules/disallow-remark-relative-plugin-paths)               |  —  | —           | [🟡](./recommended.md) [🔧](./configuration.md) [🟣](./all.md) |
| [`require-remark-plugins-packages-installed`](https://nick2bad4u.github.io/eslint-plugin-remark/docs/rules/require-remark-plugins-packages-installed)       |  —  | —           | [🟡](./recommended.md) [🔧](./configuration.md) [🟣](./all.md) |
| [`require-remark-config-file-naming-convention`](https://nick2bad4u.github.io/eslint-plugin-remark/docs/rules/require-remark-config-file-naming-convention) |  —  | —           | [🟡](./recommended.md) [🔧](./configuration.md) [🟣](./all.md) |

<!-- GENERATED_PRESET_RULES_MATRIX_END -->
