import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "require-remark-plugins-packages-installed",
    getPluginRule("require-remark-plugins-packages-installed"),
    {
        invalid: [
            {
                code: 'export default { plugins: ["remark-plugin-that-is-not-installed"] };',
                errors: [
                    {
                        data: {
                            packageName: "remark-plugin-that-is-not-installed",
                        },
                        messageId: "requireInstalledPackage",
                    },
                ],
                filename: "remark.config.mjs",
            },
            {
                code: 'export default { plugins: [["remark-plugin-that-is-not-installed", { strict: true }]] };',
                errors: [
                    {
                        data: {
                            packageName: "remark-plugin-that-is-not-installed",
                        },
                        messageId: "requireInstalledPackage",
                    },
                ],
                filename: "remark.config.mjs",
            },
        ],
        valid: [
            {
                code: 'export default { plugins: "@double-great/remark-lint-alt-text" };',
                filename: "remark.config.mjs",
            },
            {
                code: 'export default { plugins: ["@double-great/remark-lint-alt-text"] };',
                filename: "remark.config.mjs",
            },
            {
                code: 'export default { plugins: [["@double-great/remark-lint-alt-text", {}]] };',
                filename: "remark.config.mjs",
            },
            {
                code: 'export default { plugins: ["./local-remark-plugin.mjs"] };',
                filename: "remark.config.mjs",
            },
            {
                code: 'export default { plugins: [["./local-remark-plugin.mjs", {}]] };',
                filename: "remark.config.mjs",
            },
            {
                code: "export default { plugins: [[remarkGfm, {}]] };",
                filename: "remark.config.mjs",
            },
            {
                code: 'export default { plugins: [""] };',
                filename: "remark.config.mjs",
            },
            {
                code: 'export default { plugins: ["node:test"] };',
                filename: "remark.config.mjs",
            },
            {
                code: 'export default { plugins: ["remark-plugin-that-is-not-installed"] };',
                filename: "not-remark.config.mjs",
            },
        ],
    }
);
