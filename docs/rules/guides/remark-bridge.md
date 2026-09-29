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

export default [remark.configs.remarkOnly];
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

## Processing and caching

By default, requests run Remark's complete parse, transform, and compile pipeline, preserving compiler diagnostics and side effects even when fixes are disabled. Set `skipCompilation: true` on `remark/remark` to opt into parsing and awaiting transforms without compiling the tree back to Markdown. Async transformer diagnostics are still included, but compiler diagnostics and side effects are skipped. The `fix: true` option takes precedence and always enables compilation.

The worker caches successfully configured processor templates by their resolved config path. Each document receives a fresh clone of its template, with freshly attached plugins and deep copies of plain objects and arrays in processor data. Plugin option objects and custom class instances retain Unified's normal sharing behavior. Config discovery still runs for each uncached request, allowing Markdown in a nested directory to select its own config.

Identical requests also reuse cached results within the ESLint process. Both caches are process-local, and imported configuration modules are cached by Node.js. Restart ESLint or its editor integration after changing Remark configuration or plugins.

## ESLint timing

ESLint's statistics attribute the elapsed wait for the worker to `remark/remark`. This includes Markdown parsing and every configured Remark plugin, along with worker startup and config/plugin loading on the first uncached request. The first file can therefore look disproportionately expensive even when it is short. Compilation is included by default; `skipCompilation: true` avoids that work when fixes are disabled.

## Fix behavior

Set `fix: true` on `remark/remark` to let Remark's processed output participate in ESLint autofix.

The rule option makes the compiled output available as a fix; ESLint's `--fix` flag or API `fix` setting controls whether ESLint applies the resulting replacement. Compilation still runs by default without the rule option, but the bridge does not offer a replacement. To skip compilation, set `skipCompilation: true` and leave `fix` disabled.

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
