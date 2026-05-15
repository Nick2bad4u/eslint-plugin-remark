/**
 * @packageDocumentation
 * RuleTester coverage for prefer-stylelint-report-invalid-scope-disables.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "prefer-stylelint-report-invalid-scope-disables",
    getPluginRule("prefer-stylelint-report-invalid-scope-disables"),
    {
        invalid: [
            {
                code: `export default {\n    rules: {\n        "color-no-invalid-hex": true,\n    },\n};`,
                errors: [{ messageId: "requireConfigOption" }],
                filename: "stylelint.config.ts",
                output: `export default {\n    reportInvalidScopeDisables: true,\n    rules: {\n        "color-no-invalid-hex": true,\n    },\n};`,
            },
            {
                code: `export default {\n    reportInvalidScopeDisables: [false, { severity: "warning" }],\n};`,
                errors: [{ messageId: "requireConfigOption" }],
                filename: "stylelint.config.ts",
                output: `export default {\n    reportInvalidScopeDisables: [true, { severity: "warning" }],\n};`,
            },
        ],
        valid: [
            {
                code: `export default {\n    reportInvalidScopeDisables: true,\n    rules: {},\n};`,
                filename: "stylelint.config.ts",
            },
        ],
    }
);
