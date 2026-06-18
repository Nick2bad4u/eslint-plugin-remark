/**
 * @packageDocumentation
 * Regression coverage for bridge worker lifecycle and process-exit behavior.
 */
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

type ChildExitResult = Readonly<{
    code: null | number;
    signal: ReturnType<typeof spawnSync>["signal"];
    stderr: string;
    stdout: string;
    timedOut: boolean;
}>;

const remarkRunnerEntryUrl = new URL(
    "../src/_internal/remark-runner.ts",
    import.meta.url
).href;
const remarkConfigFilePath = fileURLToPath(
    new URL("fixtures/remark/alt-text.config.mjs", import.meta.url)
);

const runBridgeLintInIsolatedNodeProcess = (
    timeoutInMilliseconds: number
): ChildExitResult => {
    const script = String.raw`
        import { runRemarkSynchronously } from ${JSON.stringify(remarkRunnerEntryUrl)};

        runRemarkSynchronously({
            code: "![](image.png)\n",
            codeFilename: "README.md",
            configFile: ${JSON.stringify(remarkConfigFilePath)},
            cwd: process.cwd()
        });
    `;

    const result = spawnSync(
        process.execPath,
        [
            "--experimental-strip-types",
            "--input-type=module",
            "--eval",
            script,
        ],
        {
            cwd: process.cwd(),
            encoding: "utf8",
            timeout: timeoutInMilliseconds,
            windowsHide: true,
        }
    );

    return {
        code: result.status,
        signal: result.signal,
        stderr: result.stderr ?? "",
        stdout: result.stdout ?? "",
        timedOut: result.error?.message.includes("timed out") === true,
    };
};

describe("remark bridge worker lifecycle", () => {
    it("allows isolated node process to exit after bridge lint execution", () => {
        expect.hasAssertions();

        const result = runBridgeLintInIsolatedNodeProcess(10_000);

        expect(result.timedOut).toBe(false);
        expect(result.signal).toBeNull();
        expect(result.code).toBe(0);
    }, 20_000);
});
