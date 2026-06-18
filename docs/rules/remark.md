# remark

Run Remark against Markdown files from ESLint and report Remark diagnostics in the ESLint result.

## Rule details

This bridge rule lets projects keep Markdown checks in the same ESLint command and editor integration used for JavaScript, TypeScript, and configuration files. It loads a Remark config file, runs Remark in a worker, and forwards each `VFileMessage` as an ESLint diagnostic.

The rule is intended for Markdown files matched by `remark.configs.remarkOnly`, `remark.configs.recommended`, or `remark.configs.all`.

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
 }?,
];
```

- `configFile` points the bridge at a specific Remark config file.
- `fix` replaces the full Markdown document with Remark output when Remark changes it.
- `quiet` reports only fatal Remark messages.

## ESLint flat config example

```ts
import remark from "eslint-plugin-remark";

export default [...remark.configs.recommended];
```

## When not to use it

Do not enable this rule if Markdown is linted by a separate Remark command and you do not want duplicate diagnostics in ESLint.
