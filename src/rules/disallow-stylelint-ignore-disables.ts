/**
 * @packageDocumentation
 * Disallow top-level Stylelint ignoreDisables configuration in authored config files.
 */
import type { RuleModuleWithDocs } from "../_internal/typed-rule.js";

import { createStylelintConfigDisallowedOptionRule } from "../_internal/stylelint-config-disallowed-option-rule.js";

/** Rule module that disallows `ignoreDisables` in Stylelint config files. */
const disallowStylelintIgnoreDisablesRule: RuleModuleWithDocs<
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
                "disallow configuring Stylelint's top-level `ignoreDisables` option inside authored Stylelint config files.",
            frozen: false,
            recommended: false,
            requiresTypeChecking: false,
            url: "https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-ignore-disables",
        },
        fixable: "code",
        messages: {
            disallowConfigOption:
                "Remove `ignoreDisables` from the Stylelint config. It undermines disable-comment governance and conflicts with the report*Disables safety checks this plugin is designed to reinforce.",
        },
        schema: [],
        type: "suggestion",
    },
    name: "disallow-stylelint-ignore-disables",
    optionName: "ignoreDisables",
});

export default disallowStylelintIgnoreDisablesRule;
