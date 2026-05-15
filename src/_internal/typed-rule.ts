/**
 * @packageDocumentation
 * Shared rule creation helpers for eslint-plugin-stylelint-2.
 */
import type { TSESLint } from "@typescript-eslint/utils";
import type { Except, UnknownArray, UnknownRecord } from "type-fest";

import { isDefined, objectEntries } from "ts-extras";

import type { Stylelint2ConfigReference } from "./stylelint2-config-references.js";

import { createRuleDocsUrl } from "./rule-docs-url.js";

/** Small helper for rule context typing in local helpers. */
export type GenericRuleContext<
    MessageIds extends string,
    Options extends Readonly<UnknownArray>,
> = Readonly<TSESLint.RuleContext<MessageIds, Options>>;

/** CSS/JS-agnostic listener map used by this plugin's rules. */
export type GenericRuleListener = Readonly<
    Record<string, (node: unknown) => void>
>;

/**
 * Rule definition shape accepted by `createTypedRule`, including typed
 * `create(context, options)` access with merged default options.
 */
export type RuleDefinitionWithDocs<
    MessageIds extends string,
    Options extends Readonly<UnknownArray>,
> = Except<RuleModuleWithDocs<MessageIds, Options>, "create" | "meta"> & {
    create: (
        context: GenericRuleContext<MessageIds, Options>,
        options: Options
    ) => TSESLint.RuleListener;
    meta: RuleModuleWithDocs<MessageIds, Options>["meta"];
};

/** Rule module contract used by registry and plugin wiring. */
export type RuleModuleWithDocs<
    MessageIds extends string,
    Options extends Readonly<UnknownArray>,
> = TSESLint.RuleModule<MessageIds, Options> & {
    meta: TSESLint.RuleMetaData<MessageIds, Stylelint2RuleDocs, Options> & {
        deprecated: boolean;
        docs: Stylelint2RuleDocs;
    };
    name: string;
};

/** Plugin-specific metadata extensions for `meta.docs`. */
export type Stylelint2RuleDocs = Readonly<{
    configs: readonly Stylelint2ConfigReference[] | Stylelint2ConfigReference;
    description: string;
    frozen?: boolean;
    recommended: boolean;
    requiresTypeChecking: boolean;
    url: string;
}>;

const isReadonlyRecord = (value: unknown): value is Readonly<UnknownRecord> =>
    typeof value === "object" && value !== null && !Array.isArray(value);

const mergeOptionValue = (
    defaultValue: unknown,
    configuredValue: unknown
): unknown => {
    if (!isDefined(configuredValue)) {
        return defaultValue;
    }

    if (isReadonlyRecord(defaultValue) && isReadonlyRecord(configuredValue)) {
        const mergedValue: UnknownRecord = { ...defaultValue };

        for (const [propertyName, propertyValue] of objectEntries(
            configuredValue
        )) {
            mergedValue[propertyName] = mergeOptionValue(
                defaultValue[propertyName],
                propertyValue
            );
        }

        return mergedValue;
    }

    return configuredValue;
};

const mergeDefaultOptions = <Options extends Readonly<UnknownArray>>(
    defaultOptions: Options,
    configuredOptions: Readonly<UnknownArray>
): Options => {
    const mergedOptions: unknown[] = [];
    const maxLength = Math.max(defaultOptions.length, configuredOptions.length);

    for (let index = 0; index < maxLength; index += 1) {
        mergedOptions.push(
            mergeOptionValue(defaultOptions[index], configuredOptions[index])
        );
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- the generic `Options` tuple shape is preserved by index-wise merge but cannot be represented without an assertion.
    return mergedOptions as unknown as Options;
};

const getMergedRuleOptions = <Options extends Readonly<UnknownArray>>(
    ruleDefinition: Readonly<{
        meta: {
            defaultOptions?: Options;
        };
    }>,
    configuredOptions: Options
): Options => {
    const { defaultOptions } = ruleDefinition.meta;

    if (!isDefined(defaultOptions)) {
        return configuredOptions;
    }

    return mergeDefaultOptions(defaultOptions, configuredOptions);
};

/** Identity-preserving rule creator with canonical docs URL enforcement. */
export const createTypedRule = <
    MessageIds extends string,
    Options extends Readonly<UnknownArray>,
>(
    ruleDefinition: Readonly<RuleDefinitionWithDocs<MessageIds, Options>>
): RuleModuleWithDocs<MessageIds, Options> => {
    const canonicalDocsUrl = createRuleDocsUrl(ruleDefinition.name);

    if (ruleDefinition.meta.docs.url !== canonicalDocsUrl) {
        throw new TypeError(
            `Rule '${ruleDefinition.name}' must declare docs.url as '${canonicalDocsUrl}'.`
        );
    }

    return {
        ...ruleDefinition,
        create(context) {
            const mergedOptions = getMergedRuleOptions(
                ruleDefinition,
                context.options
            );

            return ruleDefinition.create(context, mergedOptions);
        },
        meta: {
            ...ruleDefinition.meta,
            docs: ruleDefinition.meta.docs,
        },
    };
};

/** Convert a generic string-keyed listener map into an ESLint rule listener. */
export const toRuleListener = (
    listener: GenericRuleListener
): TSESLint.RuleListener => listener;

/** Create a single range replacement fixer for a Stylelint edit. */
export const replaceTextRange = (
    fixer: TSESLint.RuleFixer,
    range: readonly [number, number],
    text: string
): TSESLint.RuleFix => fixer.replaceTextRange([...range], text);
