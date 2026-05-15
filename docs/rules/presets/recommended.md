# remark.configs.recommended

Enable Markdown linting through Remark plus the broadly useful Remark config authoring rules.

Use this preset when you want a practical default for a repository that already uses ESLint as its primary lint entrypoint. It combines the Markdown bridge rule with low-noise config hygiene rules that keep Remark configuration deterministic without forcing every strict rule policy immediately.

## Configuration

```ts
import remark from "eslint-plugin-remark";

export default [
    ...remark.configs.recommended,
];
```

## Best fit

- Application and package repositories that want Markdown checks in ESLint.
- Teams that want config cleanup rules enabled from the first rollout.
- CI setups where one ESLint command should cover source, config, and Markdown files.

## Rollout notes

Run this preset with `eslint --fix` once before triage. The current config-authoring rules prefer safe fixes for shape, duplicate, and ordering issues where the static config shape is clear.

## Rule matrix

<!-- GENERATED_PRESET_RULES_MATRIX_START -->

This table is generated from runtime plugin metadata for `remark.configs.recommended`.

Fix legend:
- `🔧` = autofixable
- `—` = report only

| Rule | Fix | This preset | Also enabled in |
| --- | :-: | :-- | :-- |
| [`remark`](https://nick2bad4u.github.io/eslint-plugin-remark/docs/rules/remark) | 🔧 | 🟡 Enabled | [📝](./remark-only.md) [🟣](./all.md) |
| [`prefer-remark-plugins-array`](https://nick2bad4u.github.io/eslint-plugin-remark/docs/rules/prefer-remark-plugins-array) | 🔧 | 🟡 Enabled | [🔧](./configuration.md) [🟣](./all.md) |
| [`disallow-remark-duplicate-plugins`](https://nick2bad4u.github.io/eslint-plugin-remark/docs/rules/disallow-remark-duplicate-plugins) | 🔧 | 🟡 Enabled | [🔧](./configuration.md) [🟣](./all.md) |
| [`sort-remark-plugins`](https://nick2bad4u.github.io/eslint-plugin-remark/docs/rules/sort-remark-plugins) | 🔧 | 🟡 Enabled | [🔧](./configuration.md) [🟣](./all.md) |
| [`disallow-remark-relative-plugin-paths`](https://nick2bad4u.github.io/eslint-plugin-remark/docs/rules/disallow-remark-relative-plugin-paths) | — | 🟡 Enabled | [🔧](./configuration.md) [🟣](./all.md) |
| [`require-remark-plugins-packages-installed`](https://nick2bad4u.github.io/eslint-plugin-remark/docs/rules/require-remark-plugins-packages-installed) | — | 🟡 Enabled | [🔧](./configuration.md) [🟣](./all.md) |
| [`require-remark-config-file-naming-convention`](https://nick2bad4u.github.io/eslint-plugin-remark/docs/rules/require-remark-config-file-naming-convention) | — | 🟡 Enabled | [🔧](./configuration.md) [🟣](./all.md) |

<!-- GENERATED_PRESET_RULES_MATRIX_END -->
