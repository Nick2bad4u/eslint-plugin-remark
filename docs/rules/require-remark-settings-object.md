# require-remark-settings-object

Require object form for top-level Remark `settings` declarations.

## Rule details

Remark shares `settings` with parsers and compilers as keyed options. Non-object values such as strings, booleans, or arrays cannot express those named settings and usually come from a malformed config or a copied CLI option.

## ❌ Incorrect

```ts
export default {
 settings: "bullet-star",
};
```

```ts
export default {
 settings: [],
};
```

## ✅ Correct

```ts
export default {
 settings: {
  bullet: "*",
 },
};
```

## Fixer behavior

This rule does not autofix because the intended settings keys and values cannot be inferred safely from an invalid scalar or array.

## When not to use it

Disable this rule if a separate build step transforms a custom `settings` value into a Remark-compatible settings object before Remark loads the config.
