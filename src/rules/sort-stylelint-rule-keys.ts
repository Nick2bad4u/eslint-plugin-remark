import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

/**
 * @packageDocumentation
 * Enforce sorted Stylelint rule keys in top-level rules object declarations.
 */
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import { arrayAt, arrayFirst, arrayJoin, isDefined } from "ts-extras";

import type { RuleModuleWithDocs } from "../_internal/typed-rule.js";

import {
    getExportedStylelintConfigObject,
    isExportDefaultDeclarationNode,
    isStylelintConfigFile,
} from "../_internal/stylelint-config-object.js";
import {
    getTopLevelRuleEntries,
    getTopLevelRulesObject,
} from "../_internal/stylelint-config-rules-object.js";
import { createTypedRule, toRuleListener } from "../_internal/typed-rule.js";

type MessageIds = "sortRuleKeys";
type Options = readonly [];

const getRuleName = (
    property: Readonly<TSESTree.Property>
): string | undefined => {
    const propertyKey = property.key;

    if (propertyKey.type === AST_NODE_TYPES.Identifier) {
        return propertyKey.name;
    }

    if (
        propertyKey.type === AST_NODE_TYPES.Literal &&
        typeof propertyKey.value === "string"
    ) {
        return propertyKey.value;
    }

    return undefined;
};

const isAlreadySorted = (
    properties: readonly Readonly<TSESTree.Property>[]
): boolean => {
    let previousRuleName = "";

    for (const property of properties) {
        const ruleName = getRuleName(property);

        if (!isDefined(ruleName)) {
            return true;
        }

        if (ruleName.localeCompare(previousRuleName) < 0) {
            return false;
        }

        previousRuleName = ruleName;
    }

    return true;
};

const canSafelyFixSorting = (
    sourceCode: Readonly<TSESLint.SourceCode>,
    properties: readonly Readonly<TSESTree.Property>[]
): boolean => {
    for (const property of properties) {
        if (property.computed || property.kind !== "init") {
            return false;
        }

        if (!isDefined(getRuleName(property))) {
            return false;
        }

        if (sourceCode.getCommentsBefore(property).length > 0) {
            return false;
        }

        if (sourceCode.getCommentsAfter(property).length > 0) {
            return false;
        }
    }

    return true;
};

const getSortedPropertyText = (
    sourceCode: Readonly<TSESLint.SourceCode>,
    properties: readonly Readonly<TSESTree.Property>[]
): string => {
    const sortedProperties = [...properties];

    sortedProperties.sort((left, right) => {
        const leftRuleName = getRuleName(left) ?? "";
        const rightRuleName = getRuleName(right) ?? "";

        return leftRuleName.localeCompare(rightRuleName);
    });

    const indentation = " ".repeat(
        arrayFirst(properties)?.loc.start.column ?? 0
    );

    return arrayJoin(
        sortedProperties.map((property) => sourceCode.getText(property)),
        `,\n${indentation}`
    );
};

/** Rule module that enforces lexical ordering of top-level Stylelint rule keys. */
const sortStylelintRuleKeysRule: RuleModuleWithDocs<MessageIds, Options> =
    createTypedRule({
        create(context) {
            if (!isStylelintConfigFile(context.physicalFilename)) {
                return {};
            }

            const sourceCode = context.sourceCode;

            return toRuleListener({
                ExportDefaultDeclaration(node: unknown) {
                    if (!isExportDefaultDeclarationNode(node)) {
                        return;
                    }

                    const exportDefaultNode = node;
                    const configObject = getExportedStylelintConfigObject(
                        exportDefaultNode.declaration
                    );

                    if (configObject === undefined) {
                        return;
                    }

                    const rulesObject = getTopLevelRulesObject(configObject);

                    if (rulesObject === undefined) {
                        return;
                    }

                    const ruleEntries = getTopLevelRuleEntries(rulesObject);

                    if (
                        ruleEntries.length < 2 ||
                        isAlreadySorted(ruleEntries)
                    ) {
                        return;
                    }

                    context.report({
                        fix(fixer) {
                            if (!canSafelyFixSorting(sourceCode, ruleEntries)) {
                                return null;
                            }

                            const firstRuleEntry = arrayFirst(ruleEntries);
                            const lastRuleEntry = arrayAt(ruleEntries, -1);

                            if (
                                firstRuleEntry === undefined ||
                                lastRuleEntry === undefined
                            ) {
                                return null;
                            }

                            return fixer.replaceTextRange(
                                [
                                    arrayFirst(firstRuleEntry.range),
                                    lastRuleEntry.range[1],
                                ],
                                getSortedPropertyText(sourceCode, ruleEntries)
                            );
                        },
                        messageId: "sortRuleKeys",
                        node: rulesObject,
                    });
                },
            });
        },
        meta: {
            deprecated: false,
            docs: {
                configs: [
                    "stylelint2.configs.recommended",
                    "stylelint2.configs.configuration",
                    "stylelint2.configs.all",
                ],
                description:
                    "enforce sorted top-level Stylelint rule keys in shared config files.",
                recommended: true,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/sort-stylelint-rule-keys",
            },
            fixable: "code",
            messages: {
                sortRuleKeys:
                    "Sort top-level Stylelint `rules` keys for deterministic diffs and consistent review order.",
            },
            schema: [],
            type: "suggestion",
        },
        name: "sort-stylelint-rule-keys",
    });

export default sortStylelintRuleKeysRule;
