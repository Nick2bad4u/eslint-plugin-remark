/**
 * @packageDocumentation
 * RuleTester coverage for disallow-stylelint-relative-plugin-paths.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "disallow-stylelint-relative-plugin-paths",
    getPluginRule("disallow-stylelint-relative-plugin-paths"),
    {
        invalid: [
            {
                code: `export default {
    plugins: "./plugins/local-stylelint-plugin.cjs",
    rules: {},
};`,
                errors: [{ messageId: "disallowRelative" }],
                filename: "stylelint.config.ts",
            },
            {
                code: `export default {
    plugins: ["stylelint-order", "../plugins/local-stylelint-plugin.cjs"],
    rules: {},
};`,
                errors: [{ messageId: "disallowRelative" }],
                filename: "stylelint.config.ts",
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
        ],
    }
);
