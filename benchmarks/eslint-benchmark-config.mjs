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
        "benchmarks/fixtures/remark.config.invalid.ts",
    ]),
    markdownInvalidFixtures: Object.freeze([
        "benchmarks/fixtures/*.invalid.md",
    ]),
    markdownValidFixtures: Object.freeze(["benchmarks/fixtures/*.valid.md"]),
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

const benchmarkMarkdownConfig = [
    {
        ...getSingleFlatConfig("remarkOnly"),
        rules: {
            "remark/remark": [
                "error",
                { configFile: "test/fixtures/remark/alt-text.config.mjs" },
            ],
        },
    },
];

/** Benchmark scenarios used by the stats runner. */
export const benchmarkScenarios = Object.freeze(
    /** @type {readonly BenchmarkScenario[]} */ ([
        {
            files: benchmarkFileGlobs.markdownValidFixtures,
            fix: false,
            name: "markdown-valid",
            overrideConfig: benchmarkMarkdownConfig,
        },
        {
            files: benchmarkFileGlobs.markdownInvalidFixtures,
            fix: false,
            name: "markdown-invalid",
            overrideConfig: benchmarkMarkdownConfig,
        },
        {
            files: benchmarkFileGlobs.markdownInvalidFixtures,
            fix: true,
            name: "markdown-invalid-fix",
            overrideConfig: benchmarkMarkdownConfig,
        },
        {
            files: benchmarkFileGlobs.configInvalidFixtures,
            fix: true,
            name: "configs-invalid-fix",
            overrideConfig: [getSingleFlatConfig("configs")],
        },
    ])
);
