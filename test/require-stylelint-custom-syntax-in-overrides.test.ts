/**
 * @packageDocumentation
 * RuleTester coverage for require-stylelint-custom-syntax-in-overrides.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "require-stylelint-custom-syntax-in-overrides",
    getPluginRule("require-stylelint-custom-syntax-in-overrides"),
    {
        invalid: [
            {
                code: `export default {
    customSyntax: "postcss-scss",
    rules: {
        "color-no-invalid-hex": true,
    },
};`,
                errors: [{ messageId: "requireCustomSyntaxInOverrides" }],
                filename: "stylelint.config.ts",
            },
            {
                code: `export default {
    customSyntax: "postcss-scss",
    overrides: [
        {
            files: ["**/*.scss"],
            rules: {
                "at-rule-no-unknown": null,
            },
        },
    ],
    rules: {
        "color-no-invalid-hex": true,
    },
};`,
                errors: [{ messageId: "requireCustomSyntaxInOverrides" }],
                filename: "stylelint.config.ts",
            },
        ],
        valid: [
            {
                code: `export default {
    customSyntax: "postcss-scss",
    overrides: [
        {
            customSyntax: "postcss-scss",
            files: ["**/*.scss"],
            rules: {
                "at-rule-no-unknown": null,
            },
        },
    ],
    rules: {
        "color-no-invalid-hex": true,
    },
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
