/**
 * @packageDocumentation
 * RuleTester coverage for disallow-stylelint-duplicate-extends.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "disallow-stylelint-duplicate-extends",
    getPluginRule("disallow-stylelint-duplicate-extends"),
    {
        invalid: [
            {
                code: `export default {
    extends: [
        "stylelint-config-standard",
        "stylelint-config-standard",
    ],
    rules: {},
};`,
                errors: [{ messageId: "disallowDuplicates" }],
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
    extends: ["stylelint-config-standard", "stylelint-config-recommended"],
    rules: {},
};`,
                filename: "stylelint.config.ts",
            },
        ],
    }
);
