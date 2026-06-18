/**
 * @packageDocumentation
 * Shared preset/config reference constants for eslint-plugin-remark.
 */

import type { ArrayValues } from "type-fest";

import { objectHasOwn } from "ts-extras";

/** Canonical flat-config preset keys exposed through `plugin.configs`. */
export const remarkConfigNames = [
    "all",
    "configs",
    "configuration",
    "markdown",
    "recommended",
    "remarkOnly",
] as const;

/** Shared metadata used by docs, README rendering, and config tests. */
export type RemarkConfigMetadata = Readonly<{
    icon: string;
    presetName: `remark:${RemarkConfigName}`;
    readmeOrder: number;
}>;

/** Canonical flat-config preset key type exposed through `plugin.configs`. */
export type RemarkConfigName = ArrayValues<typeof remarkConfigNames>;

/** Canonical metadata for each exported preset. */
export const remarkConfigMetadataByName: Readonly<
    Record<RemarkConfigName, RemarkConfigMetadata>
> = {
    all: {
        icon: "🟣",
        presetName: "remark:all",
        readmeOrder: 4,
    },
    configs: {
        icon: "🔧",
        presetName: "remark:configs",
        readmeOrder: 6,
    },
    configuration: {
        icon: "🔧",
        presetName: "remark:configuration",
        readmeOrder: 3,
    },
    markdown: {
        icon: "📝",
        presetName: "remark:markdown",
        readmeOrder: 5,
    },
    recommended: {
        icon: "🟡",
        presetName: "remark:recommended",
        readmeOrder: 1,
    },
    remarkOnly: {
        icon: "📝",
        presetName: "remark:remarkOnly",
        readmeOrder: 2,
    },
};

/** Stable README legend/rendering order for preset icons. */
export const remarkConfigNamesByReadmeOrder: readonly RemarkConfigName[] = [
    "recommended",
    "remarkOnly",
    "configuration",
    "all",
];

/** Fully-qualified preset references used in rule metadata. */
export const remarkConfigReferenceToName: Readonly<{
    "remark.configs.all": "all";
    "remark.configs.configs": "configuration";
    "remark.configs.configuration": "configuration";
    "remark.configs.markdown": "remarkOnly";
    "remark.configs.recommended": "recommended";
    "remark.configs.remarkOnly": "remarkOnly";
}> = {
    "remark.configs.all": "all",
    "remark.configs.configs": "configuration",
    "remark.configs.configuration": "configuration",
    "remark.configs.markdown": "remarkOnly",
    "remark.configs.recommended": "recommended",
    "remark.configs.remarkOnly": "remarkOnly",
};

/** Fully-qualified preset reference type accepted in docs metadata. */
export type RemarkConfigReference = keyof typeof remarkConfigReferenceToName;

/** Check whether a string is a supported preset reference. */
export const isRemarkConfigReference = (
    value: string
): value is RemarkConfigReference =>
    objectHasOwn(remarkConfigReferenceToName, value);
