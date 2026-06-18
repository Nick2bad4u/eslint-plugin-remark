# Overview

`eslint-plugin-remark` bridges Remark into ESLint and adds static rules for maintainable Remark configuration.

The plugin has two complementary surfaces:

1. [`remark`](./remark.md) runs Remark against Markdown files from ESLint.
2. Config-authoring rules inspect `remark.config.*` and `.remarkrc.*` modules so Remark setup stays deterministic.

## Rule catalog

| Rule                                                                                                | Purpose                                                             |
| --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| [`remark`](./remark.md)                                                                             | Run Remark from ESLint and forward Remark diagnostics.              |
| [`prefer-remark-plugins-array`](./prefer-remark-plugins-array.md)                                   | Prefer explicit array syntax for `plugins`.                         |
| [`disallow-remark-duplicate-plugins`](./disallow-remark-duplicate-plugins.md)                       | Remove duplicated string plugin entries.                            |
| [`sort-remark-plugins`](./sort-remark-plugins.md)                                                   | Keep statically analyzable plugin lists sorted.                     |
| [`disallow-remark-relative-plugin-paths`](./disallow-remark-relative-plugin-paths.md)               | Avoid local relative plugin paths in shared configs.                |
| [`require-remark-plugins-packages-installed`](./require-remark-plugins-packages-installed.md)       | Ensure referenced plugin packages are declared in package metadata. |
| [`require-remark-config-file-naming-convention`](./require-remark-config-file-naming-convention.md) | Prefer canonical `remark.config.*` names for shared config files.   |

## Choosing a preset

- Start with [`remark.configs.remarkOnly`](./presets/remark-only.md) if you only want Markdown linting through ESLint.
- Start with [`remark.configs.recommended`](./presets/recommended.md) if you want bridge behavior plus practical config hygiene.
- Use [`remark.configs.configuration`](./presets/configuration.md) when Markdown linting is handled elsewhere but Remark config files should still be checked.
- Use [`remark.configs.all`](./presets/all.md) when the repository is ready for every shipped rule.

## Related guides

- [Getting Started](./guides/getting-started.md)
- [Remark Bridge](./guides/remark-bridge.md)
- [Config Authoring](./guides/config-authoring.md)
