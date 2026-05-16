# disallow-empty-remark-config-values

Disallow empty no-op values in top-level Remark config declarations.

## Rule details

Empty `plugins` arrays and empty `settings` objects do not change Remark behavior. This rule keeps Remark configs focused by removing those no-op declarations.

## ❌ Incorrect

```ts
export default {
    plugins: [],
    settings: {},
};
```

## ✅ Correct

```ts
export default {
    plugins: ["remark-gfm"],
    settings: {
        bullet: "*",
    },
};
```

## Fixer behavior

The fixer removes the empty top-level property while preserving the rest of the config object.

## When not to use it

Disable this rule if a project intentionally keeps empty config placeholders for local scaffolding.
