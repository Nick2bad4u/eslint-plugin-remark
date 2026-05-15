import type { TSESTree } from "@typescript-eslint/utils";

/**
 * @packageDocumentation
 * Require Stylelint override `files` declarations to use explicit non-empty glob arrays.
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

type ArrayExpressionElement = TSESTree.ArrayExpression["elements"][number];
type MessageIds = "requireOverrideFilesArray";
type Options = readonly [];

const isPropertyExpressionValue = (
    value: Readonly<TSESTree.Property["value"]>
): value is TSESTree.Expression =>
    value.type !== AST_NODE_TYPES.ArrayPattern &&
    value.type !== AST_NODE_TYPES.AssignmentPattern &&
    value.type !== AST_NODE_TYPES.ObjectPattern &&
    value.type !== AST_NODE_TYPES.TSEmptyBodyFunctionExpression;

const isNonEmptyStringLiteralElement = (
    element: Readonly<ArrayExpressionElement>
): boolean =>
    element !== null &&
    element.type === AST_NODE_TYPES.Literal &&
    typeof element.value === "string" &&
    element.value.trim().length > 0;

const hasStrictFilesArrayShape = (
    expression: Readonly<TSESTree.Expression>
): boolean => {
    if (expression.type !== AST_NODE_TYPES.ArrayExpression) {
        return false;
    }

    if (expression.elements.length === 0) {
        return false;
    }

    for (const element of expression.elements) {
        if (isNonEmptyStringLiteralElement(element)) {
            continue;
        }

        return false;
    }

    return true;
};

/** Rule module enforcing array-only override file globs with explicit strings. */
const requireStylelintOverridesFilesArrayRule: RuleModuleWithDocs<
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

                const overridesProperty = getObjectPropertyByName(
                    configObject,
                    "overrides"
                );

                if (overridesProperty === undefined) {
                    return;
                }

                const overridesPropertyValue = overridesProperty.value;

                if (!isPropertyExpressionValue(overridesPropertyValue)) {
                    return;
                }

                if (
                    overridesPropertyValue.type !==
                    AST_NODE_TYPES.ArrayExpression
                ) {
                    return;
                }

                for (const overrideEntry of overridesPropertyValue.elements) {
                    if (
                        overrideEntry?.type !== AST_NODE_TYPES.ObjectExpression
                    ) {
                        continue;
                    }

                    const filesProperty = getObjectPropertyByName(
                        overrideEntry,
                        "files"
                    );

                    if (filesProperty === undefined) {
                        continue;
                    }

                    const filesPropertyValue = filesProperty.value;

                    if (!isPropertyExpressionValue(filesPropertyValue)) {
                        continue;
                    }

                    if (hasStrictFilesArrayShape(filesPropertyValue)) {
                        continue;
                    }

                    context.report({
                        messageId: "requireOverrideFilesArray",
                        node: filesProperty,
                    });
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
                "require Stylelint override `files` declarations to be explicit non-empty arrays of glob strings.",
            frozen: false,
            recommended: true,
            requiresTypeChecking: false,
            url: "https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/require-stylelint-overrides-files-array",
        },
        messages: {
            requireOverrideFilesArray:
                'Stylelint override `files` must be a non-empty array of non-empty glob strings (for example `["**/*.scss"]`).',
        },
        schema: [],
        type: "suggestion",
    },
    name: "require-stylelint-overrides-files-array",
});

export default requireStylelintOverridesFilesArrayRule;
