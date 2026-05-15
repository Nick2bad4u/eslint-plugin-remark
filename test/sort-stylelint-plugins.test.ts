/**
 * @packageDocumentation
 * RuleTester coverage for sort-stylelint-plugins.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "sort-stylelint-plugins",
    getPluginRule("sort-stylelint-plugins"),
    {
        invalid: [
            {
                code: `export default {
    plugins: ["stylelint-order", "stylelint-prettier", "stylelint-a11y"],
    rules: {},
};`,
                errors: [{ messageId: "sortArray" }],
                filename: "stylelint.config.ts",
                output: `export default {
    plugins: ["stylelint-a11y", "stylelint-order", "stylelint-prettier"],
    rules: {},
};`,
            },
        ],
        valid: [
            {
                code: `export default {
    plugins: ["stylelint-a11y", "stylelint-order", "stylelint-prettier"],
    rules: {},
};`,
                filename: "stylelint.config.ts",
            },
        ],
    }
);
