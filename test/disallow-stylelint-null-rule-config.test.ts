/**
 * @packageDocumentation
 * RuleTester coverage for disallow-stylelint-null-rule-config.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "disallow-stylelint-null-rule-config",
    getPluginRule("disallow-stylelint-null-rule-config"),
    {
        invalid: [
            {
                code: `export default {
    rules: {
        "at-rule-no-unknown": null,
    },
};`,
                errors: [{ messageId: "disallowNullRuleConfig" }],
                filename: "stylelint.config.ts",
            },
        ],
        valid: [
            {
                code: `export default {
    rules: {
        "at-rule-no-unknown": true,
    },
};`,
                filename: "stylelint.config.ts",
            },
            {
                code: `export default {
    rules: {
        "at-rule-no-unknown": [true, {}],
    },
};`,
                filename: "stylelint.config.ts",
            },
            {
                code: `export default {
    rules: {
        "at-rule-no-unknown": null,
    },
};`,
                filename: "not-a-stylelint-config.ts",
            },
        ],
    }
);
