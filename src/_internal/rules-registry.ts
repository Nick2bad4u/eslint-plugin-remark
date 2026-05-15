/**
 * @packageDocumentation
 * Canonical runtime registry of all rule modules shipped by eslint-plugin-remark.
 */
import disallowRemarkDuplicatePluginsRule from "../rules/disallow-remark-duplicate-plugins.js";
import disallowRemarkRelativePluginPathsRule from "../rules/disallow-remark-relative-plugin-paths.js";
import preferRemarkPluginsArrayRule from "../rules/prefer-remark-plugins-array.js";
import remarkRule from "../rules/remark.js";
import requireRemarkConfigFileNamingConventionRule from "../rules/require-remark-config-file-naming-convention.js";
import requireRemarkPluginsPackagesInstalledRule from "../rules/require-remark-plugins-packages-installed.js";
import sortRemarkPluginsRule from "../rules/sort-remark-plugins.js";

type RemarkRulesRegistry = Readonly<{
    "disallow-remark-duplicate-plugins": typeof disallowRemarkDuplicatePluginsRule;
    "disallow-remark-relative-plugin-paths": typeof disallowRemarkRelativePluginPathsRule;
    "prefer-remark-plugins-array": typeof preferRemarkPluginsArrayRule;
    remark: typeof remarkRule;
    "require-remark-config-file-naming-convention": typeof requireRemarkConfigFileNamingConventionRule;
    "require-remark-plugins-packages-installed": typeof requireRemarkPluginsPackagesInstalledRule;
    "sort-remark-plugins": typeof sortRemarkPluginsRule;
}>;

/** Runtime map of all rule modules keyed by unqualified rule name. */
export const remarkRules: RemarkRulesRegistry = {
    "disallow-remark-duplicate-plugins": disallowRemarkDuplicatePluginsRule,
    "disallow-remark-relative-plugin-paths":
        disallowRemarkRelativePluginPathsRule,
    "prefer-remark-plugins-array": preferRemarkPluginsArrayRule,
    remark: remarkRule,
    "require-remark-config-file-naming-convention":
        requireRemarkConfigFileNamingConventionRule,
    "require-remark-plugins-packages-installed":
        requireRemarkPluginsPackagesInstalledRule,
    "sort-remark-plugins": sortRemarkPluginsRule,
} as const satisfies RemarkRulesRegistry;

/** Unqualified rule name supported by this plugin. */
export type RemarkRuleNamePattern = keyof typeof remarkRules;

export default remarkRules;
