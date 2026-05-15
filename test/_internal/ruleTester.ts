/**
 * @packageDocumentation
 * Shared testing utilities for eslint-plugin-stylelint-2 RuleTester and Vitest suites.
 */
import tsParser from "@typescript-eslint/parser";
import { RuleTester } from "@typescript-eslint/rule-tester";
import * as path from "node:path";
import pc from "picocolors";
import { afterAll, describe, it } from "vitest";

import stylelint2Plugin from "../../src/plugin";

type UnknownArray = readonly unknown[];
type UnknownRecord = Record<string, unknown>;

const assertRuleTesterHook = (candidate: unknown, hookName: string): void => {
    if (typeof candidate !== "function") {
        throw new TypeError(
            `Expected Vitest hook '${hookName}' to be a function for RuleTester wiring.`
        );
    }
};

assertRuleTesterHook(afterAll, "afterAll");
RuleTester.afterAll = afterAll;
assertRuleTesterHook(describe, "describe");
// eslint-disable-next-line @typescript-eslint/strict-void-return -- RuleTester expects Jest-style hooks that may return framework internals.
RuleTester.describe = describe;
assertRuleTesterHook(it, "it");
RuleTester.it = it;
const vitestItOnly: unknown = Reflect.get(it, "only");
assertRuleTesterHook(vitestItOnly, "it.only");
const typedVitestItOnly = vitestItOnly as (
    ...arguments_: UnknownArray
) => unknown;
RuleTester.itOnly = (
    ...arguments_: readonly [...Parameters<typeof RuleTester.itOnly>]
) => {
    Reflect.apply(typedVitestItOnly, undefined, arguments_);
    return undefined;
};

type PluginRuleModule = Parameters<RuleTester["run"]>[1];
type RuleRunCases = Parameters<RuleTester["run"]>[2];
type RuleRunInvalidCase = RuleRunCases["invalid"][number];
type RuleRunValidCase = RuleRunCases["valid"][number];

const deriveGeneratedCaseName = (
    ruleName: string,
    caseKind: "invalid" | "valid",
    caseIndex: number,
    caseFilename?: string
): string => {
    const caseLabel = [
        pc.bold(pc.magentaBright("UNNAMED")),
        caseKind === "invalid"
            ? pc.bold(pc.red("invalid"))
            : pc.bold(pc.green("valid")),
        pc.underline(pc.yellow(`#${String(caseIndex + 1)}`)),
    ].join(" ");
    const caseSource =
        typeof caseFilename === "string" && caseFilename.length > 0
            ? pc.underline(pc.cyan(path.basename(caseFilename)))
            : pc.underline(pc.blue(ruleName));

    return `${caseSource}${pc.dim(" - ")}${caseLabel}`;
};

const withGeneratedRuleCaseNames = (
    ruleName: string,
    runCases: Readonly<RuleRunCases>
): RuleRunCases => ({
    invalid: runCases.invalid.map(
        (entry: Readonly<RuleRunInvalidCase>, caseIndex) =>
            typeof entry.name === "string" && entry.name.length > 0
                ? {
                      ...entry,
                      name: pc.bold(pc.cyanBright(entry.name)),
                  }
                : {
                      ...entry,
                      name: deriveGeneratedCaseName(
                          ruleName,
                          "invalid",
                          caseIndex,
                          entry.filename
                      ),
                  }
    ),
    valid: runCases.valid.map(
        (entry: Readonly<RuleRunValidCase>, caseIndex) => {
            if (typeof entry === "string") {
                return {
                    code: entry,
                    name: deriveGeneratedCaseName(ruleName, "valid", caseIndex),
                };
            }

            if (typeof entry.name === "string" && entry.name.length > 0) {
                return {
                    ...entry,
                    name: pc.bold(pc.cyanBright(entry.name)),
                };
            }

            return {
                ...entry,
                name: deriveGeneratedCaseName(
                    ruleName,
                    "valid",
                    caseIndex,
                    entry.filename
                ),
            };
        }
    ),
});

export const createRuleTester = (): RuleTester => {
    const tester = new RuleTester({
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module",
            },
        },
    });
    const originalRun = tester.run.bind(tester);
    tester.run = (ruleName, ruleModule, runCases) => {
        const normalizedCases = withGeneratedRuleCaseNames(ruleName, runCases);
        (originalRun as (...arguments_: UnknownArray) => void)(
            ruleName,
            ruleModule,
            normalizedCases
        );
    };
    return tester;
};

const isRecord = (value: unknown): value is UnknownRecord =>
    typeof value === "object" && value !== null;

const isRuleModule = (value: unknown): value is PluginRuleModule => {
    if (!isRecord(value)) {
        return false;
    }

    return typeof value["create"] === "function";
};

export const getPluginRule = (ruleId: string): PluginRuleModule => {
    const candidate = (stylelint2Plugin.rules as UnknownRecord)[ruleId];

    if (!isRuleModule(candidate)) {
        throw new Error(
            `Rule '${ruleId}' is not registered in stylelint2Plugin.`
        );
    }

    return candidate;
};
