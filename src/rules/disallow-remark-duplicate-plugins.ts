/**
 * @packageDocumentation
 * Disallow duplicate entries in Remark top-level plugins option.
 */
import type { RuleModuleWithDocs } from "../_internal/typed-rule.js";

import { createRemarkConfigDisallowDuplicateArrayEntriesRule } from "../_internal/remark-config-string-array-option-rule.js";

/** Rule module that disallows duplicate top-level Remark `plugins` entries. */
const disallowRemarkDuplicatePluginsRule: RuleModuleWithDocs<
    "disallowDuplicates",
    readonly []
> = createRemarkConfigDisallowDuplicateArrayEntriesRule({
    meta: {
        deprecated: false,
        docs: {
            configs: [
                "remark.configs.recommended",
                "remark.configs.configuration",
                "remark.configs.all",
            ],
            description:
                "disallow duplicate entries in top-level Remark `plugins` declarations.",
            frozen: false,
            recommended: true,
            requiresTypeChecking: false,
            url: "https://nick2bad4u.github.io/eslint-plugin-remark/docs/rules/disallow-remark-duplicate-plugins",
        },
        fixable: "code",
        messages: {
            disallowDuplicates:
                "Remove duplicate `plugins` entries so Remark plugin activation order remains explicit and clean.",
        },
        schema: [],
        type: "suggestion",
    },
    name: "disallow-remark-duplicate-plugins",
    optionName: "plugins",
});

export default disallowRemarkDuplicatePluginsRule;
