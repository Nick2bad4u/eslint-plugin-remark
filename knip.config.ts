/**
 * Repository-specific configuration for Knip dependency analysis.
 *
 * @packageDocumentation
 */
import type { KnipConfig } from "knip";

/**
 * Knip configuration that scopes entry points and dependency heuristics to the
 * repository layout.
 */
const knipConfig: KnipConfig = {
    $schema: "https://unpkg.com/knip@6/schema.json",
    eslint: {
        config: ["eslint.config.mjs"],
    },
    ignoreBinaries: [
        // These tools intentionally provide or install native binaries without
        // exposing npm package bin metadata that Knip can resolve.
        "actionlint",
        "gitleaks",
        "grype",
        "lychee",
        // Knip can mistake its TypeScript config filename for a binary.
        "knip.config.ts",
    ],
    ignoreDependencies: [
        // Docusaurus and TypeDoc discover these plugins and shared configs from
        // configuration values or JSON files rather than static imports.
        "@easyops-cn/docusaurus-search-local",
        "@easyops-cn/docusaurus-theme-docusaurus-search-local",
        "@double-great/stylelint-a11y",
        "@stylistic/stylelint-plugin",
        "gitcliff-config-nick2bad4u",
        "gitleaks-config-nick2bad4u",
        "jscpd-config-nick2bad4u",
        "lychee-config-nick2bad4u",
        "ncu-config-nick2bad4u",
        "react",
        "stylelint-formatter-pretty",
        // Stryker expands these plugin-family patterns at runtime; they are not
        // package imports Knip can resolve statically.
        "@stryker-ignorer/console-all",
        /^@stryker-ignorer\/\*$/v,
        /^@stryker-mutator\/\*$/v,
        "tsdoc-config-nick2bad4u",
        "typedoc-config-nick2bad4u",
        "yamllint-config-nick2bad4u",
    ],
    ignoreExportsUsedInFile: {
        interface: true,
        type: true,
    },
    ignoreFiles: [
        "benchmarks/fixtures/remark.config.invalid.ts",
        "plugin.d.mts",
        "scripts/indexnow.d.mts",
        "scripts/parse-npm-pack-filename.d.mts",
        "scripts/sync-presets-rules-matrix.d.mts",
        "scripts/sync-readme-rules-table.d.mts",
    ],
    ignoreIssues: {
        ".secretlintrc.cjs": ["exports"],
        "docs/docusaurus/src/**/*.css.d.ts": ["exports"],
        "docs/docusaurus/src/theme/Navbar/Content/index.tsx": ["exports"],
        "vitest.stryker.config.ts": ["exports"],
    },
    ignoreUnresolved: [
        "postcss-html",
        "postcss-scss",
        "postcss-styled-jsx",
        "postcss-styled-syntax",
        "stylelint-config-recess-order",
        "stylelint-config-standard-scss",
        "stylelint-config-tailwindcss",
        "stylelint-declaration-block-no-ignored-properties",
        "stylelint-declaration-strict-value",
        "stylelint-gamut",
        "stylelint-group-selectors",
        "stylelint-high-performance-animation",
        "stylelint-media-use-custom-media",
        "stylelint-no-browser-hacks",
        "stylelint-no-unsupported-browser-features",
        "stylelint-plugin-container-query-sanity/configs/container-query-all",
        "stylelint-plugin-css-performance-budget/configs/performance-budget-all",
        "stylelint-plugin-defensive-css",
        "stylelint-plugin-docusaurus/configs/docusaurus-all",
        "stylelint-plugin-font",
        "stylelint-plugin-font/configs/font-all",
        "stylelint-plugin-grid/configs/grid-all",
        "stylelint-plugin-use-baseline",
        "stylelint-prettier",
        "stylelint-scales",
        "stylelint-use-nesting",
        "stylelint-value-no-unknown-custom-properties",
        "tslib",
    ],
    includeEntryExports: true,
    rules: {
        binaries: "error",
        catalog: "error",
        dependencies: "error",
        devDependencies: "error",
        duplicates: "error",
        enumMembers: "warn",
        exports: "warn",
        files: "error",
        namespaceMembers: "warn",
        nsExports: "warn",
        nsTypes: "warn",
        optionalPeerDependencies: "error",
        types: "warn",
        unlisted: "error",
        unresolved: "error",
    },
    workspaces: {
        ".": {
            entry: [
                ".secretlintrc.cjs",
                "src/_internal/remark-worker.ts",
                "src/plugin.ts",
                "vitest.stryker.config.ts",
            ],
            project: [
                "*.{cjs,cts,js,mjs,mts,ts}",
                "benchmarks/**/*.{js,mjs,ts}",
                "scripts/**/*.{js,mjs,mts,ts}",
                "src/**/*.{js,ts,tsx,jsx,mts,cjs,cts,mjs}",
                "test/**/*.{js,mjs,mts,ts}",
            ],
        },
        "docs/docusaurus": {
            entry: ["sidebars*.ts", "src/**/*.{ts,tsx}"],
        },
    },
};

export default knipConfig;
