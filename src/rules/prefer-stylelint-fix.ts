import type { TSESTree } from "@typescript-eslint/utils";

/**
 * @packageDocumentation
 * Prefer enabling top-level Stylelint fix configuration in authored config files.
 */
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import { arrayFirst } from "ts-extras";

import type { RuleModuleWithDocs } from "../_internal/typed-rule.js";

import {
    getExportedStylelintConfigObject,
    getObjectPropertyByName,
    isExportDefaultDeclarationNode,
    isStylelintConfigFile,
} from "../_internal/stylelint-config-object.js";
import { createTypedRule, toRuleListener } from "../_internal/typed-rule.js";

type MessageIds = "preferFix";
type Options = readonly [];

const isPropertyExpressionValue = (
    value: Readonly<TSESTree.Property["value"]>
): value is TSESTree.Expression =>
    value.type !== AST_NODE_TYPES.ArrayPattern &&
    value.type !== AST_NODE_TYPES.AssignmentPattern &&
    value.type !== AST_NODE_TYPES.ObjectPattern &&
    value.type !== AST_NODE_TYPES.TSEmptyBodyFunctionExpression;

const getLineEnding = (text: string): "\n" | "\r\n" =>
    text.includes("\r\n") ? "\r\n" : "\n";

const getIndentation = (node: Readonly<TSESTree.Node> | undefined): string =>
    node === undefined ? "    " : " ".repeat(node.loc.start.column);

const isFixEnabled = (expression: Readonly<TSESTree.Expression>): boolean => {
    if (expression.type === AST_NODE_TYPES.Literal) {
        return (
            expression.value === true ||
            expression.value === "strict" ||
            expression.value === "lax"
        );
    }

    return false;
};

/** Rule module that prefers `fix` to be enabled in Stylelint config files. */
const preferStylelintFixRule: RuleModuleWithDocs<MessageIds, Options> =
    createTypedRule({
        create(context) {
            if (!isStylelintConfigFile(context.physicalFilename)) {
                return {};
            }

            const sourceCode = context.sourceCode;
            const lineEnding = getLineEnding(sourceCode.text);

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

                    const fixProperty = getObjectPropertyByName(
                        configObject,
                        "fix"
                    );

                    if (fixProperty === undefined) {
                        context.report({
                            fix(fixer) {
                                const firstProperty = arrayFirst(
                                    configObject.properties
                                );

                                if (firstProperty === undefined) {
                                    return fixer.replaceText(
                                        configObject,
                                        `{${lineEnding}    fix: true,${lineEnding}}`
                                    );
                                }

                                const indentation =
                                    getIndentation(firstProperty);

                                return fixer.insertTextBefore(
                                    firstProperty,
                                    `fix: true,${lineEnding}${indentation}`
                                );
                            },
                            messageId: "preferFix",
                            node: configObject,
                        });
                        return;
                    }

                    const fixPropertyValue = fixProperty.value;

                    if (!isPropertyExpressionValue(fixPropertyValue)) {
                        return;
                    }

                    if (isFixEnabled(fixPropertyValue)) {
                        return;
                    }

                    context.report({
                        fix(fixer) {
                            return fixer.replaceText(fixPropertyValue, "true");
                        },
                        messageId: "preferFix",
                        node: fixProperty,
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
                    "enforce enabled top-level Stylelint `fix` configuration in authored Stylelint config files.",
                recommended: false,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/prefer-stylelint-fix",
            },
            fixable: "code",
            messages: {
                preferFix:
                    "Enable `fix` so Stylelint autofix stays on by default for supported workflows.",
            },
            schema: [],
            type: "suggestion",
        },
        name: "prefer-stylelint-fix",
    });

export default preferStylelintFixRule;
