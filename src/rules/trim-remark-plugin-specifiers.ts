/**
 * @packageDocumentation
 * Require trimmed string specifiers in Remark top-level plugins option.
 */
import type { TSESTree } from "@typescript-eslint/utils";

import { arrayFirst } from "ts-extras";

import type { RuleModuleWithDocs } from "../_internal/typed-rule.js";

import {
    getExportedRemarkConfigObject,
    getObjectPropertyByName,
    isExportDefaultDeclarationNode,
    isRemarkConfigFile,
} from "../_internal/remark-config-object.js";
import { getRemarkPluginSpecifierReferences } from "../_internal/remark-config-plugin-specifiers.js";
import { createTypedRule, toRuleListener } from "../_internal/typed-rule.js";

const backslash = String.fromCodePoint(92);
const carriageReturn = String.fromCodePoint(13);
const lineFeed = String.fromCodePoint(10);

const escapeStringValue = (value: string, quote: string): string =>
    value
        .replaceAll(backslash, `${backslash}${backslash}`)
        .replaceAll(quote, `${backslash}${quote}`)
        .replaceAll(lineFeed, `${backslash}n`)
        .replaceAll(carriageReturn, `${backslash}r`);

const toTrimmedLiteralText = (
    sourceCodeText: string,
    literal: Readonly<TSESTree.StringLiteral>,
    trimmedValue: string
): string => {
    const rawText = sourceCodeText.slice(
        arrayFirst(literal.range),
        literal.range[1]
    );
    const quote = rawText.slice(0, 1);

    if ((quote === "'" || quote === '"') && rawText.endsWith(quote)) {
        return `${quote}${escapeStringValue(trimmedValue, quote)}${quote}`;
    }

    return JSON.stringify(trimmedValue);
};

/** Rule module that trims top-level Remark `plugins` specifiers. */
const trimRemarkPluginSpecifiersRule: RuleModuleWithDocs<
    "trimSpecifier",
    readonly []
> = createTypedRule({
    create(context) {
        if (!isRemarkConfigFile(context.physicalFilename)) {
            return {};
        }

        const sourceCode = context.sourceCode;

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
                    const originalValue = specifierReference.literal.value;
                    const trimmedValue = originalValue.trim();

                    if (
                        trimmedValue.length === 0 ||
                        trimmedValue === originalValue
                    ) {
                        continue;
                    }

                    context.report({
                        fix: (fixer) =>
                            fixer.replaceText(
                                specifierReference.literal,
                                toTrimmedLiteralText(
                                    sourceCode.text,
                                    specifierReference.literal,
                                    trimmedValue
                                )
                            ),
                        messageId: "trimSpecifier",
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
                "require trimmed string specifiers in top-level Remark `plugins` declarations.",
            frozen: false,
            recommended: true,
            requiresTypeChecking: false,
            url: "https://nick2bad4u.github.io/eslint-plugin-remark/docs/rules/trim-remark-plugin-specifiers",
        },
        fixable: "code",
        messages: {
            trimSpecifier:
                "Trim leading and trailing whitespace from this `plugins` specifier so Remark resolves the intended package.",
        },
        schema: [],
        type: "suggestion",
    },
    name: "trim-remark-plugin-specifiers",
});

export default trimRemarkPluginSpecifiersRule;
