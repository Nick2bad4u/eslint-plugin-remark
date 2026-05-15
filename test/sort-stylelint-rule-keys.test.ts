/**
 * @packageDocumentation
 * RuleTester coverage for sort-stylelint-rule-keys.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "sort-stylelint-rule-keys",
    getPluginRule("sort-stylelint-rule-keys"),
    {
        invalid: [
            {
                code: `export default {
    rules: {
        "color-named": "never",
        "at-rule-no-unknown": true,
    },
};`,
                errors: [{ messageId: "sortRuleKeys" }],
                filename: "stylelint.config.ts",
                output: `export default {
    rules: {
        "at-rule-no-unknown": true,
        "color-named": "never",
    },
};`,
            },
            {
                code: `export default {
    rules: {
        // Keep this first for readability.
        "color-named": "never",
        "at-rule-no-unknown": true,
    },
};`,
                errors: [{ messageId: "sortRuleKeys" }],
                filename: "stylelint.config.ts",
            },
        ],
        valid: [
            {
                code: `export default {
    rules: {
        "at-rule-no-unknown": true,
        "color-named": "never",
    },
};`,
                filename: "stylelint.config.ts",
            },
            {
                code: `export default {
    rules: {
        "color-named": "never",
        "at-rule-no-unknown": true,
    },
};`,
                filename: "not-stylelint.config.ts",
            },
            {
                code: `export default {
    rules: "not-an-object",
};`,
                filename: "stylelint.config.ts",
            },
            {
                code: `const dynamicRule = "at-rule-no-unknown";

export default {
    rules: {
        [dynamicRule || "at-rule-no-unknown"]: true,
        "color-named": "never",
    },
};`,
                filename: "stylelint.config.ts",
            },
        ],
    }
);
