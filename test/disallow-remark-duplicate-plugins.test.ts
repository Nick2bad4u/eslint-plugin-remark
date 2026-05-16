import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "disallow-remark-duplicate-plugins",
    getPluginRule("disallow-remark-duplicate-plugins"),
    {
        invalid: [
            {
                code: 'export default { plugins: ["remark-gfm", "remark-gfm"] };',
                errors: [{ messageId: "disallowDuplicates" }],
                filename: "remark.config.mjs",
                output: 'export default { plugins: ["remark-gfm"] };',
            },
            {
                code: 'export default { plugins: ["remark-gfm", ["remark-gfm", { singleTilde: false }]] };',
                errors: [{ messageId: "disallowDuplicates" }],
                filename: "remark.config.mjs",
                output: 'export default { plugins: ["remark-gfm"] };',
            },
            {
                code: 'export default { plugins: [["remark-gfm", { singleTilde: true }], "remark-gfm"] };',
                errors: [{ messageId: "disallowDuplicates" }],
                filename: "remark.config.mjs",
                output: 'export default { plugins: [["remark-gfm", { singleTilde: true }]] };',
            },
        ],
        valid: [
            {
                code: 'export default { plugins: "remark-gfm" };',
                filename: "remark.config.mjs",
            },
            {
                code: 'export default { plugins: ["remark-gfm", "remark-frontmatter"] };',
                filename: "remark.config.mjs",
            },
            {
                code: 'export default { plugins: [["remark-gfm", {}], ["remark-frontmatter", {}]] };',
                filename: "remark.config.mjs",
            },
            {
                code: 'export default { plugins: ["remark-gfm", ...sharedPlugins] };',
                filename: "remark.config.mjs",
            },
            {
                code: "export default { plugins: [1] };",
                filename: "remark.config.mjs",
            },
        ],
    }
);
