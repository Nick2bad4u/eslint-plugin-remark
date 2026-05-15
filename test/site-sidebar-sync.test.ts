/**
 * @packageDocumentation
 * Contract tests that keep the Docusaurus rules sidebar synchronized with plugin rule docs.
 */
import { describe, expect, it } from "vitest";

// eslint-disable-next-line import-x/no-relative-packages -- The docs workspace is part of this monorepo and this contract test validates its sidebar output directly.
import sidebars from "../docs/docusaurus/sidebars.rules";
import stylelint2Plugin from "../src/plugin";

type SidebarItem = Readonly<
    | {
          href: string;
          type: "link";
      }
    | {
          id: string;
          type: "doc";
      }
    | {
          items: readonly SidebarItem[];
          type: "category";
      }
>;

const isObjectRecord = (value: unknown): value is Record<string, unknown> =>
    typeof value === "object" && value !== null;

const isSidebarItem = (value: unknown): value is SidebarItem => {
    if (!isObjectRecord(value) || typeof value["type"] !== "string") {
        return false;
    }

    if (value["type"] === "doc") {
        return typeof value["id"] === "string";
    }

    if (value["type"] === "category") {
        return (
            Array.isArray(value["items"]) && value["items"].every(isSidebarItem)
        );
    }

    if (value["type"] === "link") {
        return typeof value["href"] === "string";
    }

    return false;
};

const isDocSidebarItem = (
    item: SidebarItem
): item is Readonly<{ id: string; type: "doc" }> => item.type === "doc";

const isCategorySidebarItem = (
    item: SidebarItem
): item is Readonly<{ items: readonly SidebarItem[]; type: "category" }> =>
    item.type === "category";

const getRulesSidebarItems = (value: unknown): readonly SidebarItem[] => {
    if (!Array.isArray(value) || !value.every(isSidebarItem)) {
        return [];
    }

    return value;
};

const collectDocIds = (items: readonly SidebarItem[]): string[] => {
    const collectedDocIds: string[] = [];

    for (const item of items) {
        if (isDocSidebarItem(item)) {
            collectedDocIds.push(item.id);
        } else if (isCategorySidebarItem(item)) {
            collectedDocIds.push(...collectDocIds(item.items));
        } else {
            continue;
        }
    }

    return collectedDocIds;
};

describe("docusaurus rules sidebar sync", () => {
    it("includes every registered rule doc id in resolved sidebar items", () => {
        expect.hasAssertions();

        const rulesSidebarItems = getRulesSidebarItems(sidebars["rules"]);

        expect(rulesSidebarItems.length).toBeGreaterThan(0);

        const sidebarDocIds = new Set(collectDocIds(rulesSidebarItems));

        for (const ruleName of Object.keys(stylelint2Plugin.rules)) {
            expect(sidebarDocIds.has(ruleName)).toBeTruthy();
        }
    });
});
