/**
 * @packageDocumentation
 * RuleTester coverage for disallow-stylelint-configuration-comment.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "disallow-stylelint-configuration-comment",
    getPluginRule("disallow-stylelint-configuration-comment"),
    {
        invalid: [
            {
                code: `export default {
    configurationComment: "stylelint-enable",
};`,
                errors: [{ messageId: "disallowConfigOption" }],
                filename: "stylelint.config.ts",
                output: `export default {};`,
            },
            {
                code: `export default {
    configurationComment: "stylelint-configure",
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
                code: `export default { configurationComment: "x" };`,
                filename: "not-a-stylelint-config.ts",
            },
        ],
    }
);
