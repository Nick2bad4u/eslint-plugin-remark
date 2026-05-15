/**
 * @packageDocumentation
 * Enforce sorted entries in Remark top-level plugins option.
 */
import type { RuleModuleWithDocs } from "../_internal/typed-rule.js";

import { createRemarkConfigSortArrayEntriesRule } from "../_internal/remark-config-string-array-option-rule.js";

/** Rule module that enforces sorted top-level Remark `plugins` entries. */
const sortRemarkPluginsRule: RuleModuleWithDocs<"sortArray", readonly []> =
    createRemarkConfigSortArrayEntriesRule({
        meta: {
            deprecated: false,
            docs: {
                configs: [
                    "remark.configs.recommended",
                    "remark.configs.configuration",
                    "remark.configs.all",
                ],
                description:
                    "enforce sorted entries in top-level Remark `plugins` declarations.",
                recommended: true,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-remark/docs/rules/sort-remark-plugins",
            },
            fixable: "code",
            messages: {
                sortArray:
                    "Sort top-level `plugins` entries for deterministic Remark plugin ordering and cleaner diffs.",
            },
            schema: [],
            type: "suggestion",
        },
        name: "sort-remark-plugins",
        optionName: "plugins",
    });

export default sortRemarkPluginsRule;
