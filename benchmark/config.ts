import { defineConfig } from "eslint-rule-benchmark";

export default defineConfig({
    iterations: 80,
    tests: [
        {
            cases: [
                {
                    testPath:
                        "./cases/prefer-remark-plugins-array/remark.config.ts",
                },
                {
                    testPath:
                        "./cases/prefer-remark-plugins-array/remark.config.mts",
                },
            ],
            name: "Rule: prefer-remark-plugins-array",
            ruleId: "remark/prefer-remark-plugins-array",
            rulePath: "../src/rules/prefer-remark-plugins-array.ts",
            warmup: {
                iterations: 15,
            },
        },
    ],
    timeout: 3000,
    warmup: {
        enabled: true,
        iterations: 20,
    },
});
