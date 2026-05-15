/**
 * @packageDocumentation
 * Disallow duplicate entries in Stylelint top-level plugins option.
 */
import type { RuleModuleWithDocs } from "../_internal/typed-rule.js";

import { createStylelintConfigDisallowDuplicateArrayEntriesRule } from "../_internal/stylelint-config-string-array-option-rule.js";

/** Rule module that disallows duplicate top-level Stylelint `plugins` entries. */
const disallowStylelintDuplicatePluginsRule: RuleModuleWithDocs<
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
                "disallow duplicate entries in top-level Stylelint `plugins` declarations.",
            frozen: false,
            recommended: true,
            requiresTypeChecking: false,
            url: "https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-duplicate-plugins",
        },
        fixable: "code",
        messages: {
            disallowDuplicates:
                "Remove duplicate `plugins` entries so plugin activation order remains explicit and clean.",
        },
        schema: [],
        type: "suggestion",
    },
    name: "disallow-stylelint-duplicate-plugins",
    optionName: "plugins",
});

export default disallowStylelintDuplicatePluginsRule;
