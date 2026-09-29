# remark

Run Remark against Markdown files from ESLint and report Remark diagnostics in the ESLint result.

## Rule details

This bridge rule lets projects keep Markdown checks in the same ESLint command and editor integration used for JavaScript, TypeScript, and configuration files. It loads a Remark config file, runs Remark in a worker, and forwards each `VFileMessage` as an ESLint diagnostic.

The rule is intended for Markdown files matched by `remark.configs.remarkOnly`, `remark.configs.recommended`, or `remark.configs.all`.

The built-in presets use the plugin's internal full-document parser. The bridge also supports shared flat configs that select `@eslint/markdown`'s `markdown/gfm` language for the same Markdown files.

## ❌ Incorrect

```md
![](image.png)
```

With a Remark config that enables an alt-text lint plugin, the image above is reported because it has no useful alt text.

## ✅ Correct

```md
![Architecture diagram](image.png)
```

## Options

```ts
type Options = [
 {
  configFile?: string;
  fix?: boolean;
  quiet?: boolean;
  skipCompilation?: boolean;
 }?,
];
```

- `configFile` points the bridge at a specific Remark config file.
- `fix` replaces the full Markdown document with Remark output when Remark changes it. It defaults to `false` and takes precedence over `skipCompilation`.
- `quiet` reports only fatal Remark messages.
- `skipCompilation` defaults to `false`. Set it to `true` to parse Markdown and await its transforms without running the compiler when `fix` is disabled. This reduces work for lint-only use, but compiler diagnostics and side effects are skipped.

## Processing and timing

The bridge reuses a worker and caches configured processor templates for the life of that worker. Each document receives a fresh processor cloned from its template, with freshly attached plugins and copied plain processor data. Plugin option objects and custom class instances retain Unified's normal sharing behavior. Identical requests also reuse cached results within the ESLint process. Restart ESLint or its editor integration after changing Remark configuration or plugins.

ESLint's rule timing includes the time spent waiting for Remark. The first uncached request includes worker startup and config loading; later uncached requests still include parsing and the configured plugins. By default, timing also includes compiling the transformed Markdown. Set `skipCompilation: true` when compiler behavior is unnecessary and fixes are disabled. See the [Remark bridge guide](./guides/remark-bridge.md) for details.

## ESLint flat config example

```ts
import remark from "eslint-plugin-remark";

export default [...remark.configs.recommended];
```

## When not to use it

Do not enable this rule if Markdown is linted by a separate Remark command and you do not want duplicate diagnostics in ESLint.
