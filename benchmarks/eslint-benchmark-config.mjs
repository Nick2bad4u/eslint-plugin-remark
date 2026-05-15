import plugin from "../plugin.mjs";

/** @typedef {import("eslint").Linter.Config} FlatConfig */

/**
 * @typedef {Readonly<{
 *     name: string;
 *     files: readonly string[];
 *     fix: boolean;
 *     overrideConfig: readonly FlatConfig[];
 * }>} BenchmarkScenario
 */

/** @type {Record<string, FlatConfig | readonly FlatConfig[]>} */
const pluginConfigs =
    /** @type {Record<string, FlatConfig | readonly FlatConfig[]>} */ (
        plugin.configs ?? {}
    );

/** Absolute benchmark fixture globs grouped by scenario intent. */
export const benchmarkFileGlobs = Object.freeze({
    configInvalidFixtures: Object.freeze([
        "benchmarks/fixtures/stylelint.config.invalid.ts",
    ]),
    cssInvalidFixtures: Object.freeze(["benchmarks/fixtures/*.invalid.css"]),
    cssValidFixtures: Object.freeze(["benchmarks/fixtures/*.valid.css"]),
});

/**
 * Read a preset config that must resolve to a single flat config object.
 *
 * @param {string} configName - Plugin preset key.
 *
 * @returns {FlatConfig} Single flat config object.
 *
 * @throws {Error} When the operation fails.
 */
const getSingleFlatConfig = (configName) => {
    const configValue = pluginConfigs[configName];

    if (Array.isArray(configValue) || configValue === undefined) {
        throw new TypeError(
            `Expected plugin.configs.${configName} to be a single flat config object.`
        );
    }

    return /** @type {FlatConfig} */ (configValue);
};

const benchmarkStylesheetsConfig = [
    {
        ...getSingleFlatConfig("stylesheets"),
        rules: {
            "stylelint-2/stylelint": ["error", { ignoreDisables: true }],
        },
    },
];

/** Benchmark scenarios used by the stats runner. */
export const benchmarkScenarios = Object.freeze(
    /** @type {readonly BenchmarkScenario[]} */ ([
        {
            files: benchmarkFileGlobs.cssValidFixtures,
            fix: false,
            name: "stylesheets-valid",
            overrideConfig: benchmarkStylesheetsConfig,
        },
        {
            files: benchmarkFileGlobs.cssInvalidFixtures,
            fix: false,
            name: "stylesheets-invalid",
            overrideConfig: benchmarkStylesheetsConfig,
        },
        {
            files: benchmarkFileGlobs.cssInvalidFixtures,
            fix: true,
            name: "stylesheets-invalid-fix",
            overrideConfig: benchmarkStylesheetsConfig,
        },
        {
            files: benchmarkFileGlobs.configInvalidFixtures,
            fix: true,
            name: "configs-invalid-fix",
            overrideConfig: [getSingleFlatConfig("configs")],
        },
    ])
);
