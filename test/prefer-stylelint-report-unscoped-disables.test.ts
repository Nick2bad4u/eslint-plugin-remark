/**
 * @packageDocumentation
 * RuleTester coverage for prefer-stylelint-report-unscoped-disables.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "prefer-stylelint-report-unscoped-disables",
    getPluginRule("prefer-stylelint-report-unscoped-disables"),
    {
        invalid: [
            {
                code: `export default {\n    rules: {\n        "color-no-invalid-hex": true,\n    },\n};`,
                errors: [{ messageId: "requireConfigOption" }],
                filename: "stylelint.config.ts",
                output: `export default {\n    reportUnscopedDisables: true,\n    rules: {\n        "color-no-invalid-hex": true,\n    },\n};`,
            },
            {
                code: `export default {\n    reportUnscopedDisables: [false, { severity: "warning" }],\n};`,
                errors: [{ messageId: "requireConfigOption" }],
                filename: "stylelint.config.ts",
                output: `export default {\n    reportUnscopedDisables: [true, { severity: "warning" }],\n};`,
            },
        ],
        valid: [
            {
                code: `export default {\n    reportUnscopedDisables: true,\n};`,
                filename: "stylelint.config.ts",
            },
        ],
    }
);
