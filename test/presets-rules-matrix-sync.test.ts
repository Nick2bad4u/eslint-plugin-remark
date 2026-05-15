/**
 * @packageDocumentation
 * Contract test that keeps the presets rule matrix synchronized with plugin metadata.
 */
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { describe, expect, it } from "vitest";

import {
    extractPresetDetailMatrixSection,
    extractPresetsMatrixSection,
    generatePresetDetailMatrixSectionFromRules,
    generatePresetsRulesMatrixSectionFromRules,
} from "../scripts/sync-presets-rules-matrix.mjs";
import { normalizeMarkdownTableSpacing } from "./_internal/markdownTables";

const presetDetailDocs = [
    ["all", "all.md"],
    ["configuration", "configuration.md"],
    ["recommended", "recommended.md"],
    ["remarkOnly", "remark-only.md"],
] as const;

describe("presets rules matrix synchronization", () => {
    it("matches the canonical matrix generated from plugin metadata", async () => {
        expect.hasAssertions();

        const presetsIndexPath = path.join(
            process.cwd(),
            "docs",
            "rules",
            "presets",
            "index.md"
        );
        const presetsMarkdown = await fs.readFile(presetsIndexPath, "utf8");

        expect(
            normalizeMarkdownTableSpacing(
                extractPresetsMatrixSection(presetsMarkdown)
            )
        ).toBe(
            normalizeMarkdownTableSpacing(
                generatePresetsRulesMatrixSectionFromRules()
            )
        );
    });

    it.each(presetDetailDocs)(
        "matches the canonical matrix generated for %s",
        async (presetName, fileName) => {
            expect.hasAssertions();

            const presetDetailPath = path.join(
                process.cwd(),
                "docs",
                "rules",
                "presets",
                fileName
            );
            const presetMarkdown = await fs.readFile(presetDetailPath, "utf8");

            expect(
                normalizeMarkdownTableSpacing(
                    extractPresetDetailMatrixSection(presetName, presetMarkdown)
                )
            ).toBe(
                normalizeMarkdownTableSpacing(
                    generatePresetDetailMatrixSectionFromRules(presetName)
                )
            );
        }
    );
});
