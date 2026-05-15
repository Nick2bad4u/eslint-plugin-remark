/**
 * @packageDocumentation
 * RuleTester coverage for prefer-stylelint-extends-array.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "prefer-stylelint-extends-array",
    getPluginRule("prefer-stylelint-extends-array"),
    {
        invalid: [
            {
                code: `export default {
    extends: "stylelint-config-standard",
    rules: {},
};`,
                errors: [{ messageId: "preferArray" }],
                filename: "stylelint.config.ts",
                output: `export default {
    extends: ["stylelint-config-standard"],
    rules: {},
};`,
            },
        ],
        valid: [
            {
                code: `export default {
    extends: ["stylelint-config-standard"],
    rules: {},
};`,
                filename: "stylelint.config.ts",
            },
            {
                code: `export default { extends: "stylelint-config-standard" };`,
                filename: "not-a-stylelint-config.ts",
            },
        ],
    }
);
