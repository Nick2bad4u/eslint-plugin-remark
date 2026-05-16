# trim-remark-plugin-specifiers

Require trimmed string specifiers in top-level Remark `plugins` declarations.

## Rule details

Remark resolves string plugin specifiers as package or path names. Leading or trailing whitespace changes the requested specifier and typically causes confusing load failures. This rule checks static direct plugin entries and tuple plugin names.

## ❌ Incorrect

```ts
export default {
    plugins: [" remark-gfm "],
};
```

```ts
export default {
    plugins: [[" remark-toc ", { heading: "contents" }]],
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

The fixer removes leading and trailing whitespace from the string literal while preserving the surrounding quote style when possible.

## When not to use it

This rule should be safe for normal Remark configs. Disable it only for generated configs that intentionally preserve whitespace for a custom transform before Remark loads the config.
