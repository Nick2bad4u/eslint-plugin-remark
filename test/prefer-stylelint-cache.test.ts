/**
 * @packageDocumentation
 * RuleTester coverage for prefer-stylelint-cache.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "prefer-stylelint-cache",
    getPluginRule("prefer-stylelint-cache"),
    {
        invalid: [
            {
                code: `export default {
    rules: {},
};`,
                errors: [{ messageId: "requireConfigOption" }],
                filename: "stylelint.config.ts",
                output: `export default {
    cache: true,
    rules: {},
};`,
            },
            {
                code: `export default {
    cache: false,
    rules: {},
};`,
                errors: [{ messageId: "requireConfigOption" }],
                filename: "stylelint.config.ts",
                output: `export default {
    cache: true,
    rules: {},
};`,
            },
        ],
        valid: [
            {
                code: `export default {
    cache: true,
    rules: {},
};`,
                filename: "stylelint.config.ts",
            },
            {
                code: `export default { cache: false };`,
                filename: "not-a-stylelint-config.ts",
            },
        ],
    }
);
