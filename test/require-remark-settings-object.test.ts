import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "require-remark-settings-object",
    getPluginRule("require-remark-settings-object"),
    {
        invalid: [
            {
                code: 'export default { settings: "bullet-star" };',
                errors: [{ messageId: "requireSettingsObject" }],
                filename: "remark.config.mjs",
            },
            {
                code: "export default { settings: [] };",
                errors: [{ messageId: "requireSettingsObject" }],
                filename: "remark.config.mjs",
            },
            {
                code: "export default defineConfig({ settings: false });",
                errors: [{ messageId: "requireSettingsObject" }],
                filename: ".remarkrc.mjs",
            },
        ],
        valid: [
            {
                code: 'export default { settings: { bullet: "*" } };',
                filename: "remark.config.mjs",
            },
            {
                code: "export default { plugins: [] };",
                filename: "remark.config.mjs",
            },
            {
                code: 'export default { settings: "bullet-star" };',
                filename: "not-remark.config.mjs",
            },
        ],
    }
);
