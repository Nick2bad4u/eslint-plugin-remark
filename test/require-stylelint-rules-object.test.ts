/**
 * @packageDocumentation
 * RuleTester coverage for require-stylelint-rules-object.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "require-stylelint-rules-object",
    getPluginRule("require-stylelint-rules-object"),
    {
        invalid: [
            {
                code: `export default {
    reportDescriptionlessDisables: true,
};`,
                errors: [{ messageId: "requireRulesObject" }],
                filename: "stylelint.config.ts",
                output: `export default {
    rules: {},
    reportDescriptionlessDisables: true,
};`,
            },
            {
                code: `export default {};`,
                errors: [{ messageId: "requireRulesObject" }],
                filename: "stylelint.config.ts",
                output: `export default {
    rules: {},
};`,
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
                code: `export default {};`,
                filename: "not-a-stylelint-config.ts",
            },
        ],
    }
);
