import type { TSESTree } from "@typescript-eslint/utils";

import { AST_NODE_TYPES } from "@typescript-eslint/utils";
/**
 * @packageDocumentation
 * Encourage `defineConfig()` for authored Stylelint config modules.
 */
import path from "node:path";

import { isExportDefaultDeclarationNode } from "../_internal/stylelint-config-object.js";
import {
    createTypedRule,
    type RuleModuleWithDocs,
    toRuleListener,
} from "../_internal/typed-rule.js";

type MessageIds = "preferDefineConfig";
type Options = readonly [];

const importSource = "stylelint-define-config" as const;
const defineConfigImport = `import { defineConfig } from "${importSource}";\n`;
const configBaseNamePattern =
    /^(?:stylelint\.config|\.stylelintrc)\.(?:[cm]?js|[cm]?ts)$/v;

const isConfigFile = (filename: string): boolean =>
    configBaseNamePattern.test(path.basename(filename));

const hasDefineConfigImport = (body: readonly TSESTree.Node[]): boolean =>
    body.some(
        (statement) =>
            statement.type === AST_NODE_TYPES.ImportDeclaration &&
            statement.source.value === importSource &&
            statement.specifiers.some(
                (specifier) =>
                    specifier.type === AST_NODE_TYPES.ImportSpecifier &&
                    specifier.imported.type === AST_NODE_TYPES.Identifier &&
                    specifier.imported.name === "defineConfig"
            )
    );

const getImportInsertionOffset = (body: readonly TSESTree.Node[]): number => {
    for (let index = body.length - 1; index >= 0; index -= 1) {
        const statement = body[index];

        if (statement?.type === AST_NODE_TYPES.ImportDeclaration) {
            return statement.range[1];
        }
    }

    return 0;
};

/** Rule module that requires `defineConfig()` usage in Stylelint config files. */
const preferStylelintDefineConfigRule: RuleModuleWithDocs<MessageIds, Options> =
    createTypedRule({
        create(context) {
            const sourceCode = context.sourceCode;
            const isCurrentFileAConfig = isConfigFile(context.physicalFilename);

            return toRuleListener({
                ExportDefaultDeclaration(node: unknown) {
                    if (!isCurrentFileAConfig) {
                        return;
                    }

                    if (!isExportDefaultDeclarationNode(node)) {
                        return;
                    }

                    const exportDefaultNode = node;

                    if (
                        exportDefaultNode.declaration.type !==
                        AST_NODE_TYPES.ObjectExpression
                    ) {
                        return;
                    }

                    context.report({
                        fix(fixer) {
                            const fixes = [
                                fixer.replaceText(
                                    exportDefaultNode.declaration,
                                    `defineConfig(${sourceCode.getText(exportDefaultNode.declaration)})`
                                ),
                            ];

                            if (!hasDefineConfigImport(sourceCode.ast.body)) {
                                const insertionOffset =
                                    getImportInsertionOffset(
                                        sourceCode.ast.body
                                    );

                                fixes.unshift(
                                    fixer.insertTextBeforeRange(
                                        [insertionOffset, insertionOffset],
                                        insertionOffset === 0
                                            ? `${defineConfigImport}\n`
                                            : `\n${defineConfigImport}`
                                    )
                                );
                            }

                            return fixes;
                        },
                        messageId: "preferDefineConfig",
                        node: exportDefaultNode.declaration,
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
                    "require wrapping exported Stylelint config objects in `defineConfig()` from `stylelint-define-config`.",
                recommended: true,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/prefer-stylelint-define-config",
            },
            fixable: "code",
            messages: {
                preferDefineConfig:
                    "Wrap the exported Stylelint config object in `defineConfig(...)` so editors and TypeScript can infer the config shape.",
            },
            schema: [],
            type: "suggestion",
        },
        name: "prefer-stylelint-define-config",
    }) satisfies RuleModuleWithDocs<MessageIds, Options>;

export default preferStylelintDefineConfigRule;
