/**
 * @packageDocumentation
 * RuleTester coverage for disallow-stylelint-empty-rules-object.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "disallow-stylelint-empty-rules-object",
    getPluginRule("disallow-stylelint-empty-rules-object"),
    {
        invalid: [
            {
                code: `export default {
    rules: {},
};`,
                errors: [{ messageId: "disallowEmptyRulesObject" }],
                filename: "stylelint.config.ts",
            },
            {
                code: `export default {
    overrides: [],
    rules: {},
};`,
                errors: [{ messageId: "disallowEmptyRulesObject" }],
                filename: "stylelint.config.ts",
            },
        ],
        valid: [
            {
                code: `export default {
    rules: {
        "color-no-invalid-hex": true,
    },
};`,
                filename: "stylelint.config.ts",
            },
            {
                code: `export default { rules: {} };`,
                filename: "not-a-stylelint-config.ts",
            },
        ],
    }
);
