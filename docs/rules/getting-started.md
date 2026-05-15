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
