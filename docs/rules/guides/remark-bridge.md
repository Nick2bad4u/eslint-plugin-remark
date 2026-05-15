---
title: Remark Bridge
description: How eslint-plugin-remark runs Remark from ESLint.
---

# Remark Bridge

`eslint-plugin-remark` runs Remark from ESLint so Markdown diagnostics appear beside the rest of a project's lint output.

The bridge rule keeps the ESLint rule contract synchronous by delegating Remark processing to an internal worker. That lets ESLint receive normal rule reports while Remark still loads async plugins and config modules.

## Basic config

Use `remark.configs.remarkOnly` when you only want Markdown files checked by the bridge. Use `remark.configs.recommended` when you also want the basic Remark config authoring rules.

```ts
import remark from "eslint-plugin-remark";

export default [
    remark.configs.remarkOnly,
];
```

## Config loading

By default, the bridge searches upward from the Markdown file for:

- `remark.config.mjs`
- `remark.config.js`
- `remark.config.cjs`
- `.remarkrc.mjs`
- `.remarkrc.js`
- `.remarkrc.cjs`

Use `configFile` when a package needs an explicit config path.

## Supported config shape

The bridge intentionally supports the stable JavaScript config fields needed for the first release:

```ts
export default {
    plugins: ["remark-gfm"],
    settings: {},
    data: {},
};
```

String plugin specifiers are resolved relative to the config file. Tuple entries such as `["remark-lint-no-dead-urls", options]` are passed through to Remark after the plugin is loaded.

## Fix behavior

Set `fix: true` on `remark/remark` to let Remark's processed output participate in ESLint autofix.

```ts
import remark from "eslint-plugin-remark";

export default [
    {
        ...remark.configs.remarkOnly,
        rules: {
            "remark/remark": ["error", { configFile: "./remark.config.mjs", fix: true }],
        },
    },
];
```