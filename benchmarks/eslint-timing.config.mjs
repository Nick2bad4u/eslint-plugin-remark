import plugin from "../plugin.mjs";

/** @typedef {import("eslint").Linter.Config} FlatConfig */

const benchmarkTimingConfig = /** @type {FlatConfig} */ (
    plugin.configs?.["stylesheets"]
);

export default benchmarkTimingConfig;
