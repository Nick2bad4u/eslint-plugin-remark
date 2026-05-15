# disallow-remark-relative-plugin-paths

Disallow relative path entries in top-level Remark `plugins` declarations.

## Rule details

Shared Remark configs should depend on package-backed plugin specifiers. Relative plugin paths make configs harder to publish and reuse because the target file must exist at the same relative path in every consumer.

## ❌ Incorrect

```ts
export default {
    plugins: ["./local-remark-plugin.mjs"],
};
```

## ✅ Correct

```ts
export default {
    plugins: ["remark-gfm"],
};
```

## When not to use it

Disable this rule for private application configs that intentionally load local project-only Remark plugins.
