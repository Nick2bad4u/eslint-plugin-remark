/**
 * @packageDocumentation
 * Shared rule factory for disallowing top-level Stylelint config options that are better handled elsewhere.
 */
import type { Except } from "type-fest";

import {
    createFixToRemoveObjectProperty,
    getExportedStylelintConfigObject,
    getObjectPropertyByName,
    isExportDefaultDeclarationNode,
    isStylelintConfigFile,
} from "./stylelint-config-object.js";
import {
    createTypedRule,
    type RuleModuleWithDocs,
    toRuleListener,
} from "./typed-rule.js";

type ConfigOptionRuleDefinition = Readonly<
    Except<RuleModuleWithDocs<MessageIds, Options>, "create"> & {
        optionName: string;
    }
>;
type MessageIds = "disallowConfigOption";

type Options = readonly [];

/**
 * Create a rule that disallows one top-level Stylelint config option.
 *
 * @param definition - Static rule definition details.
 *
 * @returns Fully assembled rule module.
 */
export const createStylelintConfigDisallowedOptionRule = (
    definition: Readonly<ConfigOptionRuleDefinition>
): RuleModuleWithDocs<MessageIds, Options> => {
    const { optionName, ...ruleDefinition } = definition;

    return createTypedRule({
        ...ruleDefinition,
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

                    const existingProperty = getObjectPropertyByName(
                        configObject,
                        optionName
                    );

                    if (existingProperty === undefined) {
                        return;
                    }

                    context.report({
                        fix(fixer) {
                            return createFixToRemoveObjectProperty({
                                fixer,
                                objectExpression: configObject,
                                property: existingProperty,
                            });
                        },
                        messageId: "disallowConfigOption",
                        node: existingProperty,
                    });
                },
            });
        },
    }) satisfies RuleModuleWithDocs<MessageIds, Options>;
};
