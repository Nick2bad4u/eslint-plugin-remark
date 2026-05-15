/**
 * @packageDocumentation
 * Regression coverage for ESLint major override behavior used by compat smoke checks.
 */

import { describe, expect, it, vi } from "vitest";

import type { Stylelint2Plugin } from "../src/plugin";

type UnknownRecord = Readonly<Record<string, unknown>>;

const eslintMajorOverrideEnvironmentVariable = "STYLELINT2_ESLINT_MAJOR";
const originalEslintMajorOverride =
    globalThis.process.env[eslintMajorOverrideEnvironmentVariable];

const isRecord = (value: unknown): value is UnknownRecord =>
    typeof value === "object" && value !== null;

const restoreEslintMajorOverrideEnvironmentVariable = (): void => {
    if (typeof originalEslintMajorOverride === "string") {
        globalThis.process.env[eslintMajorOverrideEnvironmentVariable] =
            originalEslintMajorOverride;
        return;
    }

    Reflect.deleteProperty(
        globalThis.process.env,
        eslintMajorOverrideEnvironmentVariable
    );
};

const getStylelintOnlyPreset = (
    plugin: Readonly<Stylelint2Plugin>
): UnknownRecord => {
    const { stylelintOnly } = plugin.configs;

    if (Array.isArray(stylelintOnly) || !isRecord(stylelintOnly)) {
        throw new TypeError(
            "Expected stylelint2.configs.stylelintOnly to be a flat config object."
        );
    }

    return stylelintOnly;
};

const getPluginsRecord = (config: Readonly<UnknownRecord>): UnknownRecord => {
    const pluginMap = config["plugins"];

    return isRecord(pluginMap) ? pluginMap : {};
};

const loadPluginWithEslintMajor = async (
    eslintMajorVersion: number
): Promise<Stylelint2Plugin> => {
    globalThis.process.env[eslintMajorOverrideEnvironmentVariable] =
        String(eslintMajorVersion);
    vi.resetModules();

    const pluginModule = await import("../src/plugin");

    return pluginModule.default;
};

describe("stylelint-2 plugin ESLint major override", () => {
    it("omits css language fields when forced to ESLint 9", async () => {
        expect.hasAssertions();

        try {
            const plugin = await loadPluginWithEslintMajor(9);
            const stylelintOnlyPreset = getStylelintOnlyPreset(plugin);
            const pluginMap = getPluginsRecord(stylelintOnlyPreset);

            expect(stylelintOnlyPreset).not.toHaveProperty("language");
            expect(stylelintOnlyPreset).not.toHaveProperty("languageOptions");
            expect(pluginMap).not.toHaveProperty("css");
        } finally {
            restoreEslintMajorOverrideEnvironmentVariable();
            vi.resetModules();
        }
    });

    it("keeps css language fields when forced to ESLint 10", async () => {
        expect.hasAssertions();

        try {
            const plugin = await loadPluginWithEslintMajor(10);
            const stylelintOnlyPreset = getStylelintOnlyPreset(plugin);
            const pluginMap = getPluginsRecord(stylelintOnlyPreset);

            expect(stylelintOnlyPreset).toMatchObject({
                language: "css/css",
                languageOptions: {
                    tolerant: true,
                },
            });
            expect(pluginMap).toHaveProperty("css");
        } finally {
            restoreEslintMajorOverrideEnvironmentVariable();
            vi.resetModules();
        }
    });
});
