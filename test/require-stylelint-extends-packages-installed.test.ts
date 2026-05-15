/**
 * @packageDocumentation
 * RuleTester coverage for require-stylelint-extends-packages-installed.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "require-stylelint-extends-packages-installed",
    getPluginRule("require-stylelint-extends-packages-installed"),
    {
        invalid: [
            {
                code: `export default {
    extends: ["stylelint-config-does-not-exist"],
    rules: {},
};`,
                errors: [{ messageId: "requireInstalledPackage" }],
                filename: "stylelint.config.ts",
            },
            {
                code: `export default {
    extends: ["stylelint-config-standard", "@scope/unknown-config/subpath"],
    rules: {},
};`,
                errors: [{ messageId: "requireInstalledPackage" }],
                filename: "stylelint.config.ts",
            },
        ],
        valid: [
            {
                code: `export default {
    extends: ["stylelint-config-standard", "stylelint-config-recommended"],
    rules: {},
};`,
                filename: "stylelint.config.ts",
            },
            {
                code: `export default {
    extends: "stylelint-config-standard/scss",
    rules: {},
};`,
                filename: "stylelint.config.ts",
            },
            {
                code: `export default {
    extends: ["./relative-config.cjs"],
    rules: {},
};`,
                filename: "stylelint.config.ts",
            },
        ],
    }
);
