import type { TSESTree } from "@typescript-eslint/utils";

/**
 * @packageDocumentation
 * Prefer explicit top-level Stylelint formatter configuration in authored config files.
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

type MessageIds = "preferFormatter";
type Options = readonly [];

const isPropertyExpressionValue = (
    value: Readonly<TSESTree.Property["value"]>
): value is TSESTree.Expression =>
    value.type !== AST_NODE_TYPES.ArrayPattern &&
    value.type !== AST_NODE_TYPES.AssignmentPattern &&
    value.type !== AST_NODE_TYPES.ObjectPattern &&
    value.type !== AST_NODE_TYPES.TSEmptyBodyFunctionExpression;

const hasUsableFormatterValue = (
    expression: Readonly<TSESTree.Expression>
): boolean => {
    if (expression.type === AST_NODE_TYPES.Literal) {
        return (
            typeof expression.value !== "string" ||
            expression.value.trim().length > 0
        );
    }

    return true;
};

/**
 * Rule module that prefers explicit formatter configuration in Stylelint config
 * files.
 */
const preferStylelintFormatterRule: RuleModuleWithDocs<MessageIds, Options> =
    createTypedRule({
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

                    const formatterProperty = getObjectPropertyByName(
                        configObject,
                        "formatter"
                    );

                    if (formatterProperty === undefined) {
                        context.report({
                            messageId: "preferFormatter",
                            node: configObject,
                        });
                        return;
                    }

                    const formatterPropertyValue = formatterProperty.value;

                    if (!isPropertyExpressionValue(formatterPropertyValue)) {
                        return;
                    }

                    if (hasUsableFormatterValue(formatterPropertyValue)) {
                        return;
                    }

                    context.report({
                        messageId: "preferFormatter",
                        node: formatterProperty,
                    });
                },
            });
        },
        meta: {
            deprecated: false,
            docs: {
                configs: [
                    "stylelint2.configs.configuration",
                    "stylelint2.configs.all",
                ],
                description:
                    "require explicit top-level Stylelint `formatter` configuration in authored Stylelint config files.",
                frozen: false,
                recommended: false,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/prefer-stylelint-formatter",
            },
            messages: {
                preferFormatter:
                    "Configure a top-level `formatter` so Stylelint output stays explicit and predictable across runners.",
            },
            schema: [],
            type: "suggestion",
        },
        name: "prefer-stylelint-formatter",
    });

export default preferStylelintFormatterRule;
