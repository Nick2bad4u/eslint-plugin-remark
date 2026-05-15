/**
 * @packageDocumentation
 * Require enabling Stylelint's built-in reporting for needless disable comments.
 */
import type { RuleModuleWithDocs } from "../_internal/typed-rule.js";

import { createStylelintConfigBooleanOptionRule } from "../_internal/stylelint-config-boolean-option-rule.js";

/** Rule module that requires `reportNeedlessDisables` in Stylelint config files. */
const preferStylelintReportNeedlessDisablesRule: RuleModuleWithDocs<
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
                "require enabling Stylelint's `reportNeedlessDisables` config option in authored Stylelint config files.",
            frozen: false,
            recommended: true,
            requiresTypeChecking: false,
            url: "https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/prefer-stylelint-report-needless-disables",
        },
        fixable: "code",
        messages: {
            requireConfigOption:
                "Enable `reportNeedlessDisables` so Stylelint reports disable comments that do not suppress any active finding.",
        },
        schema: [],
        type: "suggestion",
    },
    name: "prefer-stylelint-report-needless-disables",
    optionName: "reportNeedlessDisables",
});

export default preferStylelintReportNeedlessDisablesRule;
