/**
 * @packageDocumentation
 * RuleTester coverage for prefer-stylelint-formatter.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "prefer-stylelint-formatter",
    getPluginRule("prefer-stylelint-formatter"),
    {
        invalid: [
            {
                code: `export default {\n    rules: {},\n};`,
                errors: [{ messageId: "preferFormatter" }],
                filename: "stylelint.config.ts",
            },
            {
                code: `export default {\n    formatter: "",\n    rules: {},\n};`,
                errors: [{ messageId: "preferFormatter" }],
                filename: "stylelint.config.ts",
            },
        ],
        valid: [
            {
                code: `export default {\n    formatter: "json",\n    rules: {},\n};`,
                filename: "stylelint.config.ts",
            },
            {
                code: `export default {\n    formatter: createFormatter(),\n    rules: {},\n};`,
                filename: "stylelint.config.ts",
            },
            {
                code: `export default { formatter: "json" };`,
                filename: "not-a-stylelint-config.ts",
            },
        ],
    }
);
