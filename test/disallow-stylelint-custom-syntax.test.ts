/**
 * @packageDocumentation
 * RuleTester coverage for disallow-stylelint-custom-syntax.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "disallow-stylelint-custom-syntax",
    getPluginRule("disallow-stylelint-custom-syntax"),
    {
        invalid: [
            {
                code: `export default {
    customSyntax: "postcss-scss",
};`,
                errors: [{ messageId: "disallowConfigOption" }],
                filename: "stylelint.config.ts",
                output: `export default {};`,
            },
            {
                code: `export default {
    customSyntax: "postcss-html",
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
                code: `export default {
    overrides: [
        {
            customSyntax: "postcss-scss",
            files: ["**/*.scss"],
            rules: {},
        },
    ],
    rules: {},
};`,
                filename: "stylelint.config.ts",
            },
            {
                code: `export default { customSyntax: "postcss-scss" };`,
                filename: "not-a-stylelint-config.ts",
            },
        ],
    }
);
