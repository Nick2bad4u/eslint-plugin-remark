# remark.configs.configuration

Enable only the Remark config authoring rules for `remark.config.*` and `.remarkrc.*` JavaScript/TypeScript config modules.

Use this preset when another tool already owns Markdown content linting but you still want ESLint to keep Remark configuration files predictable and reviewable.

## Configuration

```ts
import remark from "eslint-plugin-remark";

export default [
    remark.configs.configuration,
];
```

## Best fit

- Shared config packages that publish Remark presets.
- Monorepos where packages keep separate Remark config files.
- Repositories that intentionally keep Markdown linting outside ESLint but want config hygiene in ESLint.

## Rollout notes

Most rules in this preset are static config checks. Run autofix first, then review package dependency and relative-path findings manually because those often reveal real packaging or monorepo resolution assumptions.

## Rule matrix

<!-- GENERATED_PRESET_RULES_MATRIX_START -->

This table is generated from runtime plugin metadata for `remark.configs.configuration`.

Fix legend:
- `🔧` = autofixable
- `—` = report only

| Rule | Fix | This preset | Also enabled in |
| --- | :-: | :-- | :-- |
| [`remark`](https://nick2bad4u.github.io/eslint-plugin-remark/docs/rules/remark) | 🔧 | — | [🟡](./recommended.md) [📝](./remark-only.md) [🟣](./all.md) |
| [`prefer-remark-plugins-array`](https://nick2bad4u.github.io/eslint-plugin-remark/docs/rules/prefer-remark-plugins-array) | 🔧 | 🔧 Enabled | [🟡](./recommended.md) [🟣](./all.md) |
| [`disallow-unknown-remark-config-properties`](https://nick2bad4u.github.io/eslint-plugin-remark/docs/rules/disallow-unknown-remark-config-properties) | 🔧 | 🔧 Enabled | [🟡](./recommended.md) [🟣](./all.md) |
| [`require-remark-settings-object`](https://nick2bad4u.github.io/eslint-plugin-remark/docs/rules/require-remark-settings-object) | — | 🔧 Enabled | [🟡](./recommended.md) [🟣](./all.md) |
| [`disallow-empty-remark-config-values`](https://nick2bad4u.github.io/eslint-plugin-remark/docs/rules/disallow-empty-remark-config-values) | 🔧 | 🔧 Enabled | [🟡](./recommended.md) [🟣](./all.md) |
| [`disallow-empty-remark-plugin-specifiers`](https://nick2bad4u.github.io/eslint-plugin-remark/docs/rules/disallow-empty-remark-plugin-specifiers) | 🔧 | 🔧 Enabled | [🟡](./recommended.md) [🟣](./all.md) |
| [`disallow-invalid-remark-plugin-tuples`](https://nick2bad4u.github.io/eslint-plugin-remark/docs/rules/disallow-invalid-remark-plugin-tuples) | — | 🔧 Enabled | [🟡](./recommended.md) [🟣](./all.md) |
| [`trim-remark-plugin-specifiers`](https://nick2bad4u.github.io/eslint-plugin-remark/docs/rules/trim-remark-plugin-specifiers) | 🔧 | 🔧 Enabled | [🟡](./recommended.md) [🟣](./all.md) |
| [`disallow-remark-duplicate-plugins`](https://nick2bad4u.github.io/eslint-plugin-remark/docs/rules/disallow-remark-duplicate-plugins) | 🔧 | 🔧 Enabled | [🟡](./recommended.md) [🟣](./all.md) |
| [`sort-remark-plugins`](https://nick2bad4u.github.io/eslint-plugin-remark/docs/rules/sort-remark-plugins) | 🔧 | 🔧 Enabled | [🟡](./recommended.md) [🟣](./all.md) |
| [`disallow-remark-relative-plugin-paths`](https://nick2bad4u.github.io/eslint-plugin-remark/docs/rules/disallow-remark-relative-plugin-paths) | — | 🔧 Enabled | [🟡](./recommended.md) [🟣](./all.md) |
| [`require-remark-plugins-packages-installed`](https://nick2bad4u.github.io/eslint-plugin-remark/docs/rules/require-remark-plugins-packages-installed) | — | 🔧 Enabled | [🟡](./recommended.md) [🟣](./all.md) |
| [`require-remark-config-file-naming-convention`](https://nick2bad4u.github.io/eslint-plugin-remark/docs/rules/require-remark-config-file-naming-convention) | — | 🔧 Enabled | [🟡](./recommended.md) [🟣](./all.md) |

<!-- GENERATED_PRESET_RULES_MATRIX_END -->
