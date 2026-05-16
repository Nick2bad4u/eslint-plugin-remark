import type { TSESTree } from "@typescript-eslint/utils";

/**
 * @packageDocumentation
 * Disallow invalid tuple entries in Remark top-level plugins arrays.
 */
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import { arrayFirst, isPresent } from "ts-extras";

import type { RuleModuleWithDocs } from "../_internal/typed-rule.js";

import {
    getExportedRemarkConfigObject,
    getObjectPropertyByName,
    isExportDefaultDeclarationNode,
    isRemarkConfigFile,
} from "../_internal/remark-config-object.js";
import { getRemarkPluginArrayEntries } from "../_internal/remark-config-plugin-specifiers.js";
import { createTypedRule, toRuleListener } from "../_internal/typed-rule.js";

const isClearlyInvalidTuplePlugin = (node: Readonly<TSESTree.Node>): boolean =>
    node.type === AST_NODE_TYPES.ArrayExpression ||
    node.type === AST_NODE_TYPES.ObjectExpression ||
    (node.type === AST_NODE_TYPES.Literal && typeof node.value !== "string");

/** Rule module that disallows invalid top-level Remark plugin tuples. */
const disallowInvalidRemarkPluginTuplesRule: RuleModuleWithDocs<
    "disallowInvalidTuple",
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

                const pluginEntries =
                    getRemarkPluginArrayEntries(pluginsProperty);

                for (const pluginEntry of pluginEntries) {
                    const { element } = pluginEntry;

                    if (element.type !== AST_NODE_TYPES.ArrayExpression) {
                        continue;
                    }

                    const firstTupleElement = arrayFirst(element.elements);

                    if (!isPresent(firstTupleElement)) {
                        context.report({
                            messageId: "disallowInvalidTuple",
                            node: element,
                        });
                        continue;
                    }

                    if (
                        firstTupleElement.type ===
                            AST_NODE_TYPES.SpreadElement ||
                        isClearlyInvalidTuplePlugin(firstTupleElement)
                    ) {
                        context.report({
                            messageId: "disallowInvalidTuple",
                            node: firstTupleElement,
                        });
                    }
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
                "disallow invalid tuple entries in top-level Remark `plugins` arrays.",
            frozen: false,
            recommended: true,
            requiresTypeChecking: false,
            url: "https://nick2bad4u.github.io/eslint-plugin-remark/docs/rules/disallow-invalid-remark-plugin-tuples",
        },
        messages: {
            disallowInvalidTuple:
                "Use a plugin function or string package specifier as the first item in each Remark plugin tuple.",
        },
        schema: [],
        type: "problem",
    },
    name: "disallow-invalid-remark-plugin-tuples",
});

export default disallowInvalidRemarkPluginTuplesRule;
