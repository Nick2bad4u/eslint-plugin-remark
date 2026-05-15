/**
 * @packageDocumentation
 * Disallow top-level Stylelint configurationComment configuration in authored config files.
 */
import type { RuleModuleWithDocs } from "../_internal/typed-rule.js";

import { createStylelintConfigDisallowedOptionRule } from "../_internal/stylelint-config-disallowed-option-rule.js";

/** Rule module that disallows `configurationComment` in Stylelint config files. */
const disallowStylelintConfigurationCommentRule: RuleModuleWithDocs<
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
                "disallow configuring Stylelint's top-level `configurationComment` option inside authored Stylelint config files.",
            frozen: false,
            recommended: true,
            requiresTypeChecking: false,
            url: "https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-configuration-comment",
        },
        fixable: "code",
        messages: {
            disallowConfigOption:
                "Remove `configurationComment` from the shared Stylelint config. Configuration comment policy should remain consistent across repositories and not drift through local override markers.",
        },
        schema: [],
        type: "suggestion",
    },
    name: "disallow-stylelint-configuration-comment",
    optionName: "configurationComment",
});

export default disallowStylelintConfigurationCommentRule;
