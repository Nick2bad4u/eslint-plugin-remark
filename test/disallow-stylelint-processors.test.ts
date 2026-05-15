/**
 * @packageDocumentation
 * RuleTester coverage for disallow-stylelint-processors.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "disallow-stylelint-processors",
    getPluginRule("disallow-stylelint-processors"),
    {
        invalid: [
            {
                code: `export default {
    processors: ["stylelint-processor-styled-components"],
};`,
                errors: [{ messageId: "disallowConfigOption" }],
                filename: "stylelint.config.ts",
                output: `export default {};`,
            },
            {
                code: `export default {
    processors: ["stylelint-processor-markdown"],
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
                code: `export default { processors: ["x"] };`,
                filename: "not-a-stylelint-config.ts",
            },
        ],
    }
);
