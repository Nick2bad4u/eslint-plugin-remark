import plugin from "../plugin.mjs";

/** @typedef {import("eslint").Linter.Config} FlatConfig */

const remarkOnlyConfig = plugin.configs?.["remarkOnly"];

if (remarkOnlyConfig === undefined || Array.isArray(remarkOnlyConfig)) {
    throw new TypeError(
        "Expected the Remark-only preset to be a config object."
    );
}

/** @type {FlatConfig[]} */
const benchmarkTimingConfig = [/** @type {FlatConfig} */ (remarkOnlyConfig)];

export default benchmarkTimingConfig;
