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
        ],
        valid: [
            {
                code: 'export default { plugins: ["remark-gfm", "remark-frontmatter"] };',
                filename: "remark.config.mjs",
            },
        ],
    }
);
