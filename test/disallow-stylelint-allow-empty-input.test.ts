/**
 * @packageDocumentation
 * RuleTester coverage for disallow-stylelint-allow-empty-input.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "disallow-stylelint-allow-empty-input",
    getPluginRule("disallow-stylelint-allow-empty-input"),
    {
        invalid: [
            {
                code: `export default {
    allowEmptyInput: true,
};`,
                errors: [{ messageId: "disallowConfigOption" }],
                filename: "stylelint.config.ts",
                output: `export default {};`,
            },
            {
                code: `export default {
    allowEmptyInput: false,
    rules: {},
};`,
                errors: [{ messageId: "disallowConfigOption" }],
                filename: "stylelint.config.ts",
                output: `export default {
    rules: {},
};`,
            },
        ],
        valid: [
            {
                code: `export default { rules: {} };`,
                filename: "stylelint.config.ts",
            },
            {
                code: `export default { allowEmptyInput: true };`,
                filename: "not-a-stylelint-config.ts",
            },
        ],
    }
);
