import type { ReactNode } from "react";

import clsx from "clsx";
import {
    ErrorCauseBoundary,
    ThemeClassNames,
    useThemeConfig,
} from "@docusaurus/theme-common";
import {
    splitNavbarItems,
    useNavbarMobileSidebar,
} from "@docusaurus/theme-common/internal";
import NavbarColorModeToggle from "@theme/Navbar/ColorModeToggle";
import NavbarLogo from "@theme/Navbar/Logo";
import NavbarMobileSidebarToggle from "@theme/Navbar/MobileSidebar/Toggle";
import NavbarSearch from "@theme/Navbar/Search";
import NavbarItem from "@theme/NavbarItem";
import SearchBar from "@theme/SearchBar";

import type { Props as NavbarItemConfig } from "@theme/NavbarItem";

import styles from "./styles.module.css";

const useNavbarItems = (): NavbarItemConfig[] =>
    useThemeConfig().navbar.items as NavbarItemConfig[];

function NavbarItems({
    items,
}: Readonly<{ items: readonly NavbarItemConfig[] }>): ReactNode {
    return items.map((item, index) => (
        <ErrorCauseBoundary
            key={`${item.type ?? "default"}-${String(index)}`}
            onError={(error) =>
                new Error(
                    `A theme navbar item failed to render.\nPlease double-check the following navbar item (themeConfig.navbar.items) of your Docusaurus config:\n${JSON.stringify(item, null, 2)}`,
                    { cause: error }
                )
            }
        >
            <NavbarItem {...item} />
        </ErrorCauseBoundary>
    ));
}

function NavbarContentLayout({
    left,
    right,
}: Readonly<{
    left: ReactNode;
    right: ReactNode;
}>): ReactNode {
    return (
        <div className={clsx("navbar__inner", styles["navbarContent"])}>
            <div
                className={clsx(
                    ThemeClassNames.layout.navbar.containerLeft,
                    "navbar__items"
                )}
            >
                {left}
            </div>
            <div
                className={clsx(
                    ThemeClassNames.layout.navbar.containerRight,
                    "navbar__items navbar__items--right"
                )}
            >
                {right}
            </div>
        </div>
    );
}

/** Render the customized Docusaurus navbar content and search behavior. */
export default function NavbarContent(): ReactNode {
    const mobileSidebar = useNavbarMobileSidebar();
    const items = useNavbarItems();
    const [leftItems, rightItems] = splitNavbarItems(items);

    const rightSearchItems = rightItems.filter(
        (item) => item.type === "search"
    );
    const rightItemsWithoutSearch = rightItems.filter(
        (item) => item.type !== "search"
    );

    return (
        <NavbarContentLayout
            left={
                <>
                    {!mobileSidebar.disabled && <NavbarMobileSidebarToggle />}
                    <NavbarLogo />
                    <NavbarItems items={leftItems} />
                </>
            }
            right={
                <>
                    <NavbarItems items={rightItemsWithoutSearch} />
                    <NavbarColorModeToggle
                        className={
                            styles["colorModeToggle"] ?? "colorModeToggle"
                        }
                    />
                    {rightSearchItems.length > 0 ? (
                        <NavbarItems items={rightSearchItems} />
                    ) : (
                        <NavbarSearch>
                            <SearchBar />
                        </NavbarSearch>
                    )}
                </>
            }
        />
    );
}
