import { isDefined, setHas } from "ts-extras";

/**
 * @packageDocumentation
 * Disallow unknown top-level properties in Remark config objects.
 */
import type { RuleModuleWithDocs } from "../_internal/typed-rule.js";

import {
    getExportedRemarkConfigObject,
    getObjectProperties,
    getStaticPropertyName,
    isExportDefaultDeclarationNode,
    isRemarkConfigFile,
} from "../_internal/remark-config-object.js";
import { createTypedRule, toRuleListener } from "../_internal/typed-rule.js";

const allowedRemarkConfigPropertyNames: ReadonlySet<string> = new Set([
    "plugins",
    "settings",
]);
const renameTargetsByUnknownPropertyName: ReadonlyMap<string, string> = new Map(
    [
        ["plugin", "plugins"],
        ["setting", "settings"],
    ]
);

const toPropertyKeyReplacementText = (
    propertyName: string,
    replacementName: string
): string =>
    /^[$A-Z_a-z][\w$]*$/v.test(propertyName)
        ? replacementName
        : JSON.stringify(replacementName);

/** Rule module that disallows unknown top-level Remark config properties. */
const disallowUnknownRemarkConfigPropertiesRule: RuleModuleWithDocs<
    "disallowUnknownProperty",
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

                const properties = getObjectProperties(configObject);
                const propertyNames = new Set(
                    properties
                        .map((property) => getStaticPropertyName(property))
                        .filter(isDefined)
                );

                for (const property of properties) {
                    const propertyName = getStaticPropertyName(property);

                    if (
                        !isDefined(propertyName) ||
                        setHas(allowedRemarkConfigPropertyNames, propertyName)
                    ) {
                        continue;
                    }

                    const renameTarget =
                        renameTargetsByUnknownPropertyName.get(propertyName);
                    const canRename =
                        isDefined(renameTarget) &&
                        !setHas(propertyNames, renameTarget);

                    const reportDescriptor = {
                        data: {
                            propertyName,
                        },
                        messageId: "disallowUnknownProperty",
                        node: property.key,
                    } as const;

                    if (!canRename) {
                        context.report(reportDescriptor);
                        continue;
                    }

                    context.report({
                        ...reportDescriptor,
                        fix: (fixer) =>
                            fixer.replaceText(
                                property.key,
                                toPropertyKeyReplacementText(
                                    propertyName,
                                    renameTarget
                                )
                            ),
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
                "disallow unknown top-level properties in Remark config objects.",
            frozen: false,
            recommended: true,
            requiresTypeChecking: false,
            url: "https://nick2bad4u.github.io/eslint-plugin-remark/docs/rules/disallow-unknown-remark-config-properties",
        },
        fixable: "code",
        messages: {
            disallowUnknownProperty:
                "Remove unknown top-level Remark config property `{{propertyName}}`; Remark configs support `plugins` and `settings`.",
        },
        schema: [],
        type: "problem",
    },
    name: "disallow-unknown-remark-config-properties",
});

export default disallowUnknownRemarkConfigPropertiesRule;
