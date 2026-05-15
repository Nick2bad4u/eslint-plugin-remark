/**
 * @packageDocumentation
 * Require a top-level Stylelint rules object in authored config files.
 */
import type { TSESTree } from "@typescript-eslint/utils";

import { arrayFirst } from "ts-extras";

import type { RuleModuleWithDocs } from "../_internal/typed-rule.js";

import {
    getExportedStylelintConfigObject,
    getObjectPropertyByName,
    isExportDefaultDeclarationNode,
    isStylelintConfigFile,
} from "../_internal/stylelint-config-object.js";
import { createTypedRule, toRuleListener } from "../_internal/typed-rule.js";

type MessageIds = "requireRulesObject";
type Options = readonly [];

const getLineEnding = (text: string): "\n" | "\r\n" =>
    text.includes("\r\n") ? "\r\n" : "\n";

const getIndentation = (node: Readonly<TSESTree.Node> | undefined): string =>
    node === undefined ? "    " : " ".repeat(node.loc.start.column);

/** Rule module that requires top-level `rules` in Stylelint config files. */
const requireStylelintRulesObjectRule: RuleModuleWithDocs<MessageIds, Options> =
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

                    const rulesProperty = getObjectPropertyByName(
                        configObject,
                        "rules"
                    );

                    if (rulesProperty !== undefined) {
                        return;
                    }

                    context.report({
                        fix(fixer) {
                            const firstProperty = arrayFirst(
                                configObject.properties
                            );

                            if (firstProperty === undefined) {
                                return fixer.replaceText(
                                    configObject,
                                    `{${lineEnding}    rules: {},${lineEnding}}`
                                );
                            }

                            const indentation = getIndentation(firstProperty);

                            return fixer.insertTextBefore(
                                firstProperty,
                                `rules: {},${lineEnding}${indentation}`
                            );
                        },
                        messageId: "requireRulesObject",
                        node: configObject,
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
                    "require a top-level `rules` object in authored Stylelint config files.",
                recommended: true,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/require-stylelint-rules-object",
            },
            fixable: "code",
            messages: {
                requireRulesObject:
                    "Add a top-level `rules` object so Stylelint rule configuration stays explicit and reviewable.",
            },
            schema: [],
            type: "suggestion",
        },
        name: "require-stylelint-rules-object",
    });

export default requireStylelintRulesObjectRule;
