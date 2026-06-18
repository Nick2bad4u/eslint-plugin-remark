import type { TSESTree } from "@typescript-eslint/utils";
import type { ArrayValues } from "type-fest";

import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import { isEmpty } from "ts-extras";

/**
 * @packageDocumentation
 * Disallow empty no-op values in Remark config objects.
 */
import type { RuleModuleWithDocs } from "../_internal/typed-rule.js";

import {
    createFixToRemoveObjectProperty,
    getExportedRemarkConfigObject,
    getObjectPropertyByName,
    isExportDefaultDeclarationNode,
    isRemarkConfigFile,
} from "../_internal/remark-config-object.js";
import { createTypedRule, toRuleListener } from "../_internal/typed-rule.js";

const emptyConfigProperties = ["plugins", "settings"] as const;

const isEmptyRemarkConfigValue = (
    propertyName: ArrayValues<typeof emptyConfigProperties>,
    propertyValue: Readonly<TSESTree.Property["value"]>
): boolean => {
    if (propertyName === "plugins") {
        return (
            propertyValue.type === AST_NODE_TYPES.ArrayExpression &&
            isEmpty(propertyValue.elements)
        );
    }

    return (
        propertyValue.type === AST_NODE_TYPES.ObjectExpression &&
        isEmpty(propertyValue.properties)
    );
};

/** Rule module that disallows empty no-op Remark config values. */
const disallowEmptyRemarkConfigValuesRule: RuleModuleWithDocs<
    "disallowEmptyConfigValue",
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

                for (const propertyName of emptyConfigProperties) {
                    const configProperty = getObjectPropertyByName(
                        configObject,
                        propertyName
                    );

                    if (
                        configProperty === undefined ||
                        !isEmptyRemarkConfigValue(
                            propertyName,
                            configProperty.value
                        )
                    ) {
                        continue;
                    }

                    context.report({
                        data: {
                            propertyName,
                        },
                        fix: (fixer) =>
                            createFixToRemoveObjectProperty({
                                fixer,
                                objectExpression: configObject,
                                property: configProperty,
                            }),
                        messageId: "disallowEmptyConfigValue",
                        node: configProperty.value,
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
                "disallow empty no-op values in top-level Remark config declarations.",
            frozen: false,
            recommended: true,
            requiresTypeChecking: false,
            url: "https://nick2bad4u.github.io/eslint-plugin-remark/docs/rules/disallow-empty-remark-config-values",
        },
        fixable: "code",
        messages: {
            disallowEmptyConfigValue:
                "Remove empty top-level `{{propertyName}}`; it does not change Remark behavior.",
        },
        schema: [],
        type: "suggestion",
    },
    name: "disallow-empty-remark-config-values",
});

export default disallowEmptyRemarkConfigValuesRule;
