import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "require-remark-config-file-naming-convention",
    getPluginRule("require-remark-config-file-naming-convention"),
    {
        invalid: [
            {
                code: "export default { plugins: [] };",
                errors: [
                    {
                        messageId: "requireCanonicalRemarkConfigFilename",
                    },
                ],
                filename: ".remarkrc.mjs",
            },
        ],
        valid: [
            {
                code: "export default { plugins: [] };",
                filename: "<input>",
            },
            {
                code: "export default { plugins: [] };",
                filename: "remark.config.mjs",
            },
            {
                code: "export default { plugins: [] };",
                filename: String.raw`C:\project\remark.config.cts`,
            },
            {
                code: "export default {};",
                filename: "not-a-remark-config.mjs",
            },
        ],
    }
);
