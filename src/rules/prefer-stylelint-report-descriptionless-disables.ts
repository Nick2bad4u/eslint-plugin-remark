/**
 * @packageDocumentation
 * Require enabling Stylelint's built-in reporting for descriptionless disable comments.
 */
import type { RuleModuleWithDocs } from "../_internal/typed-rule.js";

import { createStylelintConfigBooleanOptionRule } from "../_internal/stylelint-config-boolean-option-rule.js";

/**
 * Rule module that requires `reportDescriptionlessDisables` in Stylelint config
 * files.
 */
const preferStylelintReportDescriptionlessDisablesRule: RuleModuleWithDocs<
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
                "require enabling Stylelint's `reportDescriptionlessDisables` config option in authored Stylelint config files.",
            frozen: false,
            recommended: true,
            requiresTypeChecking: false,
            url: "https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/prefer-stylelint-report-descriptionless-disables",
        },
        fixable: "code",
        messages: {
            requireConfigOption:
                "Enable `reportDescriptionlessDisables` so Stylelint reports disable comments that do not explain why the rule was turned off.",
        },
        schema: [],
        type: "suggestion",
    },
    name: "prefer-stylelint-report-descriptionless-disables",
    optionName: "reportDescriptionlessDisables",
});

export default preferStylelintReportDescriptionlessDisablesRule;
