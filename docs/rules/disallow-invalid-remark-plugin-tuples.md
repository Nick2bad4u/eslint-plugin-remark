# disallow-invalid-remark-plugin-tuples

Disallow invalid tuple entries in top-level Remark `plugins` arrays.

## Rule details

Remark plugin tuples must start with a plugin function or a string package specifier. Empty tuples, tuples that start with an options object, and tuples that start with scalar values cannot identify the plugin that should receive the options.

## ❌ Incorrect

```ts
export default {
    plugins: [[]],
};
```

```ts
export default {
    plugins: [[{ heading: "contents" }]],
};
```

## ✅ Correct

```ts
export default {
    plugins: [["remark-toc", { heading: "contents" }]],
};
```

```ts
import remarkToc from "remark-toc";

export default {
    plugins: [[remarkToc, { heading: "contents" }]],
};
```

## Fixer behavior

This rule does not autofix because the missing plugin specifier cannot be inferred from the tuple options.

## When not to use it

Disable this rule only when a generated config intentionally uses a custom tuple shape that another build step rewrites before Remark loads it.
