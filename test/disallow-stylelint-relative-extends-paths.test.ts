/**
 * @packageDocumentation
 * RuleTester coverage for disallow-stylelint-relative-extends-paths.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "disallow-stylelint-relative-extends-paths",
    getPluginRule("disallow-stylelint-relative-extends-paths"),
    {
        invalid: [
            {
                code: `export default {
    extends: "./configs/base.cjs",
    rules: {},
};`,
                errors: [{ messageId: "disallowRelative" }],
                filename: "stylelint.config.ts",
            },
            {
                code: `export default {
    extends: ["stylelint-config-standard", "../shared/stylelint.cjs"],
    rules: {},
};`,
                errors: [{ messageId: "disallowRelative" }],
                filename: "stylelint.config.ts",
            },
        ],
        valid: [
            {
                code: `export default {
    extends: ["stylelint-config-standard"],
    rules: {},
};`,
                filename: "stylelint.config.ts",
            },
        ],
    }
);
