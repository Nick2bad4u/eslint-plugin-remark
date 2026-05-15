/**
 * @packageDocumentation
 * RuleTester coverage for prefer-stylelint-fix.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run("prefer-stylelint-fix", getPluginRule("prefer-stylelint-fix"), {
    invalid: [
        {
            code: `export default {
    rules: {},
};`,
            errors: [{ messageId: "preferFix" }],
            filename: "stylelint.config.ts",
            output: `export default {
    fix: true,
    rules: {},
};`,
        },
        {
            code: `export default {
    fix: false,
    rules: {},
};`,
            errors: [{ messageId: "preferFix" }],
            filename: "stylelint.config.ts",
            output: `export default {
    fix: true,
    rules: {},
};`,
        },
        {
            code: `export default {
    rules: {},
    fix: false
};`,
            errors: [{ messageId: "preferFix" }],
            filename: "stylelint.config.ts",
            output: `export default {
    rules: {},
    fix: true
};`,
        },
    ],
    valid: [
        {
            code: `export default {
    fix: true,
    rules: {},
};`,
            filename: "stylelint.config.ts",
        },
        {
            code: `export default { fix: "strict" };`,
            filename: "stylelint.config.ts",
        },
        {
            code: `export default { fix: true };`,
            filename: "not-a-stylelint-config.ts",
        },
    ],
});
