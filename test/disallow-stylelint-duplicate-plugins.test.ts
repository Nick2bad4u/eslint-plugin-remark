/**
 * @packageDocumentation
 * RuleTester coverage for disallow-stylelint-duplicate-plugins.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "disallow-stylelint-duplicate-plugins",
    getPluginRule("disallow-stylelint-duplicate-plugins"),
    {
        invalid: [
            {
                code: `export default {
    plugins: ["stylelint-order", "stylelint-order"],
    rules: {},
};`,
                errors: [{ messageId: "disallowDuplicates" }],
                filename: "stylelint.config.ts",
                output: `export default {
    plugins: ["stylelint-order"],
    rules: {},
};`,
            },
        ],
        valid: [
            {
                code: `export default {
    plugins: ["stylelint-order", "stylelint-prettier"],
    rules: {},
};`,
                filename: "stylelint.config.ts",
            },
        ],
    }
);
