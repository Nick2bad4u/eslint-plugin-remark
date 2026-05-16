import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "disallow-empty-remark-plugin-specifiers",
    getPluginRule("disallow-empty-remark-plugin-specifiers"),
    {
        invalid: [
            {
                code: 'export default { plugins: "" };',
                errors: [{ messageId: "disallowEmptySpecifier" }],
                filename: "remark.config.mjs",
                output: "export default {};",
            },
            {
                code: 'export default { settings: { bullet: "*" }, plugins: "   " };',
                errors: [{ messageId: "disallowEmptySpecifier" }],
                filename: "remark.config.mjs",
                output: 'export default { settings: { bullet: "*" } };',
            },
            {
                code: 'export default { plugins: ["remark-gfm", ""] };',
                errors: [{ messageId: "disallowEmptySpecifier" }],
                filename: "remark.config.mjs",
                output: 'export default { plugins: ["remark-gfm"] };',
            },
            {
                code: 'export default { plugins: ["", "remark-gfm"] };',
                errors: [{ messageId: "disallowEmptySpecifier" }],
                filename: "remark.config.mjs",
                output: 'export default { plugins: ["remark-gfm"] };',
            },
            {
                code: 'export default { plugins: [["", { heading: "contents" }], "remark-gfm"] };',
                errors: [{ messageId: "disallowEmptySpecifier" }],
                filename: "remark.config.mjs",
                output: 'export default { plugins: ["remark-gfm"] };',
            },
            {
                code: 'export default { plugins: ["   "] };',
                errors: [{ messageId: "disallowEmptySpecifier" }],
                filename: "remark.config.mjs",
                output: "export default { plugins: [] };",
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
                code: "export default { plugins: [remarkGfm] };",
                filename: "remark.config.mjs",
            },
            {
                code: 'export default { plugins: [""] };',
                filename: "not-remark.config.mjs",
            },
        ],
    }
);
