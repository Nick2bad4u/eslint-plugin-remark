/**
 * @packageDocumentation
 * Disallow top-level Stylelint allowEmptyInput configuration in authored config files.
 */
import type { RuleModuleWithDocs } from "../_internal/typed-rule.js";

import { createStylelintConfigDisallowedOptionRule } from "../_internal/stylelint-config-disallowed-option-rule.js";

/** Rule module that disallows `allowEmptyInput` in Stylelint config files. */
const disallowStylelintAllowEmptyInputRule: RuleModuleWithDocs<
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
                "disallow configuring Stylelint's top-level `allowEmptyInput` option inside authored Stylelint config files.",
            frozen: false,
            recommended: true,
            requiresTypeChecking: false,
            url: "https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-allow-empty-input",
        },
        fixable: "code",
        messages: {
            disallowConfigOption:
                "Remove `allowEmptyInput` from the shared Stylelint config. Empty-input handling should be managed by invocation-level file targeting and task orchestration, not hidden in shared config state.",
        },
        schema: [],
        type: "suggestion",
    },
    name: "disallow-stylelint-allow-empty-input",
    optionName: "allowEmptyInput",
});

export default disallowStylelintAllowEmptyInputRule;
