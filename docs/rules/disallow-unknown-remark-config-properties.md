# disallow-unknown-remark-config-properties

Disallow unknown top-level properties in Remark config objects.

## Rule details

Remark config files loaded through `remark-cli` and `unified-engine` use top-level `plugins` and `settings` properties. Other top-level keys are usually typos or config copied from another Markdown integration, such as Gatsby's `resolve` shape or ESLint's `extends`.

## ❌ Incorrect

```ts
export default {
 plugin: ["remark-gfm"],
};
```

```ts
export default {
 extends: ["remark-preset-lint-recommended"],
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
 settings: {
  bullet: "*",
 },
};
```

## Fixer behavior

The fixer renames the common singular typos `plugin` and `setting` when the matching canonical key is not already present. Other unknown properties are reported without a fix because the intended Remark behavior is ambiguous.

## When not to use it

Disable this rule if a separate tool transforms your config object before Remark receives it and that transform intentionally uses custom top-level properties.
