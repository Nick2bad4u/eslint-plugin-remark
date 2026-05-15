/**
 * @packageDocumentation
 * RuleTester coverage for disallow-stylelint-ignore-files.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "disallow-stylelint-ignore-files",
    getPluginRule("disallow-stylelint-ignore-files"),
    {
        invalid: [
            {
                code: `export default {
    ignoreFiles: ["**/vendor/**/*.css"],
};`,
                errors: [{ messageId: "disallowConfigOption" }],
                filename: "stylelint.config.ts",
                output: `export default {};`,
            },
            {
                code: `export default {
    ignoreFiles: "**/*.generated.css",
    rules: {},
};`,
                errors: [{ messageId: "disallowConfigOption" }],
                filename: "stylelint.config.ts",
                output: `export default {
    rules: {},
};`,
            },
            {
                code: `export default {
    rules: {},
    ignoreFiles: ["**/*.snap.css"]
};`,
                errors: [{ messageId: "disallowConfigOption" }],
                filename: "stylelint.config.ts",
                output: `export default {
    rules: {}
};`,
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
                code: `export default { ignoreFiles: ["**/*.css"] };`,
                filename: "not-a-stylelint-config.ts",
            },
        ],
    }
);
