import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "trim-remark-plugin-specifiers",
    getPluginRule("trim-remark-plugin-specifiers"),
    {
        invalid: [
            {
                code: 'export default { plugins: " remark-gfm " };',
                errors: [{ messageId: "trimSpecifier" }],
                filename: "remark.config.mjs",
                output: 'export default { plugins: "remark-gfm" };',
            },
            {
                code: "export default { plugins: [' remark-gfm '] };",
                errors: [{ messageId: "trimSpecifier" }],
                filename: "remark.config.mjs",
                output: "export default { plugins: ['remark-gfm'] };",
            },
            {
                code: 'export default { plugins: [" remark-gfm ", [" remark-toc ", { heading: "contents" }]] };',
                errors: [
                    { messageId: "trimSpecifier" },
                    { messageId: "trimSpecifier" },
                ],
                filename: "remark.config.mjs",
                output: 'export default { plugins: ["remark-gfm", ["remark-toc", { heading: "contents" }]] };',
            },
        ],
        valid: [
            {
                code: 'export default { plugins: ["remark-gfm"] };',
                filename: "remark.config.mjs",
            },
            {
                code: 'export default { plugins: [["remark-toc", { heading: "contents" }]] };',
                filename: "remark.config.mjs",
            },
            {
                code: 'export default { plugins: ["   "] };',
                filename: "remark.config.mjs",
            },
            {
                code: 'export default { plugins: [" remark-gfm "] };',
                filename: "not-remark.config.mjs",
            },
        ],
    }
);
