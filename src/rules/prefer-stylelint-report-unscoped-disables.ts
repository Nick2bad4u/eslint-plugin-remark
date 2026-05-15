/**
 * @packageDocumentation
 * Require enabling Stylelint's built-in reporting for unscoped disable comments.
 */
import type { RuleModuleWithDocs } from "../_internal/typed-rule.js";

import { createStylelintConfigBooleanOptionRule } from "../_internal/stylelint-config-boolean-option-rule.js";

/** Rule module that requires `reportUnscopedDisables` in Stylelint config files. */
const preferStylelintReportUnscopedDisablesRule: RuleModuleWithDocs<
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
                "require enabling Stylelint's `reportUnscopedDisables` config option in authored Stylelint config files.",
            frozen: false,
            recommended: true,
            requiresTypeChecking: false,
            url: "https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/prefer-stylelint-report-unscoped-disables",
        },
        fixable: "code",
        messages: {
            requireConfigOption:
                "Enable `reportUnscopedDisables` so Stylelint reports disable comments that are not scoped to specific rules.",
        },
        schema: [],
        type: "suggestion",
    },
    name: "prefer-stylelint-report-unscoped-disables",
    optionName: "reportUnscopedDisables",
});

export default preferStylelintReportUnscopedDisablesRule;
