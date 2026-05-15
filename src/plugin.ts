/**
 * @packageDocumentation
 * Public plugin entrypoint for eslint-plugin-remark exports and preset wiring.
 */
import type { ESLint, Linter } from "eslint";

import tsParser from "@typescript-eslint/parser";

// eslint-disable-next-line import-x/extensions -- JSON import assertions require the explicit .json extension.
import packageJson from "../package.json" with { type: "json" };
import { markdownParser } from "./_internal/markdown-parser.js";
import {
    type RemarkConfigName as InternalRemarkConfigName,
    remarkConfigMetadataByName,
} from "./_internal/remark-config-references.js";
import { remarkRules } from "./_internal/rules-registry.js";

/** Public preset key names supported by eslint-plugin-remark. */
export type RemarkConfigName = InternalRemarkConfigName;

/** Package name exported in runtime plugin metadata. */
const pluginName = "eslint-plugin-remark" as const;
/** ESLint namespace used for qualified rule ids. */
const pluginNamespace = "remark" as const;
/** Default Markdown files covered by the Remark bridge preset. */
const markdownFiles = ["**/*.{md,mdx,markdown}"] as const;
/** Remark config file globs covered by the config preset. */
const configFiles = [
    "**/.remarkrc.{js,mjs,cjs,ts,mts,cts}",
    "**/remark.config.{js,mjs,cjs,ts,mts,cts}",
] as const;

/** Public preset config value shape. */
export type RemarkConfig = Linter.Config | readonly Linter.Config[];
/** Public preset registry shape. */
export type RemarkConfigs = Record<RemarkConfigName, RemarkConfig>;
/** Qualified rule ID supported by eslint-plugin-remark. */
export type RemarkRuleId = `${typeof pluginNamespace}/${RemarkRuleName}`;
/** Unqualified rule name supported by eslint-plugin-remark. */
export type RemarkRuleName = keyof typeof remarkRules;
type FlatConfigRules = NonNullable<Linter.Config["rules"]>;
/** ESLint-compatible rule map view of the strongly typed internal rule record. */
// eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- eslint's RuleDefinition options use mutable arrays while plugin rule metadata is readonly.
const eslintPluginRules = remarkRules as NonNullable<ESLint.Plugin["rules"]> &
    typeof remarkRules;

const version =
    typeof packageJson.version === "string" ? packageJson.version : "0.0.0";

/** Fully assembled runtime plugin object exported by this package. */
const remarkPlugin: ESLint.Plugin & {
    configs: RemarkConfigs;
    meta: {
        name: string;
        namespace: string;
        version: string;
    };
    rules: typeof eslintPluginRules;
} = {
    configs: {
        all: [],
        configs: {},
        configuration: {},
        markdown: {},
        recommended: [],
        remarkOnly: {},
    },
    meta: {
        name: pluginName,
        namespace: pluginNamespace,
        version,
    },
    processors: {},
    rules: eslintPluginRules,
};

const remarkOnlyPreset: Linter.Config = {
    files: [...markdownFiles],
    languageOptions: {
        parser: markdownParser,
    },
    name: remarkConfigMetadataByName.remarkOnly.presetName,
    plugins: {
        [pluginNamespace]: remarkPlugin,
    },
    rules: {
        [`${pluginNamespace}/remark`]: "error",
    },
};

const configurationRules = {
    [`${pluginNamespace}/disallow-remark-duplicate-plugins`]: "warn",
    [`${pluginNamespace}/disallow-remark-relative-plugin-paths`]: "warn",
    [`${pluginNamespace}/prefer-remark-plugins-array`]: "warn",
    [`${pluginNamespace}/require-remark-config-file-naming-convention`]: "warn",
    [`${pluginNamespace}/require-remark-plugins-packages-installed`]: "warn",
    [`${pluginNamespace}/sort-remark-plugins`]: "warn",
} as const satisfies FlatConfigRules;

const recommendedConfigurationRules: FlatConfigRules = {
    [`${pluginNamespace}/disallow-remark-duplicate-plugins`]: "warn",
    [`${pluginNamespace}/disallow-remark-relative-plugin-paths`]: "warn",
    [`${pluginNamespace}/prefer-remark-plugins-array`]: "warn",
    [`${pluginNamespace}/require-remark-config-file-naming-convention`]: "warn",
    [`${pluginNamespace}/require-remark-plugins-packages-installed`]: "warn",
    [`${pluginNamespace}/sort-remark-plugins`]: "warn",
};

const configurationPreset: Linter.Config = {
    files: [...configFiles],
    languageOptions: {
        parser: tsParser,
        parserOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
        },
    },
    name: remarkConfigMetadataByName.configuration.presetName,
    plugins: {
        [pluginNamespace]: remarkPlugin,
    },
    rules: configurationRules,
};

const recommendedConfigurationPreset: Linter.Config = {
    ...configurationPreset,
    name: `${remarkConfigMetadataByName.recommended.presetName}:config`,
    rules: recommendedConfigurationRules,
};

remarkPlugin.configs = {
    all: [remarkOnlyPreset, configurationPreset],
    configs: configurationPreset,
    configuration: configurationPreset,
    markdown: remarkOnlyPreset,
    recommended: [remarkOnlyPreset, recommendedConfigurationPreset],
    remarkOnly: remarkOnlyPreset,
};

/** Fully assembled public plugin contract. */
export type RemarkPlugin = typeof remarkPlugin;

export default remarkPlugin;
