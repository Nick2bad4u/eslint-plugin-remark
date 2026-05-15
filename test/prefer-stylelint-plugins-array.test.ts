/**
 * @packageDocumentation
 * RuleTester coverage for prefer-stylelint-plugins-array.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "prefer-stylelint-plugins-array",
    getPluginRule("prefer-stylelint-plugins-array"),
    {
        invalid: [
            {
                code: `export default {
    plugins: "stylelint-order",
    rules: {},
};`,
                errors: [{ messageId: "preferArray" }],
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
    plugins: ["stylelint-order"],
    rules: {},
};`,
                filename: "stylelint.config.ts",
            },
            {
                code: `export default { plugins: "stylelint-order" };`,
                filename: "not-a-stylelint-config.ts",
            },
        ],
    }
);
