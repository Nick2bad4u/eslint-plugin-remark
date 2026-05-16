# disallow-remark-duplicate-plugins

Disallow duplicate entries in top-level Remark `plugins` declarations.

## Rule details

Duplicate Remark plugins make config intent ambiguous and can cause repeated transformers or duplicated diagnostics. This rule checks statically analyzable string plugin specifiers, including the first element of `[plugin, options]` tuples.

## ❌ Incorrect

```ts
export default {
    plugins: ["remark-gfm", ["remark-gfm", { singleTilde: false }]],
};
```

## ✅ Correct

```ts
export default {
    plugins: ["remark-gfm"],
};
```

## Fixer behavior

The fixer removes later duplicate entries while preserving the first occurrence.

## When not to use it

Disable this rule if a config intentionally registers the same plugin more than once with different options.
