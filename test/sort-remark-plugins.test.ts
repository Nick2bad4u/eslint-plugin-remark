import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run("sort-remark-plugins", getPluginRule("sort-remark-plugins"), {
    invalid: [
        {
            code: 'export default { plugins: ["remark-gfm", "remark-frontmatter"] };',
            errors: [{ messageId: "sortArray" }],
            filename: "remark.config.mjs",
            output: 'export default { plugins: ["remark-frontmatter", "remark-gfm"] };',
        },
        {
            code: 'export default { plugins: [["remark-gfm", { singleTilde: false }], "remark-frontmatter"] };',
            errors: [{ messageId: "sortArray" }],
            filename: "remark.config.mjs",
            output: 'export default { plugins: ["remark-frontmatter", ["remark-gfm", { singleTilde: false }]] };',
        },
    ],
    valid: [
        {
            code: 'export default { plugins: "remark-gfm" };',
            filename: "remark.config.mjs",
        },
        {
            code: 'export default { plugins: ["remark-gfm"] };',
            filename: "remark.config.mjs",
        },
        {
            code: 'export default { plugins: ["remark-gfm", "remark-gfm"] };',
            filename: "remark.config.mjs",
        },
        {
            code: 'export default { plugins: ["remark-frontmatter", "remark-gfm"] };',
            filename: "remark.config.mjs",
        },
        {
            code: 'export default { plugins: ["remark-frontmatter", ["remark-gfm", {}]] };',
            filename: "remark.config.mjs",
        },
        {
            code: 'export default { plugins: ["remark-gfm", ...sharedPlugins] };',
            filename: "remark.config.mjs",
        },
        {
            code: 'export default { plugins: [remarkGfm, "remark-frontmatter"] };',
            filename: "remark.config.mjs",
        },
    ],
});
