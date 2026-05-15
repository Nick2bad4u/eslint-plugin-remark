/**
 * @packageDocumentation
 * Require top-level Stylelint reportDisables configuration in authored config files.
 */
import type { RuleModuleWithDocs } from "../_internal/typed-rule.js";

import { createStylelintConfigBooleanOptionRule } from "../_internal/stylelint-config-boolean-option-rule.js";

/** Rule module that requires `reportDisables: true` in Stylelint config files. */
const requireStylelintReportDisablesRule: RuleModuleWithDocs<
    "requireConfigOption",
    readonly []
> = createStylelintConfigBooleanOptionRule({
    meta: {
        deprecated: false,
        docs: {
            configs: [
                "stylelint2.configs.recommended",
                "stylelint2.configs.configuration",
                "stylelint2.configs.all",
            ],
            description:
                "require `reportDisables: true` in authored Stylelint config files.",
            frozen: false,
            recommended: true,
            requiresTypeChecking: false,
            url: "https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/require-stylelint-report-disables",
        },
        fixable: "code",
        messages: {
            requireConfigOption:
                "Enable `reportDisables: true` so disable-comment usage remains visible and reviewable.",
        },
        schema: [],
        type: "suggestion",
    },
    name: "require-stylelint-report-disables",
    optionName: "reportDisables",
});

export default requireStylelintReportDisablesRule;
