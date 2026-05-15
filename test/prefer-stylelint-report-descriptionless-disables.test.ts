/**
 * @packageDocumentation
 * RuleTester coverage for prefer-stylelint-report-descriptionless-disables.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "prefer-stylelint-report-descriptionless-disables",
    getPluginRule("prefer-stylelint-report-descriptionless-disables"),
    {
        invalid: [
            {
                code: `export default {\n    rules: {\n        "color-no-invalid-hex": true,\n    },\n};`,
                errors: [{ messageId: "requireConfigOption" }],
                filename: "stylelint.config.ts",
                output: `export default {\n    reportDescriptionlessDisables: true,\n    rules: {\n        "color-no-invalid-hex": true,\n    },\n};`,
            },
            {
                code: `import { defineConfig } from "stylelint-define-config";\n\nexport default defineConfig({\n    reportDescriptionlessDisables: false,\n    rules: {\n        "color-no-invalid-hex": true,\n    },\n});`,
                errors: [{ messageId: "requireConfigOption" }],
                filename: "stylelint.config.ts",
                output: `import { defineConfig } from "stylelint-define-config";\n\nexport default defineConfig({\n    reportDescriptionlessDisables: true,\n    rules: {\n        "color-no-invalid-hex": true,\n    },\n});`,
            },
            {
                code: `export default {\n    reportDescriptionlessDisables: [false, { severity: "warning" }],\n};`,
                errors: [{ messageId: "requireConfigOption" }],
                filename: "stylelint.config.ts",
                output: `export default {\n    reportDescriptionlessDisables: [true, { severity: "warning" }],\n};`,
            },
        ],
        valid: [
            {
                code: `export default {\n    reportDescriptionlessDisables: true,\n    rules: {},\n};`,
                filename: "stylelint.config.ts",
            },
            {
                code: `export default {\n    reportDescriptionlessDisables: [true, { severity: "warning" }],\n};`,
                filename: "stylelint.config.ts",
            },
            {
                code: `export default { rules: {} };`,
                filename: "not-a-stylelint-config.ts",
            },
        ],
    }
);
