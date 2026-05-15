/**
 * @packageDocumentation
 * RuleTester coverage for require-stylelint-overrides-configuration.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "require-stylelint-overrides-configuration",
    getPluginRule("require-stylelint-overrides-configuration"),
    {
        invalid: [
            {
                code: `export default {
    overrides: [
        {
            files: ["**/*.scss"],
        },
    ],
    rules: {
        "color-no-invalid-hex": true,
    },
};`,
                errors: [{ messageId: "requireOverrideConfiguration" }],
                filename: "stylelint.config.ts",
            },
            {
                code: `export default {
    overrides: [
        {
            files: ["**/*.scss"],
            name: "scss files",
        },
    ],
    rules: {
        "color-no-invalid-hex": true,
    },
};`,
                errors: [{ messageId: "requireOverrideConfiguration" }],
                filename: "stylelint.config.ts",
            },
            {
                code: `export default {
    overrides: [
        {},
    ],
    rules: {
        "color-no-invalid-hex": true,
    },
};`,
                errors: [{ messageId: "requireOverrideConfiguration" }],
                filename: "stylelint.config.ts",
            },
        ],
        valid: [
            {
                code: `export default {
    overrides: [
        {
            files: ["**/*.scss"],
            customSyntax: "postcss-scss",
        },
    ],
    rules: {
        "color-no-invalid-hex": true,
    },
};`,
                filename: "stylelint.config.ts",
            },
            {
                code: `export default {
    overrides: [
        {
            files: ["**/*.scss"],
            ...scssOverride,
        },
    ],
    rules: {
        "color-no-invalid-hex": true,
    },
};`,
                filename: "stylelint.config.ts",
            },
            {
                code: `export default {
    overrides: [
        {
            files: ["**/*.scss"],
            rules: {
                "at-rule-no-unknown": null,
            },
        },
    ],
};`,
                filename: "not-a-stylelint-config.ts",
            },
        ],
    }
);
