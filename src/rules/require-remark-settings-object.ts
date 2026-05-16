import { AST_NODE_TYPES } from "@typescript-eslint/utils";

/**
 * @packageDocumentation
 * Require object form for Remark top-level settings option.
 */
import type { RuleModuleWithDocs } from "../_internal/typed-rule.js";

import {
    getExportedRemarkConfigObject,
    getObjectPropertyByName,
    isExportDefaultDeclarationNode,
    isRemarkConfigFile,
} from "../_internal/remark-config-object.js";
import { createTypedRule, toRuleListener } from "../_internal/typed-rule.js";

/** Rule module that requires top-level Remark `settings` to be an object. */
const requireRemarkSettingsObjectRule: RuleModuleWithDocs<
    "requireSettingsObject",
    readonly []
> = createTypedRule({
    create(context) {
        if (!isRemarkConfigFile(context.physicalFilename)) {
            return {};
        }

        return toRuleListener({
            ExportDefaultDeclaration(node: unknown) {
                if (!isExportDefaultDeclarationNode(node)) {
                    return;
                }

                const configObject = getExportedRemarkConfigObject(
                    node.declaration
                );

                if (configObject === undefined) {
                    return;
                }

                const settingsProperty = getObjectPropertyByName(
                    configObject,
                    "settings"
                );

                if (
                    settingsProperty === undefined ||
                    settingsProperty.value.type ===
                        AST_NODE_TYPES.ObjectExpression
                ) {
                    return;
                }

                context.report({
                    messageId: "requireSettingsObject",
                    node: settingsProperty.value,
                });
            },
        });
    },
    meta: {
        deprecated: false,
        docs: {
            configs: [
                "remark.configs.recommended",
                "remark.configs.configuration",
                "remark.configs.all",
            ],
            description:
                "require object form for top-level Remark `settings` declarations.",
            frozen: false,
            recommended: true,
            requiresTypeChecking: false,
            url: "https://nick2bad4u.github.io/eslint-plugin-remark/docs/rules/require-remark-settings-object",
        },
        messages: {
            requireSettingsObject:
                "Use an object for top-level `settings`; Remark shares settings with parsers and compilers as keyed options.",
        },
        schema: [],
        type: "problem",
    },
    name: "require-remark-settings-object",
});

export default requireRemarkSettingsObjectRule;
