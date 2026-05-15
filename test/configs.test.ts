/**
 * @packageDocumentation
 * Vitest coverage for public preset wiring.
 */

import { describe, expect, it } from "vitest";

import { remarkConfigNames } from "../src/_internal/remark-config-references";
import remarkPlugin from "../src/plugin";

type UnknownRecord = Record<string, unknown>;

const sortStrings = (values: readonly string[]): string[] => {
    const sortedValues: string[] = [];

    for (const value of values) {
        let insertionIndex = sortedValues.length;

        for (const [index, candidate] of sortedValues.entries()) {
            if (value.localeCompare(candidate) < 0) {
                insertionIndex = index;
                break;
            }
        }

        sortedValues.splice(insertionIndex, 0, value);
    }

    return sortedValues;
};

const isRecord = (value: unknown): value is UnknownRecord =>
    typeof value === "object" && value !== null;

const getRecommendedPresetEntries = (): readonly UnknownRecord[] => {
    const recommendedPreset = remarkPlugin.configs.recommended;

    if (!Array.isArray(recommendedPreset)) {
        throw new TypeError("Expected recommended preset to be an array.");
    }

    const presetEntries: UnknownRecord[] = [];

    for (const presetEntry of recommendedPreset) {
        if (isRecord(presetEntry)) {
            presetEntries.push(presetEntry);
        }
    }

    return presetEntries;
};

const getRulesRecord = (value: unknown): UnknownRecord => {
    if (!isRecord(value)) {
        return {};
    }

    const rules = value["rules"];

    return isRecord(rules) ? rules : {};
};

describe("remark plugin configs", () => {
    it("exports exactly the supported config keys", () => {
        expect.hasAssertions();

        expect(sortStrings(Object.keys(remarkPlugin.configs))).toStrictEqual(
            sortStrings(remarkConfigNames)
        );
    });

    it("keeps markdown and config presets focused on different file sets", () => {
        expect.hasAssertions();

        expect(remarkPlugin.configs.remarkOnly).toMatchObject({
            files: ["**/*.{md,mdx,markdown}"],
            languageOptions: {
                parser: expect.objectContaining({
                    meta: expect.objectContaining({
                        name: "eslint-plugin-remark/markdown-parser",
                    }),
                }),
            },
        });

        expect(remarkPlugin.configs.remarkOnly).not.toHaveProperty("language");

        expect(remarkPlugin.configs.configuration).toMatchObject({
            files: [
                "**/.remarkrc.{js,mjs,cjs,ts,mts,cts}",
                "**/remark.config.{js,mjs,cjs,ts,mts,cts}",
            ],
        });
    });

    it("keeps recommended and all as flat-config arrays", () => {
        expect.hasAssertions();

        expect(Array.isArray(remarkPlugin.configs.recommended)).toBeTruthy();
        expect(Array.isArray(remarkPlugin.configs.all)).toBeTruthy();
        expect(remarkPlugin.configs.recommended).toHaveLength(2);
        expect(remarkPlugin.configs.all).toHaveLength(2);
    });

    it("keeps the markdown preset focused on the bridge rule only", () => {
        expect.hasAssertions();

        expect(remarkPlugin.configs.remarkOnly).toMatchObject({
            rules: {
                "remark/remark": "error",
            },
        });
    });

    it("keeps the config preset focused on Remark config-hygiene rules", () => {
        expect.hasAssertions();

        expect(remarkPlugin.configs.configuration).toMatchObject({
            rules: {
                "remark/disallow-remark-duplicate-plugins": "warn",
                "remark/disallow-remark-relative-plugin-paths": "warn",
                "remark/prefer-remark-plugins-array": "warn",
                "remark/require-remark-config-file-naming-convention": "warn",
                "remark/require-remark-plugins-packages-installed": "warn",
                "remark/sort-remark-plugins": "warn",
            },
        });
    });

    it("keeps recommended focused on the bridge plus broadly useful config hygiene", () => {
        expect.hasAssertions();

        const recommendedPreset = getRecommendedPresetEntries();
        const markdownPreset = recommendedPreset[0];
        const recommendedConfigPreset = recommendedPreset[1];

        expect(recommendedPreset).toHaveLength(2);

        expect(markdownPreset).toMatchObject({
            rules: {
                "remark/remark": "error",
            },
        });

        expect(recommendedConfigPreset).toMatchObject({
            rules: {
                "remark/prefer-remark-plugins-array": "warn",
                "remark/sort-remark-plugins": "warn",
            },
        });

        const recommendedConfigRules = getRulesRecord(recommendedConfigPreset);

        expect(recommendedConfigRules).toHaveProperty(
            "remark/disallow-remark-duplicate-plugins"
        );
    });

    it("keeps the legacy alias presets wired to the preferred preset names", () => {
        expect.hasAssertions();

        expect(remarkPlugin.configs.markdown).toBe(
            remarkPlugin.configs.remarkOnly
        );
        expect(remarkPlugin.configs.configs).toBe(
            remarkPlugin.configs.configuration
        );
    });
});
