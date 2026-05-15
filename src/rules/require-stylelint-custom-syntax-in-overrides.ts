import type { TSESTree } from "@typescript-eslint/utils";

/**
 * @packageDocumentation
 * Require `customSyntax` usage to be scoped within Stylelint overrides entries.
 */
import { AST_NODE_TYPES } from "@typescript-eslint/utils";

import type { RuleModuleWithDocs } from "../_internal/typed-rule.js";

import {
    getExportedStylelintConfigObject,
    getObjectPropertyByName,
    isExportDefaultDeclarationNode,
    isStylelintConfigFile,
} from "../_internal/stylelint-config-object.js";
import { createTypedRule, toRuleListener } from "../_internal/typed-rule.js";

type MessageIds = "requireCustomSyntaxInOverrides";
type Options = readonly [];

const isPropertyExpressionValue = (
    value: Readonly<TSESTree.Property["value"]>
): value is TSESTree.Expression =>
    value.type !== AST_NODE_TYPES.ArrayPattern &&
    value.type !== AST_NODE_TYPES.AssignmentPattern &&
    value.type !== AST_NODE_TYPES.ObjectPattern &&
    value.type !== AST_NODE_TYPES.TSEmptyBodyFunctionExpression;

const hasOverridesCustomSyntax = (
    overridesValue: Readonly<TSESTree.Expression>
): boolean => {
    if (overridesValue.type !== AST_NODE_TYPES.ArrayExpression) {
        return false;
    }

    for (const element of overridesValue.elements) {
        if (element?.type !== AST_NODE_TYPES.ObjectExpression) {
            continue;
        }

        const customSyntaxProperty = getObjectPropertyByName(
            element,
            "customSyntax"
        );

        if (customSyntaxProperty === undefined) {
            continue;
        }

        const customSyntaxValue = customSyntaxProperty.value;

        if (!isPropertyExpressionValue(customSyntaxValue)) {
            continue;
        }

        if (
            customSyntaxValue.type === AST_NODE_TYPES.Literal &&
            typeof customSyntaxValue.value === "string" &&
            customSyntaxValue.value.trim().length > 0
        ) {
            return true;
        }
    }

    return false;
};

/** Rule module that requires customSyntax to be scoped to overrides. */
const requireStylelintCustomSyntaxInOverridesRule: RuleModuleWithDocs<
    MessageIds,
    Options
> = createTypedRule({
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

                const topLevelCustomSyntax = getObjectPropertyByName(
                    configObject,
                    "customSyntax"
                );

                if (topLevelCustomSyntax === undefined) {
                    return;
                }

                const overridesProperty = getObjectPropertyByName(
                    configObject,
                    "overrides"
                );

                if (overridesProperty === undefined) {
                    context.report({
                        messageId: "requireCustomSyntaxInOverrides",
                        node: topLevelCustomSyntax,
                    });
                    return;
                }

                const overridesPropertyValue = overridesProperty.value;

                if (!isPropertyExpressionValue(overridesPropertyValue)) {
                    context.report({
                        messageId: "requireCustomSyntaxInOverrides",
                        node: topLevelCustomSyntax,
                    });
                    return;
                }

                if (hasOverridesCustomSyntax(overridesPropertyValue)) {
                    return;
                }

                context.report({
                    messageId: "requireCustomSyntaxInOverrides",
                    node: topLevelCustomSyntax,
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
                "require top-level `customSyntax` usage to be moved into `overrides` entries with explicit file scope.",
            frozen: false,
            recommended: true,
            requiresTypeChecking: false,
            url: "https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/require-stylelint-custom-syntax-in-overrides",
        },
        messages: {
            requireCustomSyntaxInOverrides:
                "Move `customSyntax` into scoped `overrides` entries so syntax parsing stays explicit per file pattern.",
        },
        schema: [],
        type: "suggestion",
    },
    name: "require-stylelint-custom-syntax-in-overrides",
});

export default requireStylelintCustomSyntaxInOverridesRule;
