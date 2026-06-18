import { createConfig } from "eslint-config-nick2bad4u";

import plugin from "./plugin.mjs";

/** @type {import("./src/plugin").RemarkPlugin} */
const remarkPlugin = /** @type {import("./src/plugin").RemarkPlugin} */ (
    plugin
);
const configurationPreset = remarkPlugin.configs.configuration;

if (Array.isArray(configurationPreset)) {
    throw new TypeError(
        "Expected remark.configs.configuration to be a flat config object."
    );
}

/** @type {import("eslint").Linter.Config} */
const localConfigurationPreset = /** @type {import("eslint").Linter.Config} */ (
    configurationPreset
);

/** @type {import("eslint").Linter.Config[]} */
const config = [
    ...createConfig({
        allowDefaultProjectFilePatterns: [
            ".remarkrc.mjs",
            "commitlint.config.mjs",
            "eslint.config.mjs",
            "knip.config.ts",
            "prettier.config.mjs",
            "stylelint.config.mjs",
            "vitest.stryker.config.ts",
        ],
        plugins: {
            remark: false,
        },
    }),
    {
        ignores: [
            "benchmark/**",
            "benchmarks/**",
            "docs/docusaurus/typedoc-plugins/**",
            "plugin.d.cts",
            "plugin.d.mts",
            "plugin.mjs",
            "stryker.config.mjs",
            "test/**/*.test-d.ts",
            "untyped-third-party-modules.d.ts",
        ],
    },

    // Local Plugin Config
    // This lets us use the plugin's config-authoring rules in this repository
    // without needing to publish the plugin first.
    {
        ...localConfigurationPreset,
        name: "Local Remark config rules",
    },
    {
        files: [
            "benchmark/**/*.{js,mjs,cjs,ts,mts,cts,tsx,jsx}",
            "benchmarks/**/*.{js,mjs,cjs,ts,mts,cts,tsx,jsx}",
        ],
        name: "Benchmarks: relax vitest assertion-count rule",
        rules: {
            // Benchmark callbacks measure runtime cost and do not always
            // represent assertion-driven correctness tests.
            "vitest/prefer-expect-assertions": "off",
        },
    },
    {
        files: [".remarkrc.mjs"],
        name: "Local Remark Config File",
        rules: {
            "remark/require-remark-config-file-naming-convention": "off",
        },
    },
    {
        files: [".github/workflows/**/*.yml"],
        name: "Workflow Shared Script Conventions",
        rules: {
            "github-actions/require-run-step-shell": "off",
        },
    },
    {
        files: ["docs/docusaurus/docusaurus.config.ts"],
        name: "Docusaurus Config Runtime Environment",
        rules: {
            "n/no-process-env": "off",
            "n/no-sync": "off",
            "perfectionist/sort-objects": "off",
            "regexp/require-unicode-sets-regexp": "off",
            "regexp/sort-character-class-elements": "off",
            "security/detect-non-literal-fs-filename": "off",
            "unicorn/import-style": "off",
            "unicorn/no-non-function-verb-prefix": "off",
            "unicorn/no-unreadable-new-expression": "off",
            "unicorn/no-useless-fallback-in-spread": "off",
            "unicorn/prefer-includes-over-repeated-comparisons": "off",
            "unicorn/prefer-temporal": "off",
        },
    },
    {
        files: [
            "docs/docusaurus/sidebars*.ts",
            "docs/docusaurus/src/**/*.{ts,tsx}",
        ],
        name: "Docusaurus Browser And Sidebar Code",
        rules: {
            "@typescript-eslint/consistent-type-definitions": "off",
            "@typescript-eslint/dot-notation": "off",
            "@typescript-eslint/no-dynamic-delete": "off",
            "@typescript-eslint/no-unsafe-type-assertion": "off",
            "@typescript-eslint/restrict-template-expressions": "off",
            "canonical/filename-no-index": "off",
            "n/no-extraneous-import": "off",
            "n/no-sync": "off",
            "no-duplicate-imports": "off",
            "perfectionist/sort-imports": "off",
            "perfectionist/sort-jsx-props": "off",
            "perfectionist/sort-modules": "off",
            "perfectionist/sort-object-types": "off",
            "perfectionist/sort-objects": "off",
            "perfectionist/sort-union-types": "off",
            "prefer-named-capture-group": "off",
            "regexp/no-super-linear-backtracking": "off",
            "regexp/prefer-named-capture-group": "off",
            "regexp/require-unicode-sets-regexp": "off",
            "runtime-cleanup/no-unmanaged-event-listeners": "off",
            "unicorn/escape-case": "off",
            "unicorn/filename-case": "off",
            "unicorn/import-style": "off",
            "unicorn/no-array-sort": "off",
            "unicorn/no-break-in-nested-loop": "off",
            "unicorn/no-global-object-property-assignment": "off",
            "unicorn/no-unnecessary-global-this": "off",
            "unicorn/prefer-global-this": "off",
            "unicorn/prefer-import-meta-properties": "off",
            "unicorn/prefer-spread": "off",
            "unicorn/prefer-unicode-code-point-escapes": "off",
        },
    },
    {
        files: ["docs/docusaurus/src/**/*.css"],
        name: "Docusaurus CSS Shared Stylelint Boundaries",
        rules: {
            "stylelint-2/stylelint": "off",
        },
    },
    {
        files: ["src/**/*.{ts,mts,cts}", "test/**/*.{ts,mts,cts}"],
        name: "TypeScript Source Import Conventions",
        rules: {
            "no-duplicate-imports": "off",
            "unicorn/consistent-boolean-name": "off",
            "unicorn/import-style": "off",
        },
    },
    {
        files: [
            "src/_internal/remark-config-plugin-specifiers.ts",
            "src/_internal/remark-config-string-array-option-rule.ts",
            "src/_internal/remark-runner.ts",
            "src/_internal/remark-worker.ts",
            "src/rules/disallow-invalid-remark-plugin-tuples.ts",
            "src/rules/remark.ts",
            "src/rules/trim-remark-plugin-specifiers.ts",
        ],
        name: "Remark Bridge And Fixer Internals",
        rules: {
            "@typescript-eslint/no-unsafe-argument": "off",
            "@typescript-eslint/no-unsafe-assignment": "off",
            "@typescript-eslint/no-unsafe-member-access": "off",
            "typefest/prefer-ts-extras-is-defined": "off",
            "typefest/prefer-type-fest-array-element": "off",
            "unicorn/no-error-property-assignment": "off",
            "unicorn/no-top-level-assignment-in-function": "off",
            "unicorn/no-unsafe-string-replacement": "off",
            "unicorn/try-complexity": "off",
        },
    },
    {
        files: ["src/_internal/markdown-parser.ts"],
        name: "Markdown Parser ESTree Shape Checks",
        rules: {
            "unicorn/prefer-includes-over-repeated-comparisons": "off",
        },
    },
    {
        files: ["src/_internal/rules-registry.ts"],
        name: "Rule Registry Imports",
        rules: {
            "import-x/max-dependencies": "off",
        },
    },
    {
        files: ["test/**/*.test.ts", "test/_internal/**/*.ts"],
        name: "RuleTester Suite Assertions",
        rules: {
            "no-empty": "off",
            "test-signal/no-weak-existence-assertions": "off",
            "test-signal/no-weak-truthy-assertions": "off",
            "test-signal/require-negative-path": "off",
            "unicorn/no-break-in-nested-loop": "off",
            "unicorn/no-top-level-side-effects": "off",
            "unicorn/no-unreadable-new-expression": "off",
            "unicorn/try-complexity": "off",
        },
    },
    {
        files: ["vite.config.ts"],
        name: "Vite Config Environment Parsing",
        rules: {
            "unicorn/prefer-number-coercion": "off",
        },
    },
    // Add repository-specific config entries below as needed.
];

export default config;
