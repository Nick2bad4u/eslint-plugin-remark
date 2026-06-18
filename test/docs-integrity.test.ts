/**
 * @packageDocumentation
 * Basic docs integrity checks for the rebuilt rule docs.
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { describe, expect, it } from "vitest";

import { createRuleDocsUrl } from "../src/_internal/rule-docs-url";
import remarkPlugin from "../src/plugin";

describe("rule docs integrity", () => {
    it("keeps one markdown file per registered rule", () => {
        expect.hasAssertions();

        const docsDir = path.join(process.cwd(), "docs", "rules");

        for (const ruleName of Object.keys(remarkPlugin.rules)) {
            const expectedPath = path.join(docsDir, `${ruleName}.md`);

            expect(fs.existsSync(expectedPath)).toBe(true);
        }
    });

    it("keeps one rule test file per registered rule", () => {
        expect.hasAssertions();

        const testDir = path.join(process.cwd(), "test");

        for (const ruleName of Object.keys(remarkPlugin.rules)) {
            const expectedPath = path.join(testDir, `${ruleName}.test.ts`);

            expect(fs.existsSync(expectedPath)).toBe(true);
        }
    });

    it("keeps docs urls aligned with the canonical docs helper", () => {
        expect.hasAssertions();

        for (const [ruleName, ruleModule] of Object.entries(
            remarkPlugin.rules
        )) {
            expect(ruleModule.meta?.docs?.url).toBe(
                createRuleDocsUrl(ruleName)
            );
        }
    });
});
