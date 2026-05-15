# require-remark-config-file-naming-convention

Require canonical `remark.config.*` naming for shared Remark config files.

## Rule details

Remark supports multiple config file names. Shared config packages are easier to discover when they consistently use `remark.config.*` instead of dotfile aliases.

## ❌ Incorrect

```ts
// .remarkrc.mjs
export default {
    plugins: ["remark-gfm"],
};
```

## ✅ Correct

```ts
// remark.config.mjs
export default {
    plugins: ["remark-gfm"],
};
```

## When not to use it

Disable this rule for consumer applications that intentionally use `.remarkrc.*` to match existing tooling conventions.
