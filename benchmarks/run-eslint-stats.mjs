import { ESLint } from "eslint";
import { mkdir, writeFile } from "node:fs/promises";
import * as path from "node:path";
import { performance } from "node:perf_hooks";

import { benchmarkScenarios } from "./eslint-benchmark-config.mjs";

const outputPath = path.resolve("coverage", "benchmarks", "eslint-stats.json");

/**
 * Run one benchmark scenario and collect summary statistics.
 *
 * @param {{
 *     files: readonly string[];
 *     fix: boolean;
 *     name: string;
 *     overrideConfig: readonly import("eslint").Linter.Config[];
 * }} scenario
 *   Scenario definition including files, fix mode, and override config.
 */
const runScenario = async (scenario) => {
    const eslint = new ESLint({
        cwd: process.cwd(),
        fix: scenario.fix,
        overrideConfig: [...scenario.overrideConfig],
        overrideConfigFile: true,
    });
    const startedAt = performance.now();
    const results = await eslint.lintFiles([...scenario.files]);
    const elapsedMilliseconds = performance.now() - startedAt;

    return {
        durationMilliseconds: Number(elapsedMilliseconds.toFixed(2)),
        errorCount: results.reduce((sum, result) => sum + result.errorCount, 0),
        fileCount: results.length,
        fix: scenario.fix,
        name: scenario.name,
        warningCount: results.reduce(
            (sum, result) => sum + result.warningCount,
            0
        ),
    };
};

const reports = [];

for (const scenario of benchmarkScenarios) {
    reports.push(await runScenario(scenario));
}

await mkdir(path.resolve("coverage", "benchmarks"), { recursive: true });
await writeFile(outputPath, `${JSON.stringify(reports, null, 2)}\n`, "utf8");
console.log(`Wrote ESLint benchmark stats to ${outputPath}`);
