/**
 * @packageDocumentation
 * Integration coverage for the Remark bridge rule.
 */
import { ESLint, type Linter } from "eslint";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import remarkPlugin from "../src/plugin";

const remarkConfigFilePath = fileURLToPath(
    new URL("fixtures/remark/alt-text.config.mjs", import.meta.url)
);
const markdownConfig = remarkPlugin.configs.remarkOnly as Linter.Config;

const createMarkdownLintEngine = (
    fix: boolean,
    ruleOptions: Readonly<Record<string, unknown>> = {}
): ESLint =>
    new ESLint({
        fix,
        overrideConfig: [
            {
                ...markdownConfig,
                rules: {
                    "remark/remark": [
                        "error",
                        {
                            configFile: remarkConfigFilePath,
                            ...ruleOptions,
                        },
                    ],
                },
            },
        ],
        overrideConfigFile: true,
    });

describe("remark bridge rule", () => {
    it("reports Remark diagnostics through ESLint", async () => {
        expect.hasAssertions();

        const eslint = createMarkdownLintEngine(false);
        const [result] = await eslint.lintText("![](image.png)\n", {
            filePath: "README.md",
        });

        expect(result).toBeDefined();

        const lintResult = result!;

        expect(lintResult.messages).toHaveLength(1);
        expect(lintResult.messages[0]?.ruleId).toBe("remark/remark");
        expect(lintResult.messages[0]?.message).toContain("alt-text");
    });

    it("supports explicit Remark invocation options", async () => {
        expect.hasAssertions();

        const eslint = createMarkdownLintEngine(false, {
            quiet: false,
        });
        const [result] = await eslint.lintText("# Heading\n", {
            filePath: "README.md",
        });

        expect(result).toBeDefined();
        expect(Array.isArray(result!.messages)).toBeTruthy();
    });

    it("can apply Remark full-document output when explicitly enabled", async () => {
        expect.hasAssertions();

        const eslint = createMarkdownLintEngine(true, {
            fix: true,
        });
        const [result] = await eslint.lintText("# Heading", {
            filePath: "README.md",
        });

        expect(result).toBeDefined();
        expect(result!.output).toBe("# Heading\n");
    });
});
