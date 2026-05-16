# remark.configs.all

Enable the Remark bridge and every Remark config authoring rule shipped by this plugin.

Use this preset when you want maximum coverage from the plugin and are prepared to accept every current rule policy. It is intentionally stricter than the default recommendation because new rules may be added here before they are promoted to broader recommended usage.

## Configuration

```ts
import remark from "eslint-plugin-remark";

export default [
    ...remark.configs.all,
];
```

## Best fit

- New repositories that want the strictest baseline from day one.
- Mature repositories with clean Remark config files and low Markdown lint debt.
- Internal templates where full enforcement is preferred over gradual adoption.

## Rollout notes

Avoid enabling this preset blindly in large existing repositories. Prefer [`recommended`](./recommended.md) for first rollout, then move to `all` after generated diffs and manual findings are reviewed.

## Rule matrix

<!-- GENERATED_PRESET_RULES_MATRIX_START -->

This table is generated from runtime plugin metadata for `remark.configs.all`.

Fix legend:
- `🔧` = autofixable
- `—` = report only

| Rule | Fix | This preset | Also enabled in |
| --- | :-: | :-- | :-- |
| [`remark`](https://nick2bad4u.github.io/eslint-plugin-remark/docs/rules/remark) | 🔧 | 🟣 Enabled | [🟡](./recommended.md) [📝](./remark-only.md) |
| [`prefer-remark-plugins-array`](https://nick2bad4u.github.io/eslint-plugin-remark/docs/rules/prefer-remark-plugins-array) | 🔧 | 🟣 Enabled | [🟡](./recommended.md) [🔧](./configuration.md) |
| [`disallow-unknown-remark-config-properties`](https://nick2bad4u.github.io/eslint-plugin-remark/docs/rules/disallow-unknown-remark-config-properties) | 🔧 | 🟣 Enabled | [🟡](./recommended.md) [🔧](./configuration.md) |
| [`require-remark-settings-object`](https://nick2bad4u.github.io/eslint-plugin-remark/docs/rules/require-remark-settings-object) | — | 🟣 Enabled | [🟡](./recommended.md) [🔧](./configuration.md) |
| [`disallow-empty-remark-config-values`](https://nick2bad4u.github.io/eslint-plugin-remark/docs/rules/disallow-empty-remark-config-values) | 🔧 | 🟣 Enabled | [🟡](./recommended.md) [🔧](./configuration.md) |
| [`disallow-empty-remark-plugin-specifiers`](https://nick2bad4u.github.io/eslint-plugin-remark/docs/rules/disallow-empty-remark-plugin-specifiers) | 🔧 | 🟣 Enabled | [🟡](./recommended.md) [🔧](./configuration.md) |
| [`disallow-invalid-remark-plugin-tuples`](https://nick2bad4u.github.io/eslint-plugin-remark/docs/rules/disallow-invalid-remark-plugin-tuples) | — | 🟣 Enabled | [🟡](./recommended.md) [🔧](./configuration.md) |
| [`trim-remark-plugin-specifiers`](https://nick2bad4u.github.io/eslint-plugin-remark/docs/rules/trim-remark-plugin-specifiers) | 🔧 | 🟣 Enabled | [🟡](./recommended.md) [🔧](./configuration.md) |
| [`disallow-remark-duplicate-plugins`](https://nick2bad4u.github.io/eslint-plugin-remark/docs/rules/disallow-remark-duplicate-plugins) | 🔧 | 🟣 Enabled | [🟡](./recommended.md) [🔧](./configuration.md) |
| [`sort-remark-plugins`](https://nick2bad4u.github.io/eslint-plugin-remark/docs/rules/sort-remark-plugins) | 🔧 | 🟣 Enabled | [🟡](./recommended.md) [🔧](./configuration.md) |
| [`disallow-remark-relative-plugin-paths`](https://nick2bad4u.github.io/eslint-plugin-remark/docs/rules/disallow-remark-relative-plugin-paths) | — | 🟣 Enabled | [🟡](./recommended.md) [🔧](./configuration.md) |
| [`require-remark-plugins-packages-installed`](https://nick2bad4u.github.io/eslint-plugin-remark/docs/rules/require-remark-plugins-packages-installed) | — | 🟣 Enabled | [🟡](./recommended.md) [🔧](./configuration.md) |
| [`require-remark-config-file-naming-convention`](https://nick2bad4u.github.io/eslint-plugin-remark/docs/rules/require-remark-config-file-naming-convention) | — | 🟣 Enabled | [🟡](./recommended.md) [🔧](./configuration.md) |

<!-- GENERATED_PRESET_RULES_MATRIX_END -->
