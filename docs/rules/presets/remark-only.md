# remark.configs.remarkOnly

Enable only the Remark bridge rule for Markdown files.

```ts
import remark from "eslint-plugin-remark";

export default [
    remark.configs.remarkOnly,
];
```

This preset applies `remark/remark` to `**/*.{md,mdx,markdown}` with the `markdown/gfm` language from `@eslint/markdown`.
