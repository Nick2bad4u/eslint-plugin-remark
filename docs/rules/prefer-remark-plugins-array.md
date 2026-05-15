# prefer-remark-plugins-array

Prefer array form for top-level Remark `plugins` declarations.

## Rule details

Remark configs grow over time. Keeping `plugins` as an array makes plugin order explicit, avoids one-off string forms, and keeps future additions as small diffs.

## ❌ Incorrect

```ts
export default {
    plugins: "remark-gfm",
};
```

## ✅ Correct

```ts
export default {
    plugins: ["remark-gfm"],
};
```

## Fixer behavior

The fixer wraps a string literal `plugins` value in an array.

## When not to use it

Disable this rule only for generated Remark config files where another tool owns the exact output shape.
