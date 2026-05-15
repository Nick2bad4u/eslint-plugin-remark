import nickTwoBadFourU from "eslint-config-nick2bad4u";

import plugin from "./plugin.mjs";

/** @type {import("./src/plugin").RemarkPlugin} */
const remarkPlugin = /** @type {import("./src/plugin").RemarkPlugin} */ (
    plugin
);
const configurationPreset = remarkPlugin.configs.configuration;

if (Array.isArray(configurationPreset)) {
    throw new TypeError(
        "Expected remark.configs.configuration to be a flat config object."
    );
}

/** @type {import("eslint").Linter.Config} */
const localConfigurationPreset = /** @type {import("eslint").Linter.Config} */ (
    configurationPreset
);

/** @type {import("eslint").Linter.Config[]} */
const config = [
    ...nickTwoBadFourU.configs.recommended,

    // Local Plugin Config
    // This lets us use the plugin's config-authoring rules in this repository
    // without needing to publish the plugin first.
    {
        ...localConfigurationPreset,
        name: "Local Remark config rules",
    },
    {
        files: [
            "benchmark/**/*.{js,mjs,cjs,ts,mts,cts,tsx,jsx}",
            "benchmarks/**/*.{js,mjs,cjs,ts,mts,cts,tsx,jsx}",
        ],
        name: "Benchmarks: relax vitest assertion-count rule",
        rules: {
            // Benchmark callbacks measure runtime cost and do not always
            // represent assertion-driven correctness tests.
            "vitest/prefer-expect-assertions": "off",
        },
    },
    // Add repository-specific config entries below as needed.
];

export default config;
