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
    ],
    valid: [
        {
            code: 'export default { plugins: ["remark-frontmatter", "remark-gfm"] };',
            filename: "remark.config.mjs",
        },
    ],
});
