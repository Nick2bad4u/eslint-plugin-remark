import nickTwoBadFourU from "eslint-config-nick2bad4u";

import plugin from "./plugin.mjs";

/** @type {import("./src/plugin").Stylelint2Plugin} */
const stylelint2 = /** @type {import("./src/plugin").Stylelint2Plugin} */ (
    plugin
);

/** @type {import("eslint").Linter.Config[]} */
const config = [
    ...nickTwoBadFourU.configs.withoutStylelint2,

    // Local Plugin Config
    // This lets us use the plugin's rules in this repository without needing to publish the plugin first.
    {
        files: ["src/**/*.{js,mjs,cjs,ts,mts,cts,tsx,jsx}"],
        name: "Local Stylelint",
        plugins: {
            "stylelint-2": stylelint2,
        },
        /* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access -- plugin config arrays are runtime-validated ESLint rule maps. */
        rules: {
            // @ts-expect-error -- plugin.mjs is typed as generic ESLint.Plugin.
            ...stylelint2.configs.all[0].rules,
            // @ts-expect-error -- plugin.mjs is typed as generic ESLint.Plugin.
            ...stylelint2.configs.all[1].rules,
        },
        /* eslint-enable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access -- end local override for plugin rule map spreads. */
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
