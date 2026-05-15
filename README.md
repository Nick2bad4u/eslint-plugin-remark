# eslint-plugin-remark

[![npm license.](https://flat.badgen.net/npm/license/eslint-plugin-remark?color=purple)](https://github.com/Nick2bad4u/eslint-plugin-remark/blob/main/LICENSE) [![npm total downloads.](https://flat.badgen.net/npm/dt/eslint-plugin-remark?color=pink)](https://www.npmjs.com/package/eslint-plugin-remark) [![latest GitHub release.](https://flat.badgen.net/github/release/Nick2bad4u/eslint-plugin-remark?color=cyan)](https://github.com/Nick2bad4u/eslint-plugin-remark/releases) [![GitHub stars.](https://flat.badgen.net/github/stars/Nick2bad4u/eslint-plugin-remark?color=yellow)](https://github.com/Nick2bad4u/eslint-plugin-remark/stargazers) [![GitHub forks.](https://flat.badgen.net/github/forks/Nick2bad4u/eslint-plugin-remark?color=green)](https://github.com/Nick2bad4u/eslint-plugin-remark/forks) [![GitHub open issues.](https://flat.badgen.net/github/open-issues/Nick2bad4u/eslint-plugin-remark?color=red)](https://github.com/Nick2bad4u/eslint-plugin-remark/issues) [![codecov.](https://flat.badgen.net/codecov/github/Nick2bad4u/eslint-plugin-remark?color=blue)](https://codecov.io/gh/Nick2bad4u/eslint-plugin-remark)

`eslint-plugin-remark` runs Remark from ESLint and adds Remark-specific config authoring rules for `remark.config.*` and `.remarkrc.*` files.

Use it when you want one ESLint-driven command and editor integration to report Markdown quality issues and keep Remark plugin configuration deterministic.

## Installation

```sh
npm install --save-dev eslint-plugin-remark eslint remark
```

### Compatibility

- **Supported ESLint versions:** `9.x` and `10.x`
- **Config system:** Flat Config only (`eslint.config.*`)
- **Node.js runtime:** `>=22.0.0`
- **Markdown parser:** [`@eslint/markdown`](https://github.com/eslint/markdown) with `markdown/gfm`

## Quick start

```ts
import remark from "eslint-plugin-remark";

export default [
    ...remark.configs.recommended,
];
```

## Presets

| Preset | Purpose |
| --- | --- |
| [`remark.configs.recommended`](./docs/rules/presets/recommended.md) | Enable the Remark bridge plus the basic Remark config authoring rules. |
| [`remark.configs.remarkOnly`](./docs/rules/presets/remark-only.md) | Enable only Markdown linting through Remark. |
| [`remark.configs.configuration`](./docs/rules/presets/configuration.md) | Enable only Remark config authoring rules for `remark.config.*` and `.remarkrc.*` files. |
| [`remark.configs.all`](./docs/rules/presets/all.md) | Enable every rule shipped by the plugin. |

Aliases remain available for ergonomic config naming:

- `remark.configs.markdown` -> `remark.configs.remarkOnly`
- `remark.configs.configs` -> `remark.configs.configuration`

## Configuration examples

### Recommended

```ts
import remark from "eslint-plugin-remark";

export default [
    ...remark.configs.recommended,
];
```

### Remark bridge only

```ts
import remark from "eslint-plugin-remark";

export default [
    remark.configs.remarkOnly,
];
```

### Configuration only

```ts
import remark from "eslint-plugin-remark";

export default [
    remark.configs.configuration,
];
```

That preset enables the first config hygiene baseline:

- `remark/prefer-remark-plugins-array`
- `remark/disallow-remark-duplicate-plugins`
- `remark/sort-remark-plugins`
- `remark/disallow-remark-relative-plugin-paths`
- `remark/require-remark-plugins-packages-installed`
- `remark/require-remark-config-file-naming-convention`

### Passing Remark bridge options

```ts
import remark from "eslint-plugin-remark";

export default [
    {
        ...remark.configs.remarkOnly,
        rules: {
            "remark/remark": [
                "error",
                {
                    configFile: "./remark.config.mjs",
                    fix: true,
                    quiet: false,
                },
            ],
        },
    },
];
```

## Rules

Fix legend:
- `🔧` = autofixable
- `—` = report only

Preset key legend:
  - [`🟡`](./docs/rules/presets/recommended.md) — [`remark.configs.recommended`](./docs/rules/presets/recommended.md)
  - [`📝`](./docs/rules/presets/remark-only.md) — [`remark.configs.remarkOnly`](./docs/rules/presets/remark-only.md)
  - [`🔧`](./docs/rules/presets/configuration.md) — [`remark.configs.configuration`](./docs/rules/presets/configuration.md)
  - [`🟣`](./docs/rules/presets/all.md) — [`remark.configs.all`](./docs/rules/presets/all.md)

| Rule | Fix | Preset key |
| --- | :-: | :-- |
| [`remark`](https://nick2bad4u.github.io/eslint-plugin-remark/docs/rules/remark) | 🔧 | [🟡](./docs/rules/presets/recommended.md) [📝](./docs/rules/presets/remark-only.md) [🟣](./docs/rules/presets/all.md) |
| [`prefer-remark-plugins-array`](https://nick2bad4u.github.io/eslint-plugin-remark/docs/rules/prefer-remark-plugins-array) | 🔧 | [🟡](./docs/rules/presets/recommended.md) [🔧](./docs/rules/presets/configuration.md) [🟣](./docs/rules/presets/all.md) |
| [`disallow-remark-duplicate-plugins`](https://nick2bad4u.github.io/eslint-plugin-remark/docs/rules/disallow-remark-duplicate-plugins) | 🔧 | [🟡](./docs/rules/presets/recommended.md) [🔧](./docs/rules/presets/configuration.md) [🟣](./docs/rules/presets/all.md) |
| [`sort-remark-plugins`](https://nick2bad4u.github.io/eslint-plugin-remark/docs/rules/sort-remark-plugins) | 🔧 | [🟡](./docs/rules/presets/recommended.md) [🔧](./docs/rules/presets/configuration.md) [🟣](./docs/rules/presets/all.md) |
| [`disallow-remark-relative-plugin-paths`](https://nick2bad4u.github.io/eslint-plugin-remark/docs/rules/disallow-remark-relative-plugin-paths) | — | [🟡](./docs/rules/presets/recommended.md) [🔧](./docs/rules/presets/configuration.md) [🟣](./docs/rules/presets/all.md) |
| [`require-remark-plugins-packages-installed`](https://nick2bad4u.github.io/eslint-plugin-remark/docs/rules/require-remark-plugins-packages-installed) | — | [🟡](./docs/rules/presets/recommended.md) [🔧](./docs/rules/presets/configuration.md) [🟣](./docs/rules/presets/all.md) |
| [`require-remark-config-file-naming-convention`](https://nick2bad4u.github.io/eslint-plugin-remark/docs/rules/require-remark-config-file-naming-convention) | — | [🟡](./docs/rules/presets/recommended.md) [🔧](./docs/rules/presets/configuration.md) [🟣](./docs/rules/presets/all.md) |
## Why use this plugin?

Use this plugin when you want ESLint to become the single command and editor integration that reports:

- JavaScript and TypeScript issues from your existing ESLint setup
- Markdown issues from Remark plugins
- Remark config authoring issues in `remark.config.*` and `.remarkrc.*`

This package is strongest when you want repo-level consistency around both Markdown linting and Remark config hygiene.

If your team prefers running Remark separately and does not want ESLint to own Markdown diagnostics, this package may be unnecessary.

## Contributors ✨

See [CONTRIBUTORS.md](./CONTRIBUTORS.md).