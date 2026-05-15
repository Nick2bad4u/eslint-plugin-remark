/**
 * @packageDocumentation
 * Disallow top-level Stylelint customSyntax configuration in authored config files.
 */
import type { RuleModuleWithDocs } from "../_internal/typed-rule.js";

import { createStylelintConfigDisallowedOptionRule } from "../_internal/stylelint-config-disallowed-option-rule.js";

/**
 * Rule module that disallows top-level `customSyntax` in Stylelint config
 * files.
 */
const disallowStylelintCustomSyntaxRule: RuleModuleWithDocs<
    "disallowConfigOption",
    readonly []
> = createStylelintConfigDisallowedOptionRule({
    meta: {
        deprecated: false,
        docs: {
            configs: [
                "stylelint2.configs.recommended",
                "stylelint2.configs.configuration",
                "stylelint2.configs.all",
            ],
            description:
                "disallow configuring Stylelint's top-level `customSyntax` option inside authored Stylelint config files.",
            frozen: false,
            recommended: true,
            requiresTypeChecking: false,
            url: "https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-custom-syntax",
        },
        fixable: "code",
        messages: {
            disallowConfigOption:
                "Remove top-level `customSyntax` from the shared Stylelint config. Syntax selection should be scoped in `overrides` entries with explicit file globs.",
        },
        schema: [],
        type: "suggestion",
    },
    name: "disallow-stylelint-custom-syntax",
    optionName: "customSyntax",
});

export default disallowStylelintCustomSyntaxRule;
