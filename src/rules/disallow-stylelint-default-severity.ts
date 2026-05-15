/**
 * @packageDocumentation
 * Disallow top-level Stylelint defaultSeverity configuration in authored config files.
 */
import type { RuleModuleWithDocs } from "../_internal/typed-rule.js";

import { createStylelintConfigDisallowedOptionRule } from "../_internal/stylelint-config-disallowed-option-rule.js";

/** Rule module that disallows `defaultSeverity` in Stylelint config files. */
const disallowStylelintDefaultSeverityRule: RuleModuleWithDocs<
    "disallowConfigOption",
    readonly []
> = createStylelintConfigDisallowedOptionRule({
    meta: {
        deprecated: false,
        docs: {
            configs: [
                "stylelint2.configs.configuration",
                "stylelint2.configs.all",
            ],
            description:
                "disallow configuring Stylelint's top-level `defaultSeverity` option inside authored Stylelint config files.",
            frozen: false,
            recommended: false,
            requiresTypeChecking: false,
            url: "https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-default-severity",
        },
        fixable: "code",
        messages: {
            disallowConfigOption:
                "Remove `defaultSeverity` from the shared Stylelint config. Severity policy should stay explicit per rule and align with the ESLint-level severity contract used by this plugin.",
        },
        schema: [],
        type: "suggestion",
    },
    name: "disallow-stylelint-default-severity",
    optionName: "defaultSeverity",
});

export default disallowStylelintDefaultSeverityRule;
