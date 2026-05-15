import type { TSESTree } from "@typescript-eslint/utils";

/**
 * @packageDocumentation
 * Require every Stylelint override entry to include effective configuration content.
 */
import { AST_NODE_TYPES } from "@typescript-eslint/utils";

import type { RuleModuleWithDocs } from "../_internal/typed-rule.js";

import {
    getExportedStylelintConfigObject,
    isExportDefaultDeclarationNode,
    isPropertyNamed,
    isStylelintConfigFile,
} from "../_internal/stylelint-config-object.js";
import { createTypedRule, toRuleListener } from "../_internal/typed-rule.js";

type MessageIds = "requireOverrideConfiguration";
type Options = readonly [];

const isPropertyExpressionValue = (
    value: Readonly<TSESTree.Property["value"]>
): value is TSESTree.Expression =>
    value.type !== AST_NODE_TYPES.ArrayPattern &&
    value.type !== AST_NODE_TYPES.AssignmentPattern &&
    value.type !== AST_NODE_TYPES.ObjectPattern &&
    value.type !== AST_NODE_TYPES.TSEmptyBodyFunctionExpression;

const getOverrideEntries = (
    configObject: Readonly<TSESTree.ObjectExpression>
): readonly TSESTree.ObjectExpression[] => {
    for (const propertyNode of configObject.properties) {
        if (
            propertyNode.type !== AST_NODE_TYPES.Property ||
            !isPropertyNamed(propertyNode, "overrides")
        ) {
            continue;
        }

        const propertyValue = propertyNode.value;

        if (!isPropertyExpressionValue(propertyValue)) {
            return [];
        }

        if (propertyValue.type !== AST_NODE_TYPES.ArrayExpression) {
            return [];
        }

        const overrideEntries: TSESTree.ObjectExpression[] = [];

        for (const entry of propertyValue.elements) {
            if (entry?.type !== AST_NODE_TYPES.ObjectExpression) {
                continue;
            }

            overrideEntries.push(entry);
        }

        return overrideEntries;
    }

    return [];
};

const hasSpreadProperty = (
    overrideEntry: Readonly<TSESTree.ObjectExpression>
): boolean =>
    overrideEntry.properties.some(
        (propertyNode) => propertyNode.type === AST_NODE_TYPES.SpreadElement
    );

const hasEffectiveConfigurationProperty = (
    overrideEntry: Readonly<TSESTree.ObjectExpression>
): boolean => {
    for (const propertyNode of overrideEntry.properties) {
        if (propertyNode.type !== AST_NODE_TYPES.Property) {
            continue;
        }

        if (
            isPropertyNamed(propertyNode, "files") ||
            isPropertyNamed(propertyNode, "name")
        ) {
            continue;
        }

        return true;
    }

    return false;
};

/** Rule module that requires meaningful configuration content in overrides. */
const requireStylelintOverridesConfigurationRule: RuleModuleWithDocs<
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

                const overrideEntries = getOverrideEntries(configObject);

                for (const overrideEntry of overrideEntries) {
                    if (hasSpreadProperty(overrideEntry)) {
                        continue;
                    }

                    if (hasEffectiveConfigurationProperty(overrideEntry)) {
                        continue;
                    }

                    context.report({
                        messageId: "requireOverrideConfiguration",
                        node: overrideEntry,
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
                "require each Stylelint `overrides` entry to include at least one effective configuration property beyond `files` and optional `name`.",
            frozen: false,
            recommended: true,
            requiresTypeChecking: false,
            url: "https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/require-stylelint-overrides-configuration",
        },
        messages: {
            requireOverrideConfiguration:
                "Each Stylelint `overrides` entry should include at least one configuration property (for example `rules`, `customSyntax`, `extends`, or `plugins`) in addition to `files`.",
        },
        schema: [],
        type: "suggestion",
    },
    name: "require-stylelint-overrides-configuration",
});

export default requireStylelintOverridesConfigurationRule;
