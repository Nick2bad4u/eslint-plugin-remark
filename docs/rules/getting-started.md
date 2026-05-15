# Getting started

Install the plugin and enable the recommended flat config.

```sh
npm install --save-dev eslint-plugin-remark eslint remark
```

```ts
import remark from "eslint-plugin-remark";

export default [
    ...remark.configs.recommended,
];
```

For the full rollout guide, see [Getting Started](./guides/getting-started.md).

## Minimal bridge-only setup

If you already have Remark configuration and only want Markdown files to flow through ESLint, use the bridge-only preset:

```ts
import remark from "eslint-plugin-remark";

export default [
    remark.configs.remarkOnly,
];
```

## Config authoring only

If Markdown linting is handled elsewhere, but Remark config files should still be checked:

```ts
import remark from "eslint-plugin-remark";

export default [
    remark.configs.configuration,
];
```

## Next steps

- Review [Preset Reference](./presets/index.md).
- Configure the [Remark Bridge](./guides/remark-bridge.md).
- Standardize config files with [Config Authoring](./guides/config-authoring.md).
