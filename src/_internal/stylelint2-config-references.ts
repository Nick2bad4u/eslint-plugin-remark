/**
 * @packageDocumentation
 * Shared preset/config reference constants for eslint-plugin-stylelint-2.
 */

import { objectHasOwn } from "ts-extras";

/** Canonical flat-config preset keys exposed through `plugin.configs`. */
export const stylelint2ConfigNames = [
    "all",
    "configs",
    "configuration",
    "recommended",
    "stylelintOnly",
    "stylesheets",
] as const;

/** Shared metadata used by docs, README rendering, and config tests. */
export type Stylelint2ConfigMetadata = Readonly<{
    icon: string;
    presetName: `stylelint2:${Stylelint2ConfigName}`;
    readmeOrder: number;
}>;

/** Canonical flat-config preset key type exposed through `plugin.configs`. */
export type Stylelint2ConfigName = (typeof stylelint2ConfigNames)[number];

/** Canonical metadata for each exported preset. */
export const stylelint2ConfigMetadataByName: Readonly<
    Record<Stylelint2ConfigName, Stylelint2ConfigMetadata>
> = {
    all: {
        icon: "🟣",
        presetName: "stylelint2:all",
        readmeOrder: 4,
    },
    configs: {
        icon: "🔧",
        presetName: "stylelint2:configs",
        readmeOrder: 6,
    },
    configuration: {
        icon: "🔧",
        presetName: "stylelint2:configuration",
        readmeOrder: 3,
    },
    recommended: {
        icon: "🟡",
        presetName: "stylelint2:recommended",
        readmeOrder: 1,
    },
    stylelintOnly: {
        icon: "🎨",
        presetName: "stylelint2:stylelintOnly",
        readmeOrder: 2,
    },
    stylesheets: {
        icon: "🎨",
        presetName: "stylelint2:stylesheets",
        readmeOrder: 5,
    },
};

/** Stable README legend/rendering order for preset icons. */
export const stylelint2ConfigNamesByReadmeOrder: readonly Stylelint2ConfigName[] =
    [
        "recommended",
        "stylelintOnly",
        "configuration",
        "all",
    ];

/** Fully-qualified preset references used in rule metadata. */
export const stylelint2ConfigReferenceToName: Readonly<{
    "stylelint2.configs.all": "all";
    "stylelint2.configs.configs": "configuration";
    "stylelint2.configs.configuration": "configuration";
    "stylelint2.configs.recommended": "recommended";
    "stylelint2.configs.stylelintOnly": "stylelintOnly";
    "stylelint2.configs.stylesheets": "stylelintOnly";
}> = {
    "stylelint2.configs.all": "all",
    "stylelint2.configs.configs": "configuration",
    "stylelint2.configs.configuration": "configuration",
    "stylelint2.configs.recommended": "recommended",
    "stylelint2.configs.stylelintOnly": "stylelintOnly",
    "stylelint2.configs.stylesheets": "stylelintOnly",
};

/** Fully-qualified preset reference type accepted in docs metadata. */
export type Stylelint2ConfigReference =
    keyof typeof stylelint2ConfigReferenceToName;

/** Check whether a string is a supported preset reference. */
export const isStylelint2ConfigReference = (
    value: string
): value is Stylelint2ConfigReference =>
    objectHasOwn(stylelint2ConfigReferenceToName, value);
