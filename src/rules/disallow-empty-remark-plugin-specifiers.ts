/**
 * @packageDocumentation
 * Disallow empty string specifiers in Remark top-level plugins option.
 */
import type { RuleModuleWithDocs } from "../_internal/typed-rule.js";

import {
    getExportedRemarkConfigObject,
    getObjectPropertyByName,
    isExportDefaultDeclarationNode,
    isRemarkConfigFile,
} from "../_internal/remark-config-object.js";
import {
    createFixToRemovePluginSpecifier,
    getRemarkPluginSpecifierReferences,
} from "../_internal/remark-config-plugin-specifiers.js";
import { createTypedRule, toRuleListener } from "../_internal/typed-rule.js";

/** Rule module that disallows empty top-level Remark `plugins` specifiers. */
const disallowEmptyRemarkPluginSpecifiersRule: RuleModuleWithDocs<
    "disallowEmptySpecifier",
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

                const pluginsProperty = getObjectPropertyByName(
                    configObject,
                    "plugins"
                );

                if (pluginsProperty === undefined) {
                    return;
                }

                const specifierReferences = getRemarkPluginSpecifierReferences({
                    configObject,
                    pluginsProperty,
                });

                for (const specifierReference of specifierReferences) {
                    if (specifierReference.literal.value.trim().length > 0) {
                        continue;
                    }

                    context.report({
                        fix: (fixer) =>
                            createFixToRemovePluginSpecifier({
                                fixer,
                                removalTarget: specifierReference.removalTarget,
                            }),
                        messageId: "disallowEmptySpecifier",
                        node: specifierReference.literal,
                    });
                }
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
                "disallow empty string specifiers in top-level Remark `plugins` declarations.",
            frozen: false,
            recommended: true,
            requiresTypeChecking: false,
            url: "https://nick2bad4u.github.io/eslint-plugin-remark/docs/rules/disallow-empty-remark-plugin-specifiers",
        },
        fixable: "code",
        messages: {
            disallowEmptySpecifier:
                "Remove empty `plugins` specifiers because Remark cannot load a blank plugin package or tuple entry.",
        },
        schema: [],
        type: "problem",
    },
    name: "disallow-empty-remark-plugin-specifiers",
});

export default disallowEmptyRemarkPluginSpecifiersRule;
