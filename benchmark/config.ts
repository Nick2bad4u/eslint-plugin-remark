import { defineConfig } from "eslint-rule-benchmark";

export default defineConfig({
    iterations: 80,
    tests: [
        {
            cases: [
                {
                    testPath:
                        "./cases/prefer-stylelint-define-config/stylelint.config.ts",
                },
                {
                    testPath:
                        "./cases/prefer-stylelint-define-config/stylelint.config.mts",
                },
            ],
            name: "Rule: prefer-stylelint-define-config",
            ruleId: "stylelint-2/prefer-stylelint-define-config",
            rulePath: "../src/rules/prefer-stylelint-define-config.ts",
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
