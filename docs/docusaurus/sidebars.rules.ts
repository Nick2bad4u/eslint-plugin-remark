/**
 * @packageDocumentation
 * Dynamic sidebar generation for plugin rule documentation sections.
 */
import { readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

type SidebarDocItem = {
    className?: string;
    customProps?: Record<string, string>;
    id: string;
    label: string;
    type: "doc";
};

type SidebarLinkItem = {
    className?: string;
    customProps?: Record<string, string>;
    href: string;
    label: string;
    type: "link";
};

type SidebarCategoryItem = {
    className?: string;
    collapsed?: boolean;
    collapsible?: boolean;
    customProps?: Record<string, string>;
    items: SidebarItem[];
    label: string;
    link?:
        | {
              id: string;
              type: "doc";
          }
        | {
              description?: string;
              slug?: string;
              title?: string;
              type: "generated-index";
          };
    type: "category";
};

type SidebarItem = SidebarCategoryItem | SidebarDocItem | SidebarLinkItem;

const sidebarDirectoryPath = dirname(fileURLToPath(import.meta.url));
const rulesDirectoryPath = join(sidebarDirectoryPath, "..", "rules");
const nonRuleDocIds = new Set(["getting-started", "overview"]);
const pinnedRuleDocIds = ["stylelint"];
const pinnedRuleDocIdSet = new Set(pinnedRuleDocIds);

const isMarkdownFile = (fileName: string): boolean => fileName.endsWith(".md");
const toRuleDocId = (fileName: string): string => fileName.slice(0, -3);

const discoveredRuleDocIds = readdirSync(rulesDirectoryPath, {
    withFileTypes: true,
})
    .filter((entry) => entry.isFile() && isMarkdownFile(entry.name))
    .map((entry) => toRuleDocId(entry.name))
    .filter((ruleDocId) => !nonRuleDocIds.has(ruleDocId));

const ruleDocIds = [
    ...pinnedRuleDocIds.filter((ruleDocId) =>
        discoveredRuleDocIds.includes(ruleDocId)
    ),
    ...discoveredRuleDocIds
        .filter((ruleDocId) => !pinnedRuleDocIdSet.has(ruleDocId))
        .sort((left, right) => left.localeCompare(right)),
];

const toNumberedRuleLabel = (ruleNumber: number, ruleDocId: string): string =>
    `${String(ruleNumber).padStart(2, "0")} ${ruleDocId}`;

const stylelintRuleItems: SidebarDocItem[] = ruleDocIds.map(
    (ruleDocId, index) => ({
        id: ruleDocId,
        label: toNumberedRuleLabel(index + 1, ruleDocId),
        type: "doc",
    })
);

/** Complete sidebar structure for docs site navigation. */
const sidebars: SidebarsConfig = {
    rules: [
        {
            className: "sb-cat-guides",
            collapsed: false,
            collapsible: true,
            type: "category",
            label: "🧭 Guides",
            items: [
                {
                    id: "guides/intro",
                    label: "🏁 Overview",
                    type: "doc",
                },
                {
                    id: "guides/getting-started",
                    label: "🚀 Getting Started",
                    type: "doc",
                },
                {
                    id: "guides/stylelint-bridge",
                    label: "🎨 Stylelint Bridge",
                    type: "doc",
                },
                {
                    id: "guides/config-authoring",
                    label: "🛠️ Config Authoring",
                    type: "doc",
                },
                {
                    id: "guides/faq",
                    label: "❓ FAQ",
                    type: "doc",
                },
            ],
        },
        {
            className: "sb-cat-presets",
            collapsed: false,
            collapsible: true,
            description:
                "Pre-configured sets of rules for common use cases and configurations.",
            customProps: {
                badge: "presets",
            },
            type: "category",
            label: "🎛️ Presets",
            link: {
                type: "doc",
                id: "presets/index",
            },
            items: [
                {
                    className: "sb-preset-recommended",
                    id: "presets/recommended",
                    label: "🟡 Recommended",
                    type: "doc",
                },
                {
                    className: "sb-preset-stylelint-only",
                    id: "presets/stylelint-only",
                    label: "🎨 Stylelint bridge only",
                    type: "doc",
                },
                {
                    className: "sb-preset-configuration",
                    id: "presets/configuration",
                    label: "🔧 Configuration only",
                    type: "doc",
                },
                {
                    className: "sb-preset-all",
                    id: "presets/all",
                    label: "🟣 All",
                    type: "doc",
                },
            ],
        },
        {
            className: "sb-cat-rules",
            collapsed: false,
            collapsible: true,
            description:
                "The full set of rules provided by eslint-plugin-stylelint-2, including core rules for bridging Stylelint into ESLint and standardizing Stylelint config authoring, as well as rules for individual Stylelint rules.",
            customProps: {
                badge: "rules",
            },
            type: "category",
            label: "Rules",
            link: {
                type: "generated-index",
                title: "Rule Reference",
                slug: "/",
                description:
                    "Rule documentation for every eslint-plugin-stylelint-2 rule.",
            },
            items: stylelintRuleItems,
        },
    ],
} satisfies SidebarsConfig;

export default sidebars;
