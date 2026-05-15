/**
 * @packageDocumentation
 * RuleTester coverage for disallow-stylelint-duplicate-rule-option-values.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "disallow-stylelint-duplicate-rule-option-values",
    getPluginRule("disallow-stylelint-duplicate-rule-option-values"),
    {
        invalid: [
            {
                code: `export default {
    rules: {
        "selector-class-pattern": [
            "^[a-z]+$",
            {
                resolveNestedSelectors: [":global", ":global", ":host"],
            },
        ],
    },
};`,
                errors: [{ messageId: "disallowDuplicateRuleOptionValues" }],
                filename: "stylelint.config.ts",
                output: `export default {
    rules: {
        "selector-class-pattern": [
            "^[a-z]+$",
            {
                resolveNestedSelectors: [":global", ":host"],
            },
        ],
    },
};`,
            },
        ],
        valid: [
            {
                code: `export default {
    rules: {
        "selector-class-pattern": [
            "^[a-z]+$",
            {
                resolveNestedSelectors: [":global", ":host"],
            },
        ],
    },
};`,
                filename: "stylelint.config.ts",
            },
            {
                code: `export default {
    rules: {
        "selector-class-pattern": [
            "^[a-z]+$",
            {
                resolveNestedSelectors: [":global", ":global"],
            },
        ],
    },
};`,
                filename: "not-a-stylelint-config.ts",
            },
        ],
    }
);
