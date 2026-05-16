/**
 * @packageDocumentation
 * Canonical runtime registry of all rule modules shipped by eslint-plugin-remark.
 */
import disallowEmptyRemarkConfigValuesRule from "../rules/disallow-empty-remark-config-values.js";
import disallowEmptyRemarkPluginSpecifiersRule from "../rules/disallow-empty-remark-plugin-specifiers.js";
import disallowInvalidRemarkPluginTuplesRule from "../rules/disallow-invalid-remark-plugin-tuples.js";
import disallowRemarkDuplicatePluginsRule from "../rules/disallow-remark-duplicate-plugins.js";
import disallowRemarkRelativePluginPathsRule from "../rules/disallow-remark-relative-plugin-paths.js";
import disallowUnknownRemarkConfigPropertiesRule from "../rules/disallow-unknown-remark-config-properties.js";
import preferRemarkPluginsArrayRule from "../rules/prefer-remark-plugins-array.js";
import remarkRule from "../rules/remark.js";
import requireRemarkConfigFileNamingConventionRule from "../rules/require-remark-config-file-naming-convention.js";
import requireRemarkPluginsPackagesInstalledRule from "../rules/require-remark-plugins-packages-installed.js";
import requireRemarkSettingsObjectRule from "../rules/require-remark-settings-object.js";
import sortRemarkPluginsRule from "../rules/sort-remark-plugins.js";
import trimRemarkPluginSpecifiersRule from "../rules/trim-remark-plugin-specifiers.js";

type RemarkRulesRegistry = Readonly<{
    "disallow-empty-remark-config-values": typeof disallowEmptyRemarkConfigValuesRule;
    "disallow-empty-remark-plugin-specifiers": typeof disallowEmptyRemarkPluginSpecifiersRule;
    "disallow-invalid-remark-plugin-tuples": typeof disallowInvalidRemarkPluginTuplesRule;
    "disallow-remark-duplicate-plugins": typeof disallowRemarkDuplicatePluginsRule;
    "disallow-remark-relative-plugin-paths": typeof disallowRemarkRelativePluginPathsRule;
    "disallow-unknown-remark-config-properties": typeof disallowUnknownRemarkConfigPropertiesRule;
    "prefer-remark-plugins-array": typeof preferRemarkPluginsArrayRule;
    remark: typeof remarkRule;
    "require-remark-config-file-naming-convention": typeof requireRemarkConfigFileNamingConventionRule;
    "require-remark-plugins-packages-installed": typeof requireRemarkPluginsPackagesInstalledRule;
    "require-remark-settings-object": typeof requireRemarkSettingsObjectRule;
    "sort-remark-plugins": typeof sortRemarkPluginsRule;
    "trim-remark-plugin-specifiers": typeof trimRemarkPluginSpecifiersRule;
}>;

/** Runtime map of all rule modules keyed by unqualified rule name. */
export const remarkRules: RemarkRulesRegistry = {
    "disallow-empty-remark-config-values": disallowEmptyRemarkConfigValuesRule,
    "disallow-empty-remark-plugin-specifiers":
        disallowEmptyRemarkPluginSpecifiersRule,
    "disallow-invalid-remark-plugin-tuples":
        disallowInvalidRemarkPluginTuplesRule,
    "disallow-remark-duplicate-plugins": disallowRemarkDuplicatePluginsRule,
    "disallow-remark-relative-plugin-paths":
        disallowRemarkRelativePluginPathsRule,
    "disallow-unknown-remark-config-properties":
        disallowUnknownRemarkConfigPropertiesRule,
    "prefer-remark-plugins-array": preferRemarkPluginsArrayRule,
    remark: remarkRule,
    "require-remark-config-file-naming-convention":
        requireRemarkConfigFileNamingConventionRule,
    "require-remark-plugins-packages-installed":
        requireRemarkPluginsPackagesInstalledRule,
    "require-remark-settings-object": requireRemarkSettingsObjectRule,
    "sort-remark-plugins": sortRemarkPluginsRule,
    "trim-remark-plugin-specifiers": trimRemarkPluginSpecifiersRule,
} as const satisfies RemarkRulesRegistry;

/** Unqualified rule name supported by this plugin. */
export type RemarkRuleNamePattern = keyof typeof remarkRules;

export default remarkRules;
