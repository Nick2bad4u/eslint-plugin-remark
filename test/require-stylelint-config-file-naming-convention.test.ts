/**
 * @packageDocumentation
 * RuleTester coverage for require-stylelint-config-file-naming-convention.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "require-stylelint-config-file-naming-convention",
    getPluginRule("require-stylelint-config-file-naming-convention"),
    {
        invalid: [
            {
                code: `export default {
    rules: {},
};`,
                errors: [
                    { messageId: "requireCanonicalStylelintConfigFilename" },
                ],
                filename: ".stylelintrc.js",
            },
            {
                code: `export default {
    rules: {},
};`,
                errors: [
                    { messageId: "requireCanonicalStylelintConfigFilename" },
                ],
                filename: ".stylelintrc.cjs",
            },
        ],
        valid: [
            {
                code: `export default {
    rules: {},
};`,
                filename: "stylelint.config.ts",
            },
            {
                code: `export default {
    rules: {},
};`,
                filename: "stylelint.config.mjs",
            },
            {
                code: `export default {
    rules: {},
};`,
                filename: "not-a-stylelint-config.ts",
            },
        ],
    }
);
