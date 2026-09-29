/**
 * @packageDocumentation
 * Integration coverage for the Remark bridge rule.
 */
import markdownPlugin from "@eslint/markdown";
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
const allConfigs = remarkPlugin.configs.all as readonly Linter.Config[];
const remarkFixturePath = (filename: string): string =>
    fileURLToPath(new URL(`fixtures/remark/${filename}`, import.meta.url));

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

const createGfmMarkdownLintEngine = (): ESLint =>
    new ESLint({
        overrideConfig: [
            ...allConfigs,
            {
                files: ["**/*.md"],
                language: "markdown/gfm",
                plugins: {
                    markdown: markdownPlugin,
                },
                rules: {
                    "remark/remark": [
                        "error",
                        {
                            configFile: remarkConfigFilePath,
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

    it("supports shared configs that select the markdown/gfm language", async () => {
        expect.hasAssertions();

        const eslint = createGfmMarkdownLintEngine();
        const [result] = await eslint.lintText("![](image.png)\n", {
            filePath: "README.md",
        });

        expect(result).toBeDefined();
        expect(result!.fatalErrorCount).toBe(0);
        expect(result!.messages[0]?.ruleId).toBe("remark/remark");
        expect(result!.messages[0]?.message).toContain("alt-text");
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

    it("awaits async transformer diagnostics without invoking the compiler when ESLint enables skipCompilation", async () => {
        expect.hasAssertions();

        const eslint = createMarkdownLintEngine(false, {
            configFile: remarkFixturePath("compiler-probe.config.mjs"),
            skipCompilation: true,
        });
        const [result] = await eslint.lintText("# Heading", {
            filePath: "lint-only.md",
        });

        expect(result).toBeDefined();
        expect(result!.messages).toHaveLength(1);
        expect(result!.messages[0]?.message).toContain(
            "Async transformer completed"
        );
        expect(result!.output).toBeUndefined();
    });

    it.each([{}, { skipCompilation: false }])(
        "preserves default compiler diagnostics without exposing fix output for options %j",
        (options) => {
            expect.hasAssertions();

            const result = runRemarkSynchronously({
                code: "# Heading",
                codeFilename: "default-compilation.md",
                configFile: remarkFixturePath("compiler-probe.config.mjs"),
                cwd: process.cwd(),
                ...options,
            });

            expect(
                result.messages.map((message) => message.reason)
            ).toStrictEqual([
                "Async transformer completed",
                "Compiler invoked",
            ]);
            expect(result.output).toBeUndefined();
        }
    );

    it("compiles explicitly enabled fixes and preserves transformer and compiler diagnostics", () => {
        expect.hasAssertions();

        const result = runRemarkSynchronously({
            code: "# Heading",
            codeFilename: "fix-enabled.md",
            configFile: remarkFixturePath("compiler-probe.config.mjs"),
            cwd: process.cwd(),
            fix: true,
            skipCompilation: true,
        });

        expect(result.messages.map((message) => message.reason)).toStrictEqual([
            "Async transformer completed",
            "Compiler invoked",
        ]);
        expect(result.output).toBe("# Heading\n");
    });

    it.each([false, true])(
        "preserves a transformer's replacement VFile when fix is %s",
        (fix) => {
            expect.hasAssertions();

            const result = runRemarkSynchronously({
                code: "# Heading",
                codeFilename: "replacement-file.md",
                configFile: remarkFixturePath("replacement-file.config.mjs"),
                cwd: process.cwd(),
                fix,
                skipCompilation: true,
            });

            expect(
                result.messages.map((message) => message.reason)
            ).toStrictEqual(["Replacement file diagnostic"]);
            expect(result.output).toBe(fix ? "# Heading\n" : undefined);
        }
    );

    it("reuses config registration while isolating transformer state and mutable processor data across files", () => {
        expect.hasAssertions();

        const options = {
            code: "# Heading\n",
            configFile: remarkFixturePath("processor-isolation.config.mjs"),
            cwd: process.cwd(),
        };
        const firstResult = runRemarkSynchronously({
            ...options,
            codeFilename: "isolation-first.md",
        });
        const secondResult = runRemarkSynchronously({
            ...options,
            codeFilename: "isolation-second.md",
        });

        expect(firstResult.messages).toHaveLength(1);
        expect(firstResult.messages[0]?.reason).toMatch(
            /^Registration \d+; transformer 1; data 1$/v
        );
        expect(secondResult.messages).toStrictEqual(firstResult.messages);
    });

    it("continues discovering the nearest config after caching a parent config", () => {
        expect.hasAssertions();

        const options = { code: "# Heading\n", cwd: process.cwd() };
        const parentResult = runRemarkSynchronously({
            ...options,
            codeFilename: remarkFixturePath("discovery/first.md"),
        });
        const nestedResult = runRemarkSynchronously({
            ...options,
            codeFilename: remarkFixturePath("discovery/nested/second.md"),
        });
        const nextParentResult = runRemarkSynchronously({
            ...options,
            codeFilename: remarkFixturePath("discovery/third.md"),
        });

        expect(
            parentResult.messages.map((message) => message.reason)
        ).toStrictEqual(["Parent config"]);
        expect(
            nestedResult.messages.map((message) => message.reason)
        ).toStrictEqual(["Nested config"]);
        expect(nextParentResult.messages).toStrictEqual(parentResult.messages);
    });

    it("retries config setup after a failed request", () => {
        expect.hasAssertions();

        const options = {
            code: "# Heading\n",
            codeFilename: "retry-setup.md",
            configFile: remarkFixturePath("retry-setup.config.mjs"),
            cwd: process.cwd(),
        };

        expect(() => runRemarkSynchronously(options)).toThrow(
            "First config setup failed"
        );
        expect(
            runRemarkSynchronously(options).messages.map(
                (message) => message.reason
            )
        ).toStrictEqual(["Config setup recovered"]);
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
