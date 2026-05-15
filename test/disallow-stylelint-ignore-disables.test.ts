/**
 * @packageDocumentation
 * RuleTester coverage for disallow-stylelint-ignore-disables.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "disallow-stylelint-ignore-disables",
    getPluginRule("disallow-stylelint-ignore-disables"),
    {
        invalid: [
            {
                code: `export default {\n    ignoreDisables: true,\n};`,
                errors: [{ messageId: "disallowConfigOption" }],
                filename: "stylelint.config.ts",
                output: `export default {};`,
            },
            {
                code: `export default {\n    ignoreDisables: false,\n    rules: {},\n};`,
                errors: [{ messageId: "disallowConfigOption" }],
                filename: "stylelint.config.ts",
                output: `export default {\n    rules: {},\n};`,
            },
            {
                code: `export default {\n    rules: {},\n    ignoreDisables: true\n};`,
                errors: [{ messageId: "disallowConfigOption" }],
                filename: "stylelint.config.ts",
                output: `export default {\n    rules: {}\n};`,
            },
        ],
        valid: [
            {
                code: `export default {\n    rules: {},\n};`,
                filename: "stylelint.config.ts",
            },
            {
                code: `export default { ignoreDisables: true };`,
                filename: "not-a-stylelint-config.ts",
            },
        ],
    }
);
