import type { TSESLint, TSESTree } from "@typescript-eslint/utils";
import type { JsonPrimitive } from "type-fest";

/**
 * @packageDocumentation
 * Disallow duplicate values in array-valued Stylelint secondary rule options.
 */
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import { arrayJoin, isDefined, setHas } from "ts-extras";

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

type ComparableLiteral = JsonPrimitive;
type MessageIds = "disallowDuplicateRuleOptionValues";
type Options = readonly [];

const isPropertyExpressionValue = (
    value: Readonly<TSESTree.Property["value"]>
): value is TSESTree.Expression =>
    value.type !== AST_NODE_TYPES.ArrayPattern &&
    value.type !== AST_NODE_TYPES.AssignmentPattern &&
    value.type !== AST_NODE_TYPES.ObjectPattern &&
    value.type !== AST_NODE_TYPES.TSEmptyBodyFunctionExpression;

const getComparableLiteral = (
    expression: Readonly<TSESTree.Expression>
): ComparableLiteral | undefined => {
    if (expression.type !== AST_NODE_TYPES.Literal) {
        return undefined;
    }

    if (
        typeof expression.value === "string" ||
        typeof expression.value === "number" ||
        typeof expression.value === "boolean" ||
        expression.value === null
    ) {
        return expression.value;
    }

    return undefined;
};

const getArrayLiteralElements = (
    arrayExpression: Readonly<TSESTree.ArrayExpression>
): readonly Readonly<TSESTree.Expression>[] | undefined => {
    const elements: Readonly<TSESTree.Expression>[] = [];

    for (const element of arrayExpression.elements) {
        if (element === null || element.type === AST_NODE_TYPES.SpreadElement) {
            return undefined;
        }

        elements.push(element);
    }

    return elements;
};

const getObjectExpressionElements = (
    arrayExpression: Readonly<TSESTree.ArrayExpression>
): readonly Readonly<TSESTree.ObjectExpression>[] => {
    const objectElements: Readonly<TSESTree.ObjectExpression>[] = [];

    for (const element of arrayExpression.elements) {
        if (element?.type === AST_NODE_TYPES.ObjectExpression) {
            objectElements.push(element);
        }
    }

    return objectElements;
};

const getArrayValuedOptionProperties = (
    optionObject: Readonly<TSESTree.ObjectExpression>
): readonly Readonly<TSESTree.ArrayExpression>[] => {
    const optionArrays: Readonly<TSESTree.ArrayExpression>[] = [];

    for (const optionProperty of optionObject.properties) {
        if (optionProperty.type !== AST_NODE_TYPES.Property) {
            continue;
        }

        const optionPropertyValue = optionProperty.value;

        if (
            isPropertyExpressionValue(optionPropertyValue) &&
            optionPropertyValue.type === AST_NODE_TYPES.ArrayExpression
        ) {
            optionArrays.push(optionPropertyValue);
        }
    }

    return optionArrays;
};

const hasDuplicateComparableLiterals = (
    elements: readonly Readonly<TSESTree.Expression>[]
): boolean => {
    const seenValues = new Set<string>();

    for (const element of elements) {
        const comparableLiteral = getComparableLiteral(element);

        if (!isDefined(comparableLiteral)) {
            return false;
        }

        const signature = `${typeof comparableLiteral}:${String(comparableLiteral)}`;

        if (setHas(seenValues, signature)) {
            return true;
        }

        seenValues.add(signature);
    }

    return false;
};

const getDedupedElements = (
    elements: readonly Readonly<TSESTree.Expression>[]
): readonly Readonly<TSESTree.Expression>[] => {
    const dedupedElements: Readonly<TSESTree.Expression>[] = [];
    const seenValues = new Set<string>();

    for (const element of elements) {
        const comparableLiteral = getComparableLiteral(element);

        if (!isDefined(comparableLiteral)) {
            return elements;
        }

        const signature = `${typeof comparableLiteral}:${String(comparableLiteral)}`;

        if (setHas(seenValues, signature)) {
            continue;
        }

        seenValues.add(signature);
        dedupedElements.push(element);
    }

    return dedupedElements;
};

const getArrayReplacement = (
    sourceCode: Readonly<TSESLint.SourceCode>,
    elements: readonly Readonly<TSESTree.Expression>[]
): string =>
    `[${arrayJoin(
        elements.map((element) => sourceCode.getText(element)),
        ", "
    )}]`;

const reportDuplicateOptionArray = (
    context: Readonly<TSESLint.RuleContext<MessageIds, Options>>,
    sourceCode: Readonly<TSESLint.SourceCode>,
    optionArray: Readonly<TSESTree.ArrayExpression>
): void => {
    const arrayLiteralElements = getArrayLiteralElements(optionArray);

    if (
        arrayLiteralElements === undefined ||
        !hasDuplicateComparableLiterals(arrayLiteralElements)
    ) {
        return;
    }

    context.report({
        fix(fixer) {
            const dedupedElements = getDedupedElements(arrayLiteralElements);

            return fixer.replaceText(
                optionArray,
                getArrayReplacement(sourceCode, dedupedElements)
            );
        },
        messageId: "disallowDuplicateRuleOptionValues",
        node: optionArray,
    });
};

const reportDuplicateRuleOptionValues = (
    context: Readonly<TSESLint.RuleContext<MessageIds, Options>>,
    sourceCode: Readonly<TSESLint.SourceCode>,
    ruleEntryValue: Readonly<TSESTree.Property["value"]>
): void => {
    if (!isPropertyExpressionValue(ruleEntryValue)) {
        return;
    }

    if (ruleEntryValue.type !== AST_NODE_TYPES.ArrayExpression) {
        return;
    }

    const optionObjects = getObjectExpressionElements(ruleEntryValue);

    for (const optionObject of optionObjects) {
        const optionArrays = getArrayValuedOptionProperties(optionObject);

        for (const optionArray of optionArrays) {
            reportDuplicateOptionArray(context, sourceCode, optionArray);
        }
    }
};

/**
 * Rule module that removes duplicate scalar literals from array-valued
 * Stylelint secondary option properties.
 */
const disallowStylelintDuplicateRuleOptionValuesRule: RuleModuleWithDocs<
    MessageIds,
    Options
> = createTypedRule({
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

                for (const ruleEntry of ruleEntries) {
                    reportDuplicateRuleOptionValues(
                        context,
                        sourceCode,
                        ruleEntry.value
                    );
                }
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
                "disallow duplicate scalar literals in array-valued Stylelint secondary rule options.",
            frozen: false,
            recommended: true,
            requiresTypeChecking: false,
            url: "https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-duplicate-rule-option-values",
        },
        fixable: "code",
        messages: {
            disallowDuplicateRuleOptionValues:
                "Remove duplicate values from this Stylelint secondary option array so rule behavior remains explicit.",
        },
        schema: [],
        type: "suggestion",
    },
    name: "disallow-stylelint-duplicate-rule-option-values",
});

export default disallowStylelintDuplicateRuleOptionValuesRule;
