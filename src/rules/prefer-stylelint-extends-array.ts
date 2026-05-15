/**
 * @packageDocumentation
 * Prefer array form for Stylelint top-level extends option.
 */
import type { RuleModuleWithDocs } from "../_internal/typed-rule.js";

import { createStylelintConfigPreferArrayOptionRule } from "../_internal/stylelint-config-string-array-option-rule.js";

/** Rule module that prefers array form for top-level Stylelint `extends`. */
const preferStylelintExtendsArrayRule: RuleModuleWithDocs<
    "preferArray",
    readonly []
> = createStylelintConfigPreferArrayOptionRule({
    meta: {
        deprecated: false,
        docs: {
            configs: [
                "stylelint2.configs.recommended",
                "stylelint2.configs.configuration",
                "stylelint2.configs.all",
            ],
            description:
                "prefer array form for top-level Stylelint `extends` declarations.",
            frozen: false,
            recommended: true,
            requiresTypeChecking: false,
            url: "https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/prefer-stylelint-extends-array",
        },
        fixable: "code",
        messages: {
            preferArray:
                "Use array form for top-level `extends` so config composition remains stable and easy to append safely.",
        },
        schema: [],
        type: "suggestion",
    },
    name: "prefer-stylelint-extends-array",
    optionName: "extends",
});

export default preferStylelintExtendsArrayRule;
