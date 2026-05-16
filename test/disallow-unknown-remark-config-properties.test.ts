import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "disallow-unknown-remark-config-properties",
    getPluginRule("disallow-unknown-remark-config-properties"),
    {
        invalid: [
            {
                code: 'export default { plugin: ["remark-gfm"] };',
                errors: [
                    {
                        data: { propertyName: "plugin" },
                        messageId: "disallowUnknownProperty",
                    },
                ],
                filename: "remark.config.mjs",
                output: 'export default { plugins: ["remark-gfm"] };',
            },
            {
                code: 'export default { "setting": { bullet: "*" } };',
                errors: [
                    {
                        data: { propertyName: "setting" },
                        messageId: "disallowUnknownProperty",
                    },
                ],
                filename: "remark.config.mjs",
                output: 'export default { settings: { bullet: "*" } };',
            },
            {
                code: 'export default { extends: ["remark-preset-lint-recommended"] };',
                errors: [
                    {
                        data: { propertyName: "extends" },
                        messageId: "disallowUnknownProperty",
                    },
                ],
                filename: "remark.config.mjs",
                output: null,
            },
            {
                code: 'export default { plugins: ["remark-gfm"], plugin: ["remark-toc"] };',
                errors: [
                    {
                        data: { propertyName: "plugin" },
                        messageId: "disallowUnknownProperty",
                    },
                ],
                filename: "remark.config.mjs",
                output: null,
            },
        ],
        valid: [
            {
                code: 'export default { plugins: ["remark-gfm"], settings: { bullet: "*" } };',
                filename: "remark.config.mjs",
            },
            {
                code: 'export default defineConfig({ plugins: ["remark-gfm"] });',
                filename: ".remarkrc.mjs",
            },
            {
                code: 'export default { extends: ["remark-preset-lint-recommended"] };',
                filename: "not-remark.config.mjs",
            },
            {
                code: 'const key = "plugin"; export default { [key]: ["remark-gfm"] };',
                filename: "remark.config.mjs",
            },
        ],
    }
);
