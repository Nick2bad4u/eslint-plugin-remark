/**
 * @packageDocumentation
 * RuleTester coverage for require-stylelint-plugins-packages-installed.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "require-stylelint-plugins-packages-installed",
    getPluginRule("require-stylelint-plugins-packages-installed"),
    {
        invalid: [
            {
                code: `export default {
    plugins: ["stylelint-plugin-does-not-exist"],
    rules: {},
};`,
                errors: [{ messageId: "requireInstalledPackage" }],
                filename: "stylelint.config.ts",
            },
            {
                code: `export default {
    plugins: ["stylelint-order", "@scope/unknown-plugin/path"],
    rules: {},
};`,
                errors: [{ messageId: "requireInstalledPackage" }],
                filename: "stylelint.config.ts",
            },
        ],
        valid: [
            {
                code: `export default {
    plugins: ["stylelint-order"],
    rules: {},
};`,
                filename: "stylelint.config.ts",
            },
            {
                code: `export default {
    plugins: ["./local-plugin.cjs"],
    rules: {},
};`,
                filename: "stylelint.config.ts",
            },
            {
                code: `export default {
    plugins: ["stylelint-order/rules"],
    rules: {},
};`,
                filename: "stylelint.config.ts",
            },
        ],
    }
);
