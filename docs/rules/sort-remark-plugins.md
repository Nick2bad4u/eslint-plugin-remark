# sort-remark-plugins

Enforce sorted string entries in top-level Remark `plugins` declarations.

## Rule details

Sorted plugin lists produce deterministic diffs and make duplicated or missing Remark plugins easier to review. This rule only sorts string-only arrays so it does not reorder complex plugin tuples with runtime-specific semantics.

## ❌ Incorrect

```ts
export default {
    plugins: ["remark-gfm", "remark-frontmatter"],
};
```

## ✅ Correct

```ts
export default {
    plugins: ["remark-frontmatter", "remark-gfm"],
};
```

## Fixer behavior

The fixer sorts string literal entries with `localeCompare`.

## When not to use it

Disable this rule for configs where plugin order has hand-authored grouping that is more important than alphabetical order.
