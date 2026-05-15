/**
 * @packageDocumentation
 * RuleTester coverage for disallow-stylelint-overrides-runtime-options.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "disallow-stylelint-overrides-runtime-options",
    getPluginRule("disallow-stylelint-overrides-runtime-options"),
    {
        invalid: [
            {
                code: `export default {
    overrides: [
        {
            files: ["**/*.scss"],
            fix: true,
            rules: {
                "at-rule-no-unknown": null,
            },
        },
    ],
    rules: {
        "color-no-invalid-hex": true,
    },
};`,
                errors: [
                    {
                        data: {
                            optionName: "fix",
                        },
                        messageId: "disallowRuntimeOptionInOverride",
                    },
                ],
                filename: "stylelint.config.ts",
                output: `export default {
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
            },
            {
                code: `export default {
    overrides: [
        {
            allowEmptyInput: true,
            files: ["**/*.css"],
            cache: false,
            rules: {
                "color-no-invalid-hex": true,
            },
        },
    ],
};`,
                errors: [
                    {
                        data: {
                            optionName: "allowEmptyInput",
                        },
                        messageId: "disallowRuntimeOptionInOverride",
                    },
                    {
                        data: {
                            optionName: "cache",
                        },
                        messageId: "disallowRuntimeOptionInOverride",
                    },
                ],
                filename: "stylelint.config.ts",
                output: `export default {
    overrides: [
        {
            files: ["**/*.css"],
            rules: {
                "color-no-invalid-hex": true,
            },
        },
    ],
};`,
            },
        ],
        valid: [
            {
                code: `export default {
    fix: true,
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
                code: `export default {
    overrides: [
        {
            fix: true,
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
