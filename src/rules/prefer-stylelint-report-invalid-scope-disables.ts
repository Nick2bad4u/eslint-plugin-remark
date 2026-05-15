/**
 * @packageDocumentation
 * Require enabling Stylelint's built-in reporting for invalid-scope disable comments.
 */
import type { RuleModuleWithDocs } from "../_internal/typed-rule.js";

import { createStylelintConfigBooleanOptionRule } from "../_internal/stylelint-config-boolean-option-rule.js";

/**
 * Rule module that requires `reportInvalidScopeDisables` in Stylelint config
 * files.
 */
const preferStylelintReportInvalidScopeDisablesRule: RuleModuleWithDocs<
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
                "require enabling Stylelint's `reportInvalidScopeDisables` config option in authored Stylelint config files.",
            frozen: false,
            recommended: true,
            requiresTypeChecking: false,
            url: "https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/prefer-stylelint-report-invalid-scope-disables",
        },
        fixable: "code",
        messages: {
            requireConfigOption:
                "Enable `reportInvalidScopeDisables` so Stylelint reports disable comments that reference rules outside the active configuration.",
        },
        schema: [],
        type: "suggestion",
    },
    name: "prefer-stylelint-report-invalid-scope-disables",
    optionName: "reportInvalidScopeDisables",
});

export default preferStylelintReportInvalidScopeDisablesRule;
