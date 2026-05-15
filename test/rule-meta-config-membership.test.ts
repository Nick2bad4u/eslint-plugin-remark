/**
 * @packageDocumentation
 * Contract tests ensuring rule metadata config references stay aligned with runtime preset membership.
 */
import { describe, expect, it } from "vitest";

import remarkPlugin from "../src/plugin";

const pluginNamespace = "remark";

const isRecord = (value: unknown): value is Record<string, unknown> =>
    typeof value === "object" && value !== null;

const getRulesRecord = (
    configEntry: Readonly<Record<string, unknown>>
): Readonly<Record<string, unknown>> => {
    const possibleRules = configEntry["rules"];

    return isRecord(possibleRules) ? possibleRules : {};
};

const getDocumentedConfigs = (ruleModule: unknown): readonly string[] => {
    if (!isRecord(ruleModule)) {
        return [];
    }

    const possibleMeta = ruleModule["meta"];

    if (!isRecord(possibleMeta)) {
        return [];
    }

    const possibleDocs = possibleMeta["docs"];

    if (!isRecord(possibleDocs)) {
        return [];
    }

    const possibleConfigs = possibleDocs["configs"];

    if (typeof possibleConfigs === "string") {
        return [possibleConfigs];
    }

    if (!Array.isArray(possibleConfigs)) {
        return [];
    }

    const documentedConfigs: string[] = [];

    for (const configReference of possibleConfigs) {
        if (typeof configReference === "string") {
            documentedConfigs.push(configReference);
        }
    }

    return documentedConfigs;
};

const collectEnabledRuleIds = (configValue: unknown): ReadonlySet<string> => {
    const enabledRuleIds = new Set<string>();
    const candidateEntries = Array.isArray(configValue)
        ? configValue
        : [configValue];
    const configEntries: Readonly<Record<string, unknown>>[] = [];

    for (const configEntry of candidateEntries) {
        if (isRecord(configEntry)) {
            configEntries.push(configEntry);
        }
    }

    for (const configEntry of configEntries) {
        const rulesRecord = getRulesRecord(configEntry);

        for (const [ruleId, ruleLevel] of Object.entries(rulesRecord)) {
            if (ruleLevel !== undefined) {
                enabledRuleIds.add(ruleId);
            }
        }
    }

    return enabledRuleIds;
};

const canonicalConfigMembership = [
    {
        configReference: "remark.configs.all",
        ruleIds: collectEnabledRuleIds(remarkPlugin.configs.all),
    },
    {
        configReference: "remark.configs.configuration",
        ruleIds: collectEnabledRuleIds(remarkPlugin.configs.configuration),
    },
    {
        configReference: "remark.configs.recommended",
        ruleIds: collectEnabledRuleIds(remarkPlugin.configs.recommended),
    },
    {
        configReference: "remark.configs.remarkOnly",
        ruleIds: collectEnabledRuleIds(remarkPlugin.configs.remarkOnly),
    },
] as const;

describe("rule meta.docs.configs contract", () => {
    it("matches canonical preset membership", () => {
        expect.hasAssertions();

        for (const [ruleName, ruleModule] of Object.entries(
            remarkPlugin.rules
        )) {
            const fullRuleId = `${pluginNamespace}/${ruleName}`;
            const documentedConfigs = getDocumentedConfigs(ruleModule);

            for (const {
                configReference,
                ruleIds,
            } of canonicalConfigMembership) {
                const isEnabledInPreset = ruleIds.has(fullRuleId);
                const isDocumentedInPreset =
                    documentedConfigs.includes(configReference);

                expect(
                    isDocumentedInPreset,
                    `${ruleName}: expected docs.configs to ${
                        isEnabledInPreset ? "include" : "exclude"
                    } ${configReference}`
                ).toBe(isEnabledInPreset);
            }
        }
    });

    it("keeps docs.recommended aligned with recommended preset membership", () => {
        expect.hasAssertions();

        const recommendedMembership = collectEnabledRuleIds(
            remarkPlugin.configs.recommended
        );

        for (const [ruleName, ruleModule] of Object.entries(
            remarkPlugin.rules
        )) {
            const fullRuleId = `${pluginNamespace}/${ruleName}`;
            const expectedRecommended = recommendedMembership.has(fullRuleId);
            const possibleMeta = isRecord(ruleModule)
                ? ruleModule.meta
                : undefined;
            const possibleDocs = isRecord(possibleMeta)
                ? possibleMeta["docs"]
                : undefined;
            const documentedRecommended =
                isRecord(possibleDocs) &&
                typeof possibleDocs["recommended"] === "boolean"
                    ? possibleDocs["recommended"]
                    : false;

            expect(
                documentedRecommended,
                `${ruleName}: expected docs.recommended to be ${String(expectedRecommended)} to match remark.configs.recommended membership`
            ).toBe(expectedRecommended);
        }
    });
});
