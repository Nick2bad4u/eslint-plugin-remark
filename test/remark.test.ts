/**
 * @packageDocumentation
 * Integration coverage for the Remark bridge rule.
 */
import { ESLint, type Linter } from "eslint";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import { runRemarkSynchronously } from "../src/_internal/remark-runner";
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
        expect(Array.isArray(result!.messages)).toBe(true);
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

    it("caches direct Remark bridge results for identical inputs", () => {
        expect.hasAssertions();

        const options = {
            code: "# Heading\n\nText.\n",
            codeFilename: "README.md",
            cwd: process.cwd(),
        };
        const firstResult = runRemarkSynchronously(options);
        const secondResult = runRemarkSynchronously(options);

        expect(firstResult).toBe(secondResult);
        expect(firstResult.messages).toStrictEqual([]);
    });

    it("reports unscoped Remark messages with default source locations", async () => {
        expect.hasAssertions();

        const temporaryDirectory = mkdtempSync(
            path.join(tmpdir(), "remark-plain-message-")
        );

        try {
            const configFile = path.join(
                temporaryDirectory,
                "remark.config.mjs"
            );

            writeFileSync(
                configFile,
                `export default {
                    plugins: [
                        () => (_tree, file) => {
                            file.message("Plain Remark diagnostic");
                        },
                    ],
                };`
            );

            const eslint = createMarkdownLintEngine(false, {
                configFile,
            });
            const [result] = await eslint.lintText("# Heading\n\nText.\n", {
                filePath: "README.md",
            });

            expect(result).toBeDefined();
            expect(result!.messages[0]?.message).toContain(
                "Remark (remark): Plain Remark diagnostic"
            );
            expect(result!.messages[0]?.line).toBe(1);
            expect(result!.messages[0]?.column).toBe(1);
        } finally {
            rmSync(temporaryDirectory, { force: true, recursive: true });
        }
    });

    it("throws worker configuration errors with their original message", () => {
        expect.hasAssertions();

        expect(() =>
            runRemarkSynchronously({
                code: "# Heading\n",
                codeFilename: "README.md",
                configFile: "missing-remark-config.mjs",
                cwd: process.cwd(),
            })
        ).toThrow("missing-remark-config.mjs");
    });
});
