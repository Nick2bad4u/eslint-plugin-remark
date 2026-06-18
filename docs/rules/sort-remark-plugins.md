# sort-remark-plugins

Enforce sorted entries in top-level Remark `plugins` declarations.

## Rule details

Sorted plugin lists produce deterministic diffs and make duplicated or missing Remark plugins easier to review. This rule sorts arrays whose entries are statically analyzable string specifiers, including `[plugin, options]` tuples, and skips mixed dynamic arrays.

## ❌ Incorrect

```ts
export default {
 plugins: [["remark-gfm", { singleTilde: false }], "remark-frontmatter"],
};
```

## ✅ Correct

```ts
export default {
 plugins: ["remark-frontmatter", ["remark-gfm", { singleTilde: false }]],
};
```

## Fixer behavior

The fixer sorts entries by their static string plugin specifier with `localeCompare`.

## When not to use it

Disable this rule for configs where plugin order has hand-authored grouping that is more important than alphabetical order.
