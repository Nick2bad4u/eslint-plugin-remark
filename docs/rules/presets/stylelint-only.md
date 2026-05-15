# stylelintOnly

Enable only the stylesheet-facing Stylelint bridge workflow.

This preset is the clearest choice when you want Stylelint diagnostics and autofixes to flow through ESLint, but you do **not** want any Stylelint config-authoring rules in the same preset.

## Flat config example

```ts
import stylelint2 from "eslint-plugin-stylelint-2";

export default [
    stylelint2.configs.stylelintOnly,
];
```

> Legacy alias: `stylelint2.configs.stylesheets` remains supported for backwards compatibility.

## What this preset includes

- The bridge rule only: [`stylelint`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/stylelint)

## What this preset does not include

- Configuration-authoring policy rules (`require-*`, `disallow-*`, `sort-*`)
- Operational policy rules like `prefer-stylelint-cache` and reporting preferences

## Related preset docs

- [Presets overview](./index.md)
- [Recommended preset](./recommended.md)
- [Configuration-only preset](./configuration.md)
- [All preset](./all.md)

## Rules in this preset

| Rule                                                                                       | Fix |
| ------------------------------------------------------------------------------------------ | :-: |
| [`stylelint`](https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/stylelint) |  🔧 |
