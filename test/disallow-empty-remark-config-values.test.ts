import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "disallow-empty-remark-config-values",
    getPluginRule("disallow-empty-remark-config-values"),
    {
        invalid: [
            {
                code: "export default { plugins: [] };",
                errors: [
                    {
                        data: { propertyName: "plugins" },
                        messageId: "disallowEmptyConfigValue",
                    },
                ],
                filename: "remark.config.mjs",
                output: "export default {};",
            },
            {
                code: "export default { settings: {} };",
                errors: [
                    {
                        data: { propertyName: "settings" },
                        messageId: "disallowEmptyConfigValue",
                    },
                ],
                filename: "remark.config.mjs",
                output: "export default {};",
            },
            {
                code: "export default { plugins: [], settings: { bullet: '-' } };",
                errors: [
                    {
                        data: { propertyName: "plugins" },
                        messageId: "disallowEmptyConfigValue",
                    },
                ],
                filename: "remark.config.mjs",
                output: "export default { settings: { bullet: '-' } };",
            },
            {
                code: "export default { plugins: ['remark-gfm'], settings: {} };",
                errors: [
                    {
                        data: { propertyName: "settings" },
                        messageId: "disallowEmptyConfigValue",
                    },
                ],
                filename: "remark.config.mjs",
                output: "export default { plugins: ['remark-gfm'] };",
            },
        ],
        valid: [
            {
                code: "export default { plugins: ['remark-gfm'] };",
                filename: "remark.config.mjs",
            },
            {
                code: "export default { settings: { bullet: '-' } };",
                filename: "remark.config.mjs",
            },
            {
                code: "export default { plugins: [] };",
                filename: "not-remark.config.mjs",
            },
            {
                code: "export default { plugins: [,] };",
                filename: "remark.config.mjs",
            },
        ],
    }
);
