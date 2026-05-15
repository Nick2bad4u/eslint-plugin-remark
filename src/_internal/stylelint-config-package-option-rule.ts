/**
 * @packageDocumentation
 * Rule factory helpers for validating package-backed Stylelint option entries.
 */
import type { Except } from "type-fest";

import { isDefined, setHas } from "ts-extras";

import {
    getExportedStylelintConfigObject,
    getObjectPropertyByName,
    isExportDefaultDeclarationNode,
    isStylelintConfigFile,
} from "./stylelint-config-object.js";
import {
    getStringArrayOptionValue,
    isRelativeSpecifier,
} from "./stylelint-config-string-array-option.js";
import {
    getDependencyNamesForFile,
    getPackageNameFromSpecifier,
} from "./stylelint-package-dependencies.js";
import {
    createTypedRule,
    type RuleModuleWithDocs,
    toRuleListener,
} from "./typed-rule.js";

type ConfigOptionRuleDefinition = Readonly<
    Except<RuleModuleWithDocs<"requireInstalledPackage", Options>, "create"> & {
        optionName: "extends" | "plugins";
    }
>;

type Options = readonly [];

/**
 * Create a rule that requires package-backed specifiers in one top-level
 * Stylelint string-array option to be present in workspace dependencies.
 */
export const createStylelintConfigRequireInstalledPackageOptionRule = (
    definition: Readonly<ConfigOptionRuleDefinition>
): RuleModuleWithDocs<"requireInstalledPackage", Options> => {
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

                    const optionProperty = getObjectPropertyByName(
                        configObject,
                        optionName
                    );

                    if (optionProperty === undefined) {
                        return;
                    }

                    const optionValue =
                        getStringArrayOptionValue(optionProperty);

                    if (!isDefined(optionValue)) {
                        return;
                    }

                    const dependencyNames = getDependencyNamesForFile(
                        context.physicalFilename,
                        context.cwd
                    );

                    if (!isDefined(dependencyNames)) {
                        return;
                    }

                    const stringLiterals =
                        optionValue.kind === "string"
                            ? [optionValue.stringLiteral]
                            : optionValue.stringLiterals;

                    for (const stringLiteral of stringLiterals) {
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
