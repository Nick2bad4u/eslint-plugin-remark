/**
 * @packageDocumentation
 * Disallow top-level Stylelint processors configuration in authored config files.
 */
import type { RuleModuleWithDocs } from "../_internal/typed-rule.js";

import { createStylelintConfigDisallowedOptionRule } from "../_internal/stylelint-config-disallowed-option-rule.js";

/** Rule module that disallows `processors` in Stylelint config files. */
const disallowStylelintProcessorsRule: RuleModuleWithDocs<
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
                "disallow configuring Stylelint's top-level `processors` option inside authored Stylelint config files.",
            frozen: false,
            recommended: true,
            requiresTypeChecking: false,
            url: "https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-processors",
        },
        fixable: "code",
        messages: {
            disallowConfigOption:
                "Remove `processors` from the shared Stylelint config. Modern Stylelint workflows should rely on syntax-aware parsing and explicit config composition rather than processor pipelines.",
        },
        schema: [],
        type: "suggestion",
    },
    name: "disallow-stylelint-processors",
    optionName: "processors",
});

export default disallowStylelintProcessorsRule;
