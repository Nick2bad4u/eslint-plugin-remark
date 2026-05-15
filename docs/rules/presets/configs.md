# remark.configs.configs

Legacy alias for `remark.configs.configuration`.

This alias exists for compatibility with early scaffolding and should not be used in new examples. Prefer [`remark.configs.configuration`](./configuration.md) so config intent is explicit and consistent with the current preset naming model.

```ts
import remark from "eslint-plugin-remark";

export default [
    remark.configs.configuration,
];
```
