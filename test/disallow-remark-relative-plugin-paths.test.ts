import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "disallow-remark-relative-plugin-paths",
    getPluginRule("disallow-remark-relative-plugin-paths"),
    {
        invalid: [
            {
                code: 'export default { plugins: ["./local-remark-plugin.mjs"] };',
                errors: [{ messageId: "disallowRelative" }],
                filename: "remark.config.mjs",
            },
        ],
        valid: [
            {
                code: 'export default { plugins: ["remark-gfm"] };',
                filename: "remark.config.mjs",
            },
        ],
    }
);
