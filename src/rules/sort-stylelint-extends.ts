/**
 * @packageDocumentation
 * Enforce sorted entries in Stylelint top-level extends option.
 */
import type { RuleModuleWithDocs } from "../_internal/typed-rule.js";

import { createStylelintConfigSortArrayEntriesRule } from "../_internal/stylelint-config-string-array-option-rule.js";

/** Rule module that enforces sorted top-level Stylelint `extends` entries. */
const sortStylelintExtendsRule: RuleModuleWithDocs<"sortArray", readonly []> =
    createStylelintConfigSortArrayEntriesRule({
        meta: {
            deprecated: false,
            docs: {
                configs: [
                    "stylelint2.configs.recommended",
                    "stylelint2.configs.configuration",
                    "stylelint2.configs.all",
                ],
                description:
                    "enforce sorted entries in top-level Stylelint `extends` declarations.",
                recommended: true,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/sort-stylelint-extends",
            },
            fixable: "code",
            messages: {
                sortArray:
                    "Sort top-level `extends` entries for deterministic config diffs and simpler reviews.",
            },
            schema: [],
            type: "suggestion",
        },
        name: "sort-stylelint-extends",
        optionName: "extends",
    });

export default sortStylelintExtendsRule;
