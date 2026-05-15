/**
 * @packageDocumentation
 * Disallow relative path entries in Stylelint top-level extends option.
 */
import type { RuleModuleWithDocs } from "../_internal/typed-rule.js";

import { createStylelintConfigDisallowRelativeArrayEntriesRule } from "../_internal/stylelint-config-string-array-option-rule.js";

/** Rule module that disallows relative top-level Stylelint `extends` paths. */
const disallowStylelintRelativeExtendsPathsRule: RuleModuleWithDocs<
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
                "disallow relative path entries in top-level Stylelint `extends` declarations.",
            frozen: false,
            recommended: true,
            requiresTypeChecking: false,
            url: "https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-relative-extends-paths",
        },
        messages: {
            disallowRelative:
                "Avoid relative-path `extends` entries in shared config files. Prefer package-based config references for portability.",
        },
        schema: [],
        type: "suggestion",
    },
    name: "disallow-stylelint-relative-extends-paths",
    optionName: "extends",
});

export default disallowStylelintRelativeExtendsPathsRule;
