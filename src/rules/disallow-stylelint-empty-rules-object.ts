import type { TSESTree } from "@typescript-eslint/utils";

/**
 * @packageDocumentation
 * Disallow an empty top-level Stylelint rules object in authored config files.
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

type MessageIds = "disallowEmptyRulesObject";
type Options = readonly [];

const isPropertyExpressionValue = (
    value: Readonly<TSESTree.Property["value"]>
): value is TSESTree.Expression =>
    value.type !== AST_NODE_TYPES.ArrayPattern &&
    value.type !== AST_NODE_TYPES.AssignmentPattern &&
    value.type !== AST_NODE_TYPES.ObjectPattern &&
    value.type !== AST_NODE_TYPES.TSEmptyBodyFunctionExpression;

/** Rule module that disallows `rules: {}` in Stylelint config files. */
const disallowStylelintEmptyRulesObjectRule: RuleModuleWithDocs<
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

                const rulesProperty = getObjectPropertyByName(
                    configObject,
                    "rules"
                );

                if (rulesProperty === undefined) {
                    return;
                }

                const value = rulesProperty.value;

                if (!isPropertyExpressionValue(value)) {
                    return;
                }

                if (
                    value.type !== AST_NODE_TYPES.ObjectExpression ||
                    value.properties.length > 0
                ) {
                    return;
                }

                context.report({
                    messageId: "disallowEmptyRulesObject",
                    node: rulesProperty,
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
                "disallow an empty top-level `rules` object in authored Stylelint config files.",
            frozen: false,
            recommended: true,
            requiresTypeChecking: false,
            url: "https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-empty-rules-object",
        },
        messages: {
            disallowEmptyRulesObject:
                "Avoid `rules: {}` in shared Stylelint config files. Either define explicit rules or remove the empty object.",
        },
        schema: [],
        type: "suggestion",
    },
    name: "disallow-stylelint-empty-rules-object",
});

export default disallowStylelintEmptyRulesObjectRule;
