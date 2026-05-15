/**
 * @packageDocumentation
 * Canonical runtime registry of all rule modules shipped by eslint-plugin-stylelint-2.
 */
import disallowStylelintAllowEmptyInputRule from "../rules/disallow-stylelint-allow-empty-input.js";
import disallowStylelintConfigurationCommentRule from "../rules/disallow-stylelint-configuration-comment.js";
import disallowStylelintCustomSyntaxRule from "../rules/disallow-stylelint-custom-syntax.js";
import disallowStylelintDefaultSeverityRule from "../rules/disallow-stylelint-default-severity.js";
import disallowStylelintDuplicateExtendsRule from "../rules/disallow-stylelint-duplicate-extends.js";
import disallowStylelintDuplicatePluginsRule from "../rules/disallow-stylelint-duplicate-plugins.js";
import disallowStylelintDuplicateRuleOptionValuesRule from "../rules/disallow-stylelint-duplicate-rule-option-values.js";
import disallowStylelintEmptyRulesObjectRule from "../rules/disallow-stylelint-empty-rules-object.js";
import disallowStylelintIgnoreDisablesRule from "../rules/disallow-stylelint-ignore-disables.js";
import disallowStylelintIgnoreFilesRule from "../rules/disallow-stylelint-ignore-files.js";
import disallowStylelintNullRuleConfigRule from "../rules/disallow-stylelint-null-rule-config.js";
import disallowStylelintOverridesRuntimeOptionsRule from "../rules/disallow-stylelint-overrides-runtime-options.js";
import disallowStylelintProcessorsRule from "../rules/disallow-stylelint-processors.js";
import disallowStylelintRelativeExtendsPathsRule from "../rules/disallow-stylelint-relative-extends-paths.js";
import disallowStylelintRelativePluginPathsRule from "../rules/disallow-stylelint-relative-plugin-paths.js";
import preferStylelintCacheRule from "../rules/prefer-stylelint-cache.js";
import preferStylelintDefineConfigRule from "../rules/prefer-stylelint-define-config.js";
import preferStylelintExtendsArrayRule from "../rules/prefer-stylelint-extends-array.js";
import preferStylelintFixRule from "../rules/prefer-stylelint-fix.js";
import preferStylelintFormatterRule from "../rules/prefer-stylelint-formatter.js";
import preferStylelintPluginsArrayRule from "../rules/prefer-stylelint-plugins-array.js";
import preferStylelintReportDescriptionlessDisablesRule from "../rules/prefer-stylelint-report-descriptionless-disables.js";
import preferStylelintReportInvalidScopeDisablesRule from "../rules/prefer-stylelint-report-invalid-scope-disables.js";
import preferStylelintReportNeedlessDisablesRule from "../rules/prefer-stylelint-report-needless-disables.js";
import preferStylelintReportUnscopedDisablesRule from "../rules/prefer-stylelint-report-unscoped-disables.js";
import requireStylelintConfigFileNamingConventionRule from "../rules/require-stylelint-config-file-naming-convention.js";
import requireStylelintCustomSyntaxInOverridesRule from "../rules/require-stylelint-custom-syntax-in-overrides.js";
import requireStylelintExtendsPackagesInstalledRule from "../rules/require-stylelint-extends-packages-installed.js";
import requireStylelintOverridesConfigurationRule from "../rules/require-stylelint-overrides-configuration.js";
import requireStylelintOverridesFilesArrayRule from "../rules/require-stylelint-overrides-files-array.js";
import requireStylelintOverridesFilesRule from "../rules/require-stylelint-overrides-files.js";
import requireStylelintPluginsPackagesInstalledRule from "../rules/require-stylelint-plugins-packages-installed.js";
import requireStylelintReportDisablesRule from "../rules/require-stylelint-report-disables.js";
import requireStylelintRulesObjectRule from "../rules/require-stylelint-rules-object.js";
import sortStylelintExtendsRule from "../rules/sort-stylelint-extends.js";
import sortStylelintPluginsRule from "../rules/sort-stylelint-plugins.js";
import sortStylelintRuleKeysRule from "../rules/sort-stylelint-rule-keys.js";
import stylelintRule from "../rules/stylelint.js";

type Stylelint2RulesRegistry = Readonly<{
    "disallow-stylelint-allow-empty-input": typeof disallowStylelintAllowEmptyInputRule;
    "disallow-stylelint-configuration-comment": typeof disallowStylelintConfigurationCommentRule;
    "disallow-stylelint-custom-syntax": typeof disallowStylelintCustomSyntaxRule;
    "disallow-stylelint-default-severity": typeof disallowStylelintDefaultSeverityRule;
    "disallow-stylelint-duplicate-extends": typeof disallowStylelintDuplicateExtendsRule;
    "disallow-stylelint-duplicate-plugins": typeof disallowStylelintDuplicatePluginsRule;
    "disallow-stylelint-duplicate-rule-option-values": typeof disallowStylelintDuplicateRuleOptionValuesRule;
    "disallow-stylelint-empty-rules-object": typeof disallowStylelintEmptyRulesObjectRule;
    "disallow-stylelint-ignore-disables": typeof disallowStylelintIgnoreDisablesRule;
    "disallow-stylelint-ignore-files": typeof disallowStylelintIgnoreFilesRule;
    "disallow-stylelint-null-rule-config": typeof disallowStylelintNullRuleConfigRule;
    "disallow-stylelint-overrides-runtime-options": typeof disallowStylelintOverridesRuntimeOptionsRule;
    "disallow-stylelint-processors": typeof disallowStylelintProcessorsRule;
    "disallow-stylelint-relative-extends-paths": typeof disallowStylelintRelativeExtendsPathsRule;
    "disallow-stylelint-relative-plugin-paths": typeof disallowStylelintRelativePluginPathsRule;
    "prefer-stylelint-cache": typeof preferStylelintCacheRule;
    "prefer-stylelint-define-config": typeof preferStylelintDefineConfigRule;
    "prefer-stylelint-extends-array": typeof preferStylelintExtendsArrayRule;
    "prefer-stylelint-fix": typeof preferStylelintFixRule;
    "prefer-stylelint-formatter": typeof preferStylelintFormatterRule;
    "prefer-stylelint-plugins-array": typeof preferStylelintPluginsArrayRule;
    "prefer-stylelint-report-descriptionless-disables": typeof preferStylelintReportDescriptionlessDisablesRule;
    "prefer-stylelint-report-invalid-scope-disables": typeof preferStylelintReportInvalidScopeDisablesRule;
    "prefer-stylelint-report-needless-disables": typeof preferStylelintReportNeedlessDisablesRule;
    "prefer-stylelint-report-unscoped-disables": typeof preferStylelintReportUnscopedDisablesRule;
    "require-stylelint-config-file-naming-convention": typeof requireStylelintConfigFileNamingConventionRule;
    "require-stylelint-custom-syntax-in-overrides": typeof requireStylelintCustomSyntaxInOverridesRule;
    "require-stylelint-extends-packages-installed": typeof requireStylelintExtendsPackagesInstalledRule;
    "require-stylelint-overrides-configuration": typeof requireStylelintOverridesConfigurationRule;
    "require-stylelint-overrides-files": typeof requireStylelintOverridesFilesRule;
    "require-stylelint-overrides-files-array": typeof requireStylelintOverridesFilesArrayRule;
    "require-stylelint-plugins-packages-installed": typeof requireStylelintPluginsPackagesInstalledRule;
    "require-stylelint-report-disables": typeof requireStylelintReportDisablesRule;
    "require-stylelint-rules-object": typeof requireStylelintRulesObjectRule;
    "sort-stylelint-extends": typeof sortStylelintExtendsRule;
    "sort-stylelint-plugins": typeof sortStylelintPluginsRule;
    "sort-stylelint-rule-keys": typeof sortStylelintRuleKeysRule;
    stylelint: typeof stylelintRule;
}>;

/** Runtime map of all rule modules keyed by unqualified rule name. */
export const stylelint2Rules: Stylelint2RulesRegistry = {
    "disallow-stylelint-allow-empty-input":
        disallowStylelintAllowEmptyInputRule,
    "disallow-stylelint-configuration-comment":
        disallowStylelintConfigurationCommentRule,
    "disallow-stylelint-custom-syntax": disallowStylelintCustomSyntaxRule,
    "disallow-stylelint-default-severity": disallowStylelintDefaultSeverityRule,
    "disallow-stylelint-duplicate-extends":
        disallowStylelintDuplicateExtendsRule,
    "disallow-stylelint-duplicate-plugins":
        disallowStylelintDuplicatePluginsRule,
    "disallow-stylelint-duplicate-rule-option-values":
        disallowStylelintDuplicateRuleOptionValuesRule,
    "disallow-stylelint-empty-rules-object":
        disallowStylelintEmptyRulesObjectRule,
    "disallow-stylelint-ignore-disables": disallowStylelintIgnoreDisablesRule,
    "disallow-stylelint-ignore-files": disallowStylelintIgnoreFilesRule,
    "disallow-stylelint-null-rule-config": disallowStylelintNullRuleConfigRule,
    "disallow-stylelint-overrides-runtime-options":
        disallowStylelintOverridesRuntimeOptionsRule,
    "disallow-stylelint-processors": disallowStylelintProcessorsRule,
    "disallow-stylelint-relative-extends-paths":
        disallowStylelintRelativeExtendsPathsRule,
    "disallow-stylelint-relative-plugin-paths":
        disallowStylelintRelativePluginPathsRule,
    "prefer-stylelint-cache": preferStylelintCacheRule,
    "prefer-stylelint-define-config": preferStylelintDefineConfigRule,
    "prefer-stylelint-extends-array": preferStylelintExtendsArrayRule,
    "prefer-stylelint-fix": preferStylelintFixRule,
    "prefer-stylelint-formatter": preferStylelintFormatterRule,
    "prefer-stylelint-plugins-array": preferStylelintPluginsArrayRule,
    "prefer-stylelint-report-descriptionless-disables":
        preferStylelintReportDescriptionlessDisablesRule,
    "prefer-stylelint-report-invalid-scope-disables":
        preferStylelintReportInvalidScopeDisablesRule,
    "prefer-stylelint-report-needless-disables":
        preferStylelintReportNeedlessDisablesRule,
    "prefer-stylelint-report-unscoped-disables":
        preferStylelintReportUnscopedDisablesRule,
    "require-stylelint-config-file-naming-convention":
        requireStylelintConfigFileNamingConventionRule,
    "require-stylelint-custom-syntax-in-overrides":
        requireStylelintCustomSyntaxInOverridesRule,
    "require-stylelint-extends-packages-installed":
        requireStylelintExtendsPackagesInstalledRule,
    "require-stylelint-overrides-configuration":
        requireStylelintOverridesConfigurationRule,
    "require-stylelint-overrides-files": requireStylelintOverridesFilesRule,
    "require-stylelint-overrides-files-array":
        requireStylelintOverridesFilesArrayRule,
    "require-stylelint-plugins-packages-installed":
        requireStylelintPluginsPackagesInstalledRule,
    "require-stylelint-report-disables": requireStylelintReportDisablesRule,
    "require-stylelint-rules-object": requireStylelintRulesObjectRule,
    "sort-stylelint-extends": sortStylelintExtendsRule,
    "sort-stylelint-plugins": sortStylelintPluginsRule,
    "sort-stylelint-rule-keys": sortStylelintRuleKeysRule,
    stylelint: stylelintRule,
} as const satisfies Stylelint2RulesRegistry;

/** Unqualified rule name supported by this plugin. */
export type Stylelint2RuleNamePattern = keyof typeof stylelint2Rules;

export default stylelint2Rules;
