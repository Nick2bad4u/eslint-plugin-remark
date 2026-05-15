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

const stylelintRunnerEntryUrl = new URL(
    "../src/_internal/stylelint-runner.ts",
    import.meta.url
).href;
const stylelintConfigFilePath = fileURLToPath(
    new URL("fixtures/stylelint/short-hex.config.mjs", import.meta.url)
);

const runBridgeLintInIsolatedNodeProcess = (
    timeoutInMilliseconds: number
): ChildExitResult => {
    const script = `
        import { runStylelintSynchronously } from ${JSON.stringify(stylelintRunnerEntryUrl)};

        runStylelintSynchronously({
            code: "a { color: #ffffff; }",
            codeFilename: "sample.css",
            configFile: ${JSON.stringify(stylelintConfigFilePath)},
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

describe("stylelint bridge worker lifecycle", () => {
    it("allows isolated node process to exit after bridge lint execution", () => {
        expect.hasAssertions();

        const result = runBridgeLintInIsolatedNodeProcess(10_000);

        expect(result.timedOut).toBeFalsy();
        expect(result.signal).toBeNull();
        expect(result.code).toBe(0);
    }, 20_000);
});
