/**
 * @packageDocumentation
 * Shared rule factories for top-level Stylelint string-array configuration options.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";
import type { Except } from "type-fest";

import { arrayJoin, setHas } from "ts-extras";

import {
    getExportedStylelintConfigObject,
    getObjectPropertyByName,
    isExportDefaultDeclarationNode,
    isStylelintConfigFile,
} from "./stylelint-config-object.js";
import {
    getStringArrayOptionValue,
    isRelativeSpecifier,
} from "./stylelint-config-string-array-option.js";
import {
    createTypedRule,
    type RuleModuleWithDocs,
    toRuleListener,
} from "./typed-rule.js";

type ConfigOptionRuleDefinition<MessageIds extends string> = Readonly<
    Except<RuleModuleWithDocs<MessageIds, Options>, "create"> & {
        optionName: string;
    }
>;

type Options = readonly [];

const getLiteralText = (
    sourceCode: Readonly<TSESLint.SourceCode>,
    literal: Readonly<TSESTree.StringLiteral>
): string => sourceCode.getText(literal);

const getUniqueLiterals = (
    literals: readonly Readonly<TSESTree.StringLiteral>[]
): readonly Readonly<TSESTree.StringLiteral>[] => {
    const seenValues = new Set<string>();
    const uniqueLiterals: Readonly<TSESTree.StringLiteral>[] = [];

    for (const literal of literals) {
        const literalValue = literal.value;

        if (typeof literalValue !== "string") {
            continue;
        }

        if (setHas(seenValues, literalValue)) {
            continue;
        }

        seenValues.add(literalValue);
        uniqueLiterals.push(literal);
    }

    return uniqueLiterals;
};

const hasDuplicates = (
    literals: readonly Readonly<TSESTree.StringLiteral>[]
): boolean => getUniqueLiterals(literals).length !== literals.length;

const getSortedLiteralItems = (
    sourceCode: Readonly<TSESLint.SourceCode>,
    literals: readonly Readonly<TSESTree.StringLiteral>[]
): readonly Readonly<{
    index: number;
    text: string;
    value: string;
}>[] =>
    literals
        .map((literal, index) => ({
            index,
            text: getLiteralText(sourceCode, literal),
            value: literal.value,
        }))
        .toSorted((left, right) => {
            const valueOrder = left.value.localeCompare(right.value);

            return valueOrder === 0 ? left.index - right.index : valueOrder;
        });

const isAlreadySorted = (
    sourceCode: Readonly<TSESLint.SourceCode>,
    literals: readonly Readonly<TSESTree.StringLiteral>[]
): boolean => {
    const sortedItems = getSortedLiteralItems(sourceCode, literals);

    return sortedItems.every((item, index) => item.index === index);
};

const toArrayReplacementText = (
    sourceCode: Readonly<TSESLint.SourceCode>,
    literals: readonly Readonly<TSESTree.StringLiteral>[]
): string =>
    `[${arrayJoin(
        literals.map((literal) => getLiteralText(sourceCode, literal)),
        ", "
    )}]`;

const getSortedLiteralTexts = (
    sourceCode: Readonly<TSESLint.SourceCode>,
    literals: readonly Readonly<TSESTree.StringLiteral>[]
): string[] => {
    const sortedItems = getSortedLiteralItems(sourceCode, literals);
    const sortedTexts: string[] = [];

    for (const sortedItem of sortedItems) {
        sortedTexts.push(sortedItem.text);
    }

    return sortedTexts;
};

const getRelativeLiterals = (
    optionValue: ReturnType<typeof getStringArrayOptionValue>
): readonly TSESTree.StringLiteral[] => {
    if (optionValue === undefined) {
        return [];
    }

    if (optionValue.kind === "string") {
        const literalValue = optionValue.stringLiteral.value;

        if (isRelativeSpecifier(literalValue)) {
            return [optionValue.stringLiteral];
        }

        return [];
    }

    return optionValue.stringLiterals.filter((literal) =>
        isRelativeSpecifier(literal.value)
    );
};

/**
 * Create a rule that prefers array form for one top-level Stylelint
 * string-array option.
 */
export const createStylelintConfigPreferArrayOptionRule = (
    definition: Readonly<ConfigOptionRuleDefinition<"preferArray">>
): RuleModuleWithDocs<"preferArray", Options> => {
    const { optionName, ...ruleDefinition } = definition;

    return createTypedRule({
        ...ruleDefinition,
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

                    const optionProperty = getObjectPropertyByName(
                        configObject,
                        optionName
                    );

                    if (optionProperty === undefined) {
                        return;
                    }

                    const optionValue =
                        getStringArrayOptionValue(optionProperty);

                    if (optionValue?.kind !== "string") {
                        return;
                    }

                    context.report({
                        fix(fixer) {
                            return fixer.replaceText(
                                optionValue.stringLiteral,
                                `[${getLiteralText(sourceCode, optionValue.stringLiteral)}]`
                            );
                        },
                        messageId: "preferArray",
                        node: optionProperty,
                    });
                },
            });
        },
    }) satisfies RuleModuleWithDocs<"preferArray", Options>;
};

/**
 * Create a rule that disallows duplicate entries in one top-level Stylelint
 * string-array option.
 */
export const createStylelintConfigDisallowDuplicateArrayEntriesRule = (
    definition: Readonly<ConfigOptionRuleDefinition<"disallowDuplicates">>
): RuleModuleWithDocs<"disallowDuplicates", Options> => {
    const { optionName, ...ruleDefinition } = definition;

    return createTypedRule({
        ...ruleDefinition,
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

                    const optionProperty = getObjectPropertyByName(
                        configObject,
                        optionName
                    );

                    if (optionProperty === undefined) {
                        return;
                    }

                    const optionValue =
                        getStringArrayOptionValue(optionProperty);

                    if (optionValue?.kind !== "array") {
                        return;
                    }

                    if (!hasDuplicates(optionValue.stringLiterals)) {
                        return;
                    }

                    context.report({
                        fix(fixer) {
                            const uniqueLiterals = getUniqueLiterals(
                                optionValue.stringLiterals
                            );

                            return fixer.replaceText(
                                optionValue.arrayExpression,
                                toArrayReplacementText(
                                    sourceCode,
                                    uniqueLiterals
                                )
                            );
                        },
                        messageId: "disallowDuplicates",
                        node: optionProperty,
                    });
                },
            });
        },
    }) satisfies RuleModuleWithDocs<"disallowDuplicates", Options>;
};

/**
 * Create a rule that enforces sorted entries in one top-level Stylelint
 * string-array option.
 */
export const createStylelintConfigSortArrayEntriesRule = (
    definition: Readonly<ConfigOptionRuleDefinition<"sortArray">>
): RuleModuleWithDocs<"sortArray", Options> => {
    const { optionName, ...ruleDefinition } = definition;

    return createTypedRule({
        ...ruleDefinition,
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

                    const optionProperty = getObjectPropertyByName(
                        configObject,
                        optionName
                    );

                    if (optionProperty === undefined) {
                        return;
                    }

                    const optionValue =
                        getStringArrayOptionValue(optionProperty);

                    if (optionValue?.kind !== "array") {
                        return;
                    }

                    if (
                        isAlreadySorted(sourceCode, optionValue.stringLiterals)
                    ) {
                        return;
                    }

                    context.report({
                        fix(fixer) {
                            const sortedLiterals = getSortedLiteralTexts(
                                sourceCode,
                                optionValue.stringLiterals
                            );

                            return fixer.replaceText(
                                optionValue.arrayExpression,
                                `[${arrayJoin(sortedLiterals, ", ")}]`
                            );
                        },
                        messageId: "sortArray",
                        node: optionProperty,
                    });
                },
            });
        },
    }) satisfies RuleModuleWithDocs<"sortArray", Options>;
};

/**
 * Create a rule that disallows relative-path entries in one top-level Stylelint
 * string-array option.
 */
export const createStylelintConfigDisallowRelativeArrayEntriesRule = (
    definition: Readonly<ConfigOptionRuleDefinition<"disallowRelative">>
): RuleModuleWithDocs<"disallowRelative", Options> => {
    const { optionName, ...ruleDefinition } = definition;

    return createTypedRule({
        ...ruleDefinition,
        create(context) {
            if (!isStylelintConfigFile(context.physicalFilename)) {
                return {};
            }

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

                    const optionProperty = getObjectPropertyByName(
                        configObject,
                        optionName
                    );

                    if (optionProperty === undefined) {
                        return;
                    }

                    const optionValue =
                        getStringArrayOptionValue(optionProperty);
                    const relativeLiterals = getRelativeLiterals(optionValue);

                    for (const relativeLiteral of relativeLiterals) {
                        context.report({
                            messageId: "disallowRelative",
                            node: relativeLiteral,
                        });
                    }
                },
            });
        },
    }) satisfies RuleModuleWithDocs<"disallowRelative", Options>;
};
