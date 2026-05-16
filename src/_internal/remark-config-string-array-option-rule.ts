/**
 * @packageDocumentation
 * Shared rule factories for top-level Remark string-array configuration options.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";
import type { Except } from "type-fest";

import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import {
    arrayJoin,
    isDefined,
    isEmpty,
    isPropertyDefined,
    setHas,
} from "ts-extras";

import {
    getExportedRemarkConfigObject,
    getObjectPropertyByName,
    isExportDefaultDeclarationNode,
    isRemarkConfigFile,
} from "./remark-config-object.js";
import {
    createFixToRemovePluginSpecifier,
    getRemarkPluginArrayEntries,
    getRemarkPluginSpecifierReferences,
    type RemarkPluginSpecifierReference,
} from "./remark-config-plugin-specifiers.js";
import {
    getStringArrayOptionValue,
    isRelativeSpecifier,
} from "./remark-config-string-array-option.js";
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

const getDuplicateRemarkPluginSpecifierReferences = (
    references: readonly RemarkPluginSpecifierReference[]
): readonly RemarkPluginSpecifierReference[] => {
    const seenValues = new Set<string>();
    const duplicateReferences: RemarkPluginSpecifierReference[] = [];

    for (const reference of references) {
        const specifier = reference.literal.value;

        if (setHas(seenValues, specifier)) {
            duplicateReferences.push(reference);
            continue;
        }

        seenValues.add(specifier);
    }

    return duplicateReferences;
};

const getSortableRemarkPluginSpecifierReferences = (
    pluginsProperty: Readonly<TSESTree.Property>,
    references: readonly RemarkPluginSpecifierReference[]
): readonly RemarkPluginSpecifierReference[] => {
    const pluginEntries = getRemarkPluginArrayEntries(pluginsProperty);
    const sortableReferences = references.filter(
        isPropertyDefined("arrayEntry")
    );

    if (sortableReferences.length !== pluginEntries.length) {
        return [];
    }

    return sortableReferences;
};

const getSortedRemarkPluginSpecifierReferences = (
    references: readonly RemarkPluginSpecifierReference[]
): readonly RemarkPluginSpecifierReference[] =>
    references
        .map((reference, index) => ({
            index,
            reference,
            value: reference.literal.value,
        }))
        .toSorted((left, right) => {
            const valueOrder = left.value.localeCompare(right.value);

            return valueOrder === 0 ? left.index - right.index : valueOrder;
        })
        .map(({ reference }) => reference);

const areRemarkPluginSpecifierReferencesSorted = (
    references: readonly RemarkPluginSpecifierReference[]
): boolean => {
    const sortedReferences =
        getSortedRemarkPluginSpecifierReferences(references);

    return sortedReferences.every(
        (reference, index) => reference === references[index]
    );
};

const toRemarkPluginArrayReplacementText = (
    sourceCode: Readonly<TSESLint.SourceCode>,
    references: readonly RemarkPluginSpecifierReference[]
): string => {
    const sortedEntries = getSortedRemarkPluginSpecifierReferences(references);
    const sortedTexts: string[] = [];

    for (const sortedEntry of sortedEntries) {
        if (!isDefined(sortedEntry.arrayEntry)) {
            continue;
        }

        sortedTexts.push(sourceCode.getText(sortedEntry.arrayEntry.element));
    }

    return `[${arrayJoin(sortedTexts, ", ")}]`;
};

/**
 * Create a rule that prefers array form for one top-level Remark string-array
 * option.
 */
export const createRemarkConfigPreferArrayOptionRule = (
    definition: Readonly<ConfigOptionRuleDefinition<"preferArray">>
): RuleModuleWithDocs<"preferArray", Options> => {
    const { optionName, ...ruleDefinition } = definition;

    return createTypedRule({
        ...ruleDefinition,
        create(context) {
            if (!isRemarkConfigFile(context.physicalFilename)) {
                return {};
            }

            const sourceCode = context.sourceCode;

            return toRuleListener({
                ExportDefaultDeclaration(node: unknown) {
                    if (!isExportDefaultDeclarationNode(node)) {
                        return;
                    }

                    const exportDefaultNode = node;
                    const configObject = getExportedRemarkConfigObject(
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
 * Create a rule that disallows duplicate entries in one top-level Remark
 * string-array option.
 */
export const createRemarkConfigDisallowDuplicateArrayEntriesRule = (
    definition: Readonly<ConfigOptionRuleDefinition<"disallowDuplicates">>
): RuleModuleWithDocs<"disallowDuplicates", Options> => {
    const { optionName, ...ruleDefinition } = definition;

    return createTypedRule({
        ...ruleDefinition,
        create(context) {
            if (!isRemarkConfigFile(context.physicalFilename)) {
                return {};
            }

            return toRuleListener({
                ExportDefaultDeclaration(node: unknown) {
                    if (!isExportDefaultDeclarationNode(node)) {
                        return;
                    }

                    const exportDefaultNode = node;
                    const configObject = getExportedRemarkConfigObject(
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

                    const specifierReferences =
                        getRemarkPluginSpecifierReferences({
                            configObject,
                            pluginsProperty: optionProperty,
                        });
                    const duplicateReferences =
                        getDuplicateRemarkPluginSpecifierReferences(
                            specifierReferences
                        );

                    if (isEmpty(duplicateReferences)) {
                        return;
                    }

                    for (const duplicateReference of duplicateReferences) {
                        context.report({
                            fix(fixer) {
                                return createFixToRemovePluginSpecifier({
                                    fixer,
                                    removalTarget:
                                        duplicateReference.removalTarget,
                                });
                            },
                            messageId: "disallowDuplicates",
                            node: duplicateReference.literal,
                        });
                    }
                },
            });
        },
    }) satisfies RuleModuleWithDocs<"disallowDuplicates", Options>;
};

/**
 * Create a rule that enforces sorted entries in one top-level Remark
 * string-array option.
 */
export const createRemarkConfigSortArrayEntriesRule = (
    definition: Readonly<ConfigOptionRuleDefinition<"sortArray">>
): RuleModuleWithDocs<"sortArray", Options> => {
    const { optionName, ...ruleDefinition } = definition;

    return createTypedRule({
        ...ruleDefinition,
        create(context) {
            if (!isRemarkConfigFile(context.physicalFilename)) {
                return {};
            }

            const sourceCode = context.sourceCode;

            return toRuleListener({
                ExportDefaultDeclaration(node: unknown) {
                    if (!isExportDefaultDeclarationNode(node)) {
                        return;
                    }

                    const exportDefaultNode = node;
                    const configObject = getExportedRemarkConfigObject(
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

                    const propertyValue = optionProperty.value;

                    if (propertyValue.type !== AST_NODE_TYPES.ArrayExpression) {
                        return;
                    }

                    const specifierReferences =
                        getRemarkPluginSpecifierReferences({
                            configObject,
                            pluginsProperty: optionProperty,
                        });
                    const sortableReferences =
                        getSortableRemarkPluginSpecifierReferences(
                            optionProperty,
                            specifierReferences
                        );

                    if (
                        isEmpty(sortableReferences) ||
                        areRemarkPluginSpecifierReferencesSorted(
                            sortableReferences
                        )
                    ) {
                        return;
                    }

                    context.report({
                        fix(fixer) {
                            return fixer.replaceText(
                                propertyValue,
                                toRemarkPluginArrayReplacementText(
                                    sourceCode,
                                    sortableReferences
                                )
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
 * Create a rule that disallows relative-path entries in one top-level Remark
 * string-array option.
 */
export const createRemarkConfigDisallowRelativeArrayEntriesRule = (
    definition: Readonly<ConfigOptionRuleDefinition<"disallowRelative">>
): RuleModuleWithDocs<"disallowRelative", Options> => {
    const { optionName, ...ruleDefinition } = definition;

    return createTypedRule({
        ...ruleDefinition,
        create(context) {
            if (!isRemarkConfigFile(context.physicalFilename)) {
                return {};
            }

            return toRuleListener({
                ExportDefaultDeclaration(node: unknown) {
                    if (!isExportDefaultDeclarationNode(node)) {
                        return;
                    }

                    const exportDefaultNode = node;
                    const configObject = getExportedRemarkConfigObject(
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

                    const specifierReferences =
                        getRemarkPluginSpecifierReferences({
                            configObject,
                            pluginsProperty: optionProperty,
                        });

                    for (const specifierReference of specifierReferences) {
                        const specifier = specifierReference.literal.value;

                        if (!isRelativeSpecifier(specifier)) {
                            continue;
                        }

                        context.report({
                            messageId: "disallowRelative",
                            node: specifierReference.literal,
                        });
                    }
                },
            });
        },
    }) satisfies RuleModuleWithDocs<"disallowRelative", Options>;
};
