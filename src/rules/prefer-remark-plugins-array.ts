/**
 * @packageDocumentation
 * Prefer array form for Remark top-level plugins option.
 */
import type { RuleModuleWithDocs } from "../_internal/typed-rule.js";

import { createRemarkConfigPreferArrayOptionRule } from "../_internal/remark-config-string-array-option-rule.js";

/** Rule module that prefers array form for top-level Remark `plugins`. */
const preferRemarkPluginsArrayRule: RuleModuleWithDocs<
    "preferArray",
    readonly []
> = createRemarkConfigPreferArrayOptionRule({
    meta: {
        deprecated: false,
        docs: {
            configs: [
                "remark.configs.recommended",
                "remark.configs.configuration",
                "remark.configs.all",
            ],
            description:
                "prefer array form for top-level Remark `plugins` declarations.",
            frozen: false,
            recommended: true,
            requiresTypeChecking: false,
            url: "https://nick2bad4u.github.io/eslint-plugin-remark/docs/rules/prefer-remark-plugins-array",
        },
        fixable: "code",
        messages: {
            preferArray:
                "Use array form for top-level `plugins` so Remark plugin composition remains stable and easy to append safely.",
        },
        schema: [],
        type: "suggestion",
    },
    name: "prefer-remark-plugins-array",
    optionName: "plugins",
});

export default preferRemarkPluginsArrayRule;
