/**
 * @packageDocumentation
 * RuleTester coverage for disallow-stylelint-default-severity.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "disallow-stylelint-default-severity",
    getPluginRule("disallow-stylelint-default-severity"),
    {
        invalid: [
            {
                code: `export default {
    defaultSeverity: "warning",
};`,
                errors: [{ messageId: "disallowConfigOption" }],
                filename: "stylelint.config.ts",
                output: `export default {};`,
            },
            {
                code: `export default {
    defaultSeverity: "error",
    rules: {},
};`,
                errors: [{ messageId: "disallowConfigOption" }],
                filename: "stylelint.config.ts",
                output: `export default {
    rules: {},
};`,
            },
            {
                code: `export default {
    rules: {},
    defaultSeverity: "warning"
};`,
                errors: [{ messageId: "disallowConfigOption" }],
                filename: "stylelint.config.ts",
                output: `export default {
    rules: {}
};`,
            },
        ],
        valid: [
            {
                code: `export default {
    rules: {},
};`,
                filename: "stylelint.config.ts",
            },
            {
                code: `export default { defaultSeverity: "warning" };`,
                filename: "not-a-stylelint-config.ts",
            },
        ],
    }
);
