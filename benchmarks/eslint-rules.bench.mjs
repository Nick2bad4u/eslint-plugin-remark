import { ESLint } from "eslint";
import { bench, describe } from "vitest";

import plugin from "../plugin.mjs";

/** @typedef {import("eslint").Linter.Config} FlatConfig */
/** @type {Record<string, FlatConfig | readonly FlatConfig[]>} */
const pluginConfigs =
    /** @type {Record<string, FlatConfig | readonly FlatConfig[]>} */ (
        plugin.configs ?? {}
    );

/**
 * Resolve one named preset config as a single flat config object.
 *
 * @param {string} configName - Plugin preset key.
 *
 * @returns {FlatConfig} Resolved flat config object.
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

/**
 * Create an ESLint instance for one benchmark scenario.
 *
 * @param {FlatConfig | readonly FlatConfig[]} overrideConfig - Flat config or
 *   config array passed to the ESLint constructor.
 *
 * @returns {ESLint} Configured ESLint instance.
 */
const createEslint = (overrideConfig) => {
    if (Array.isArray(overrideConfig)) {
        const mutableOverrideConfig = [];

        for (const config of overrideConfig) {
            mutableOverrideConfig.push(config);
        }

        return new ESLint({
            cwd: process.cwd(),
            fix: false,
            overrideConfig: mutableOverrideConfig,
            overrideConfigFile: true,
        });
    }

    return new ESLint({
        cwd: process.cwd(),
        fix: false,
        overrideConfig: /** @type {FlatConfig} */ (overrideConfig),
        overrideConfigFile: true,
    });
};

describe("eslint-plugin-stylelint-2 meaningful benchmarks", () => {
    bench("stylelint bridge on invalid CSS", async () => {
        const eslint = createEslint(getSingleFlatConfig("stylesheets"));
        await eslint.lintText(`a { color: #ffffff; }`, {
            filePath: "benchmarks/fixtures/stylelint.invalid.css",
        });
    });

    bench("config rule on invalid stylelint config", async () => {
        const eslint = createEslint(getSingleFlatConfig("configs"));
        await eslint.lintText(
            `export default { rules: { "color-no-invalid-hex": true } };`,
            {
                filePath: "benchmarks/fixtures/stylelint.config.invalid.ts",
            }
        );
    });
});
