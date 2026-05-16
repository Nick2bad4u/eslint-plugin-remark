/**
 * @packageDocumentation
 * Rule factory helpers for validating package-backed Remark option entries.
 */
import type { Except } from "type-fest";

import { isDefined, isEmpty, setHas } from "ts-extras";

import {
    getExportedRemarkConfigObject,
    getObjectPropertyByName,
    isExportDefaultDeclarationNode,
    isRemarkConfigFile,
} from "./remark-config-object.js";
import { getRemarkPluginSpecifierReferences } from "./remark-config-plugin-specifiers.js";
import { isRelativeSpecifier } from "./remark-config-string-array-option.js";
import {
    getDependencyNamesForFile,
    getPackageNameFromSpecifier,
} from "./remark-package-dependencies.js";
import {
    createTypedRule,
    type RuleModuleWithDocs,
    toRuleListener,
} from "./typed-rule.js";

type ConfigOptionRuleDefinition = Readonly<
    Except<RuleModuleWithDocs<"requireInstalledPackage", Options>, "create"> & {
        optionName: "plugins";
    }
>;

type Options = readonly [];

/**
 * Create a rule that requires package-backed specifiers in one top-level Remark
 * string-array option to be present in workspace dependencies.
 */
export const createRemarkConfigRequireInstalledPackageOptionRule = (
    definition: Readonly<ConfigOptionRuleDefinition>
): RuleModuleWithDocs<"requireInstalledPackage", Options> => {
    const { optionName, ...ruleDefinition } = definition;

    return createTypedRule({
        ...ruleDefinition,
        create(context) {
            if (!isRemarkConfigFile(context.physicalFilename)) {
                return {};
            }

            return toRuleListener({
                ExportDefaultDeclaration(node: unknown) {
                    if (!isExportDefaultDeclarationNode(node)) {
                        return;
                    }

                    const exportDefaultNode = node;
                    const configObject = getExportedRemarkConfigObject(
                        exportDefaultNode.declaration
                    );

                    if (configObject === undefined) {
                        return;
                    }

                    const optionProperty = getObjectPropertyByName(
                        configObject,
                        optionName
                    );

                    if (optionProperty === undefined) {
                        return;
                    }

                    const pluginSpecifierReferences =
                        getRemarkPluginSpecifierReferences({
                            configObject,
                            pluginsProperty: optionProperty,
                        });

                    if (isEmpty(pluginSpecifierReferences)) {
                        return;
                    }

                    const dependencyNames = getDependencyNamesForFile(
                        context.physicalFilename,
                        context.cwd
                    );

                    if (!isDefined(dependencyNames)) {
                        return;
                    }

                    for (const {
                        literal: stringLiteral,
                    } of pluginSpecifierReferences) {
                        const specifier = stringLiteral.value.trim();

                        if (
                            specifier.length === 0 ||
                            isRelativeSpecifier(specifier)
                        ) {
                            continue;
                        }

                        const packageName =
                            getPackageNameFromSpecifier(specifier);

                        if (
                            !isDefined(packageName) ||
                            setHas(dependencyNames, packageName)
                        ) {
                            continue;
                        }

                        context.report({
                            data: {
                                packageName,
                            },
                            messageId: "requireInstalledPackage",
                            node: stringLiteral,
                        });
                    }
                },
            });
        },
    }) satisfies RuleModuleWithDocs<"requireInstalledPackage", Options>;
};
