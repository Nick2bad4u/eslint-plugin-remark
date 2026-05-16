import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "disallow-invalid-remark-plugin-tuples",
    getPluginRule("disallow-invalid-remark-plugin-tuples"),
    {
        invalid: [
            {
                code: "export default { plugins: [[]] };",
                errors: [{ messageId: "disallowInvalidTuple" }],
                filename: "remark.config.mjs",
            },
            {
                code: 'export default { plugins: [[{ heading: "contents" }]] };',
                errors: [{ messageId: "disallowInvalidTuple" }],
                filename: "remark.config.mjs",
            },
            {
                code: "export default { plugins: [[false, { strict: true }]] };",
                errors: [{ messageId: "disallowInvalidTuple" }],
                filename: "remark.config.mjs",
            },
            {
                code: "export default { plugins: [[[remarkToc], { heading: 'contents' }]] };",
                errors: [{ messageId: "disallowInvalidTuple" }],
                filename: "remark.config.mjs",
            },
            {
                code: "export default { plugins: [[...pluginTuple]] };",
                errors: [{ messageId: "disallowInvalidTuple" }],
                filename: "remark.config.mjs",
            },
        ],
        valid: [
            {
                code: 'export default { plugins: [["remark-toc", { heading: "contents" }]] };',
                filename: "remark.config.mjs",
            },
            {
                code: "export default { plugins: [[remarkToc, { heading: 'contents' }]] };",
                filename: "remark.config.mjs",
            },
            {
                code: "export default { plugins: [remarkGfm] };",
                filename: "remark.config.mjs",
            },
            {
                code: "export default { plugins: [...pluginList] };",
                filename: "remark.config.mjs",
            },
            {
                code: "export default { plugins: [[]] };",
                filename: "not-remark.config.mjs",
            },
        ],
    }
);
