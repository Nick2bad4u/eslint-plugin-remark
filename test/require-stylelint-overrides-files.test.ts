/**
 * @packageDocumentation
 * RuleTester coverage for require-stylelint-overrides-files.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "require-stylelint-overrides-files",
    getPluginRule("require-stylelint-overrides-files"),
    {
        invalid: [
            {
                code: `export default {
    overrides: [
        {
            rules: {
                "at-rule-no-unknown": null,
            },
        },
    ],
    rules: {
        "color-no-invalid-hex": true,
    },
};`,
                errors: [{ messageId: "requireOverrideFiles" }],
                filename: "stylelint.config.ts",
            },
            {
                code: `export default {
    overrides: [
        {
            files: [],
            rules: {},
        },
    ],
    rules: {
        "color-no-invalid-hex": true,
    },
};`,
                errors: [{ messageId: "requireOverrideFiles" }],
                filename: "stylelint.config.ts",
            },
            {
                code: `export default {
    overrides: [
        {
            files: "",
            rules: {},
        },
    ],
    rules: {
        "color-no-invalid-hex": true,
    },
};`,
                errors: [{ messageId: "requireOverrideFiles" }],
                filename: "stylelint.config.ts",
            },
        ],
        valid: [
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
    rules: {
        "color-no-invalid-hex": true,
    },
};`,
                filename: "stylelint.config.ts",
            },
            {
                code: `export default {
    rules: {
        "color-no-invalid-hex": true,
    },
};`,
                filename: "stylelint.config.ts",
            },
        ],
    }
);
