/**
 * @packageDocumentation
 * Contract test that keeps README rule matrix synchronized with plugin metadata.
 */
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { describe, expect, it } from "vitest";

import {
    extractReadmeRulesSection,
    generateReadmeRulesSectionFromRules,
} from "../scripts/sync-readme-rules-table.mjs";
import stylelint2Plugin from "../src/plugin";
import { normalizeMarkdownTableSpacing } from "./_internal/markdownTables";

type ReadmeRuleMap = Readonly<
    Record<
        string,
        {
            meta?: {
                docs?: {
                    configs?: readonly string[] | string;
                    url: string;
                };
                fixable?: string;
            };
        }
    >
>;

describe("readme rules table synchronization", () => {
    it("matches the canonical rules matrix generated from plugin metadata", async () => {
        expect.hasAssertions();

        const readmePath = path.join(process.cwd(), "README.md");
        const readmeMarkdown = await fs.readFile(readmePath, "utf8");

        expect(
            normalizeMarkdownTableSpacing(
                extractReadmeRulesSection(readmeMarkdown)
            )
        ).toBe(
            normalizeMarkdownTableSpacing(
                generateReadmeRulesSectionFromRules(
                    stylelint2Plugin.rules as ReadmeRuleMap
                )
            )
        );
    });
});
