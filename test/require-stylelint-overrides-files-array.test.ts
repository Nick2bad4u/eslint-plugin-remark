/**
 * @packageDocumentation
 * RuleTester coverage for require-stylelint-overrides-files-array.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "require-stylelint-overrides-files-array",
    getPluginRule("require-stylelint-overrides-files-array"),
    {
        invalid: [
            {
                code: `export default {
    overrides: [
        {
            files: "**/*.scss",
            rules: {
                "at-rule-no-unknown": null,
            },
        },
    ],
};`,
                errors: [{ messageId: "requireOverrideFilesArray" }],
                filename: "stylelint.config.ts",
            },
            {
                code: `export default {
    overrides: [
        {
            files: [],
            rules: {
                "at-rule-no-unknown": null,
            },
        },
    ],
};`,
                errors: [{ messageId: "requireOverrideFilesArray" }],
                filename: "stylelint.config.ts",
            },
            {
                code: `export default {
    overrides: [
        {
            files: ["**/*.scss", scopedGlob],
            rules: {
                "at-rule-no-unknown": null,
            },
        },
    ],
};`,
                errors: [{ messageId: "requireOverrideFilesArray" }],
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
};`,
                filename: "stylelint.config.ts",
            },
            {
                code: `export default {
    overrides: [
        {
            rules: {
                "at-rule-no-unknown": null,
            },
        },
    ],
};`,
                filename: "stylelint.config.ts",
            },
            {
                code: `export default {
    overrides: [
        {
            files: "**/*.scss",
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
