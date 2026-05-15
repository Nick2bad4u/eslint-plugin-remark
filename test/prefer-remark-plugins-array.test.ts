import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "prefer-remark-plugins-array",
    getPluginRule("prefer-remark-plugins-array"),
    {
        invalid: [
            {
                code: 'export default { plugins: "remark-gfm" };',
                errors: [{ messageId: "preferArray" }],
                filename: "remark.config.mjs",
                output: 'export default { plugins: ["remark-gfm"] };',
            },
        ],
        valid: [
            {
                code: 'export default { plugins: ["remark-gfm"] };',
                filename: "remark.config.mjs",
            },
            {
                code: 'export default { settings: { bullet: "*" } };',
                filename: "remark.config.mjs",
            },
        ],
    }
);
