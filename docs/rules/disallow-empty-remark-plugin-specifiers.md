# disallow-empty-remark-plugin-specifiers

Disallow empty string specifiers in top-level Remark `plugins` declarations.

## Rule details

Empty plugin strings cannot resolve to a package or local plugin. In tuple form, an empty first item also makes the configured options unreachable. This rule checks static string specifiers in direct entries and plugin tuples.

## ❌ Incorrect

```ts
export default {
    plugins: ["remark-gfm", ""],
};
```

```ts
export default {
    plugins: [["", { heading: "contents" }]],
};
```

## ✅ Correct

```ts
export default {
    plugins: ["remark-gfm"],
};
```

```ts
export default {
    plugins: [["remark-toc", { heading: "contents" }]],
};
```

## Fixer behavior

The fixer removes the empty plugin entry. If the top-level `plugins` value itself is an empty string, the fixer removes the `plugins` property.

## When not to use it

This rule should be safe for normal Remark configs. Disable it only for generated config files that intentionally leave placeholders for later replacement.
