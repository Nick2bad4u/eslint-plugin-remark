/**
 * @packageDocumentation
 * Disallow relative path entries in Remark top-level plugins option.
 */
import type { RuleModuleWithDocs } from "../_internal/typed-rule.js";

import { createRemarkConfigDisallowRelativeArrayEntriesRule } from "../_internal/remark-config-string-array-option-rule.js";

/** Rule module that disallows relative top-level Remark `plugins` entries. */
const disallowRemarkRelativePluginPathsRule: RuleModuleWithDocs<
    "disallowRelative",
    readonly []
> = createRemarkConfigDisallowRelativeArrayEntriesRule({
    meta: {
        deprecated: false,
        docs: {
            configs: [
                "remark.configs.recommended",
                "remark.configs.configuration",
                "remark.configs.all",
            ],
            description:
                "disallow relative path entries in top-level Remark `plugins` declarations.",
            frozen: false,
            recommended: true,
            requiresTypeChecking: false,
            url: "https://nick2bad4u.github.io/eslint-plugin-remark/docs/rules/disallow-remark-relative-plugin-paths",
        },
        messages: {
            disallowRelative:
                "Use package-backed Remark plugin specifiers instead of relative paths so shared configs remain portable.",
        },
        schema: [],
        type: "suggestion",
    },
    name: "disallow-remark-relative-plugin-paths",
    optionName: "plugins",
});

export default disallowRemarkRelativePluginPathsRule;
