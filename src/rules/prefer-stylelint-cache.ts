/**
 * @packageDocumentation
 * Prefer enabling top-level Stylelint cache configuration in authored config files.
 */
import type { RuleModuleWithDocs } from "../_internal/typed-rule.js";

import { createStylelintConfigBooleanOptionRule } from "../_internal/stylelint-config-boolean-option-rule.js";

/** Rule module that prefers `cache: true` in Stylelint config files. */
const preferStylelintCacheRule: RuleModuleWithDocs<
    "requireConfigOption",
    readonly []
> = createStylelintConfigBooleanOptionRule({
    meta: {
        deprecated: false,
        docs: {
            configs: [
                "stylelint2.configs.configuration",
                "stylelint2.configs.all",
            ],
            description:
                "enforce enabled top-level Stylelint `cache` configuration in authored Stylelint config files.",
            frozen: false,
            recommended: false,
            requiresTypeChecking: false,
            url: "https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/prefer-stylelint-cache",
        },
        fixable: "code",
        messages: {
            requireConfigOption:
                "Enable `cache` so repeated Stylelint runs can reuse previous results and stay fast by default.",
        },
        schema: [],
        type: "suggestion",
    },
    name: "prefer-stylelint-cache",
    optionName: "cache",
});

export default preferStylelintCacheRule;
