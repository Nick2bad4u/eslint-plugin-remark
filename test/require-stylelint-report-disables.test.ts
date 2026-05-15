/**
 * @packageDocumentation
 * RuleTester coverage for require-stylelint-report-disables.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "require-stylelint-report-disables",
    getPluginRule("require-stylelint-report-disables"),
    {
        invalid: [
            {
                code: `export default {
    rules: {},
};`,
                errors: [{ messageId: "requireConfigOption" }],
                filename: "stylelint.config.ts",
                output: `export default {
    reportDisables: true,
    rules: {},
};`,
            },
            {
                code: `export default {
    reportDisables: false,
    rules: {},
};`,
                errors: [{ messageId: "requireConfigOption" }],
                filename: "stylelint.config.ts",
                output: `export default {
    reportDisables: true,
    rules: {},
};`,
            },
        ],
        valid: [
            {
                code: `export default {
    reportDisables: true,
    rules: {},
};`,
                filename: "stylelint.config.ts",
            },
            {
                code: `export default { reportDisables: true };`,
                filename: "not-a-stylelint-config.ts",
            },
        ],
    }
);
