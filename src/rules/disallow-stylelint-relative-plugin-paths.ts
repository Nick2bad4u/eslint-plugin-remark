/**
 * @packageDocumentation
 * Disallow relative path entries in Stylelint top-level plugins option.
 */
import type { RuleModuleWithDocs } from "../_internal/typed-rule.js";

import { createStylelintConfigDisallowRelativeArrayEntriesRule } from "../_internal/stylelint-config-string-array-option-rule.js";

/** Rule module that disallows relative top-level Stylelint `plugins` paths. */
const disallowStylelintRelativePluginPathsRule: RuleModuleWithDocs<
    "disallowRelative",
    readonly []
> = createStylelintConfigDisallowRelativeArrayEntriesRule({
    meta: {
        deprecated: false,
        docs: {
            configs: [
                "stylelint2.configs.recommended",
                "stylelint2.configs.configuration",
                "stylelint2.configs.all",
            ],
            description:
                "disallow relative path entries in top-level Stylelint `plugins` declarations.",
            frozen: false,
            recommended: true,
            requiresTypeChecking: false,
            url: "https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-relative-plugin-paths",
        },
        messages: {
            disallowRelative:
                "Avoid relative-path `plugins` entries in shared config files. Prefer package-based plugin references for reproducible installs.",
        },
        schema: [],
        type: "suggestion",
    },
    name: "disallow-stylelint-relative-plugin-paths",
    optionName: "plugins",
});

export default disallowStylelintRelativePluginPathsRule;
