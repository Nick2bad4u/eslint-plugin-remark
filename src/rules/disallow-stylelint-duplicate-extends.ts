/**
 * @packageDocumentation
 * Disallow duplicate entries in Stylelint top-level extends option.
 */
import type { RuleModuleWithDocs } from "../_internal/typed-rule.js";

import { createStylelintConfigDisallowDuplicateArrayEntriesRule } from "../_internal/stylelint-config-string-array-option-rule.js";

/** Rule module that disallows duplicate top-level Stylelint `extends` entries. */
const disallowStylelintDuplicateExtendsRule: RuleModuleWithDocs<
    "disallowDuplicates",
    readonly []
> = createStylelintConfigDisallowDuplicateArrayEntriesRule({
    meta: {
        deprecated: false,
        docs: {
            configs: [
                "stylelint2.configs.recommended",
                "stylelint2.configs.configuration",
                "stylelint2.configs.all",
            ],
            description:
                "disallow duplicate entries in top-level Stylelint `extends` declarations.",
            frozen: false,
            recommended: true,
            requiresTypeChecking: false,
            url: "https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-duplicate-extends",
        },
        fixable: "code",
        messages: {
            disallowDuplicates:
                "Remove duplicate `extends` entries so shared config layering remains unambiguous.",
        },
        schema: [],
        type: "suggestion",
    },
    name: "disallow-stylelint-duplicate-extends",
    optionName: "extends",
});

export default disallowStylelintDuplicateExtendsRule;
