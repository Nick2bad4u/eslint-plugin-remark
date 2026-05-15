/**
 * @packageDocumentation
 * RuleTester coverage for sort-stylelint-extends.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "sort-stylelint-extends",
    getPluginRule("sort-stylelint-extends"),
    {
        invalid: [
            {
                code: `export default {
    extends: ["stylelint-config-standard", "stylelint-config-recommended"],
    rules: {},
};`,
                errors: [{ messageId: "sortArray" }],
                filename: "stylelint.config.ts",
                output: `export default {
    extends: ["stylelint-config-recommended", "stylelint-config-standard"],
    rules: {},
};`,
            },
        ],
        valid: [
            {
                code: `export default {
    extends: ["stylelint-config-recommended", "stylelint-config-standard"],
    rules: {},
};`,
                filename: "stylelint.config.ts",
            },
        ],
    }
);
