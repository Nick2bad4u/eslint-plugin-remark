/**
 * @packageDocumentation
 * RuleTester coverage for prefer-stylelint-report-needless-disables.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "prefer-stylelint-report-needless-disables",
    getPluginRule("prefer-stylelint-report-needless-disables"),
    {
        invalid: [
            {
                code: `export default {\n    rules: {\n        "color-no-invalid-hex": true,\n    },\n};`,
                errors: [{ messageId: "requireConfigOption" }],
                filename: "stylelint.config.ts",
                output: `export default {\n    reportNeedlessDisables: true,\n    rules: {\n        "color-no-invalid-hex": true,\n    },\n};`,
            },
            {
                code: `export default {\n    reportNeedlessDisables: false,\n};`,
                errors: [{ messageId: "requireConfigOption" }],
                filename: "stylelint.config.ts",
                output: `export default {\n    reportNeedlessDisables: true,\n};`,
            },
        ],
        valid: [
            {
                code: `export default {\n    reportNeedlessDisables: [true, { severity: "warning" }],\n};`,
                filename: "stylelint.config.ts",
            },
        ],
    }
);
