/**
 * @packageDocumentation
 * Subtle client-side interaction enhancements for the Docusaurus site.
 */

type CleanupFunction = () => void;

type CleanupRef = {
    current: CleanupFunction | null;
};

type SidebarLabelMutation = {
    readonly element: HTMLAnchorElement;
    readonly originalLabel: string;
};

declare global {
    interface Window {
        initializeDocsEnhancements?: typeof initializeAdvancedFeatures;
    }
}

const INITIAL_HYDRATION_DELAY_MS = 0;
const ROUTE_REFRESH_DELAY_MS = 100;
const SIDEBAR_TOKENIZED_DATA_KEY = "sbTokenized";

function isHTMLElement(element: Element | null): element is HTMLElement {
    return element instanceof HTMLElement;
}

function isNumberedRuleSidebarLink(link: HTMLAnchorElement): boolean {
    return link.closest(".sb-cat-rules-stylelint") !== null;
}

function getRuleNumberPrefix(
    label: string
): null | Readonly<{ numberToken: string; remainder: string }> {
    const match = /^(\d{2,3})\s+(.+)$/u.exec(label);

    if (match === null) {
        return null;
    }

    const [
        ,
        numberToken,
        remainder,
    ] = match;

    if (numberToken === undefined || remainder === undefined) {
        return null;
    }

    return {
        numberToken,
        remainder,
    };
}

function setSidebarLeadingToken(
    options: Readonly<{
        link: HTMLAnchorElement;
        remainderText: string;
        tokenClassName: string;
        tokenText: string;
    }>
): void {
    const { link, remainderText, tokenClassName, tokenText } = options;
    const token = document.createElement("span");

    token.className = tokenClassName;
    token.textContent = tokenText;
    link.dataset[SIDEBAR_TOKENIZED_DATA_KEY] = tokenClassName;

    link.replaceChildren(token, document.createTextNode(` ${remainderText}`));
}

function isSidebarLinkTokenized(link: HTMLAnchorElement): boolean {
    const tokenizedValue = link.dataset[SIDEBAR_TOKENIZED_DATA_KEY];

    return tokenizedValue !== undefined && tokenizedValue.length > 0;
}

function applySidebarLabelTokenColoring(): CleanupFunction {
    const mutations: SidebarLabelMutation[] = [];

    const processLinks = (sidebarLinks: readonly HTMLAnchorElement[]): void => {
        for (const link of sidebarLinks) {
            if (isSidebarLinkTokenized(link)) {
                continue;
            }

            const linkLabel = link.textContent?.trim();

            if (!linkLabel || !isNumberedRuleSidebarLink(link)) {
                continue;
            }

            const ruleNumberPrefix = getRuleNumberPrefix(linkLabel);

            if (ruleNumberPrefix === null) {
                continue;
            }

            mutations.push({
                element: link,
                originalLabel: linkLabel,
            });

            setSidebarLeadingToken({
                link,
                remainderText: ruleNumberPrefix.remainder,
                tokenClassName: "sb-inline-rule-number",
                tokenText: ruleNumberPrefix.numberToken,
            });
        }
    };

    const processSidebarMenuLinks = (): void => {
        const sidebarLinks = document.querySelectorAll<HTMLAnchorElement>(
            ".theme-doc-sidebar-menu .menu__link"
        );

        processLinks(Array.from(sidebarLinks));
    };

    processSidebarMenuLinks();

    const sidebarMenu = document.querySelector<HTMLElement>(
        ".theme-doc-sidebar-menu"
    );
    let sidebarRefreshTimer: null | ReturnType<typeof setTimeout> = null;

    const scheduleSidebarRefresh = (): void => {
        if (sidebarRefreshTimer !== null) {
            clearTimeout(sidebarRefreshTimer);
        }

        sidebarRefreshTimer = setTimeout(() => {
            processSidebarMenuLinks();
            sidebarRefreshTimer = null;
        }, 0);
    };

    const handleSidebarInteraction = (): void => {
        scheduleSidebarRefresh();
    };

    const sidebarObserver =
        sidebarMenu === null
            ? null
            : new MutationObserver(() => {
                  scheduleSidebarRefresh();
              });

    sidebarObserver?.observe(sidebarMenu ?? document.body, {
        childList: true,
        subtree: true,
    });

    sidebarMenu?.addEventListener("click", handleSidebarInteraction);

    return (): void => {
        sidebarMenu?.removeEventListener("click", handleSidebarInteraction);
        sidebarObserver?.disconnect();

        if (sidebarRefreshTimer !== null) {
            clearTimeout(sidebarRefreshTimer);
            sidebarRefreshTimer = null;
        }

        for (const mutation of mutations) {
            if (!mutation.element.isConnected) {
                continue;
            }

            delete mutation.element.dataset[SIDEBAR_TOKENIZED_DATA_KEY];
            mutation.element.textContent = mutation.originalLabel;
        }
    };
}

function createScrollIndicator(): CleanupFunction {
    const indicator = document.createElement("div");

    indicator.className = "scroll-indicator";
    indicator.style.cssText = [
        "position: fixed",
        "inset-block-start: 0",
        "inset-inline-start: 0",
        "z-index: 9999",
        "height: 3px",
        "width: 0%",
        "background: linear-gradient(90deg, var(--ifm-color-primary), var(--ifm-color-primary-light))",
        "pointer-events: none",
        "transition: width 80ms linear",
    ].join(";");

    document.body.append(indicator);

    const update = (): void => {
        const scrollTop =
            window.pageYOffset || document.documentElement.scrollTop;
        const documentHeight =
            document.documentElement.scrollHeight - window.innerHeight;
        const safeHeight = documentHeight > 0 ? documentHeight : 1;
        const scrollPercent = (scrollTop / safeHeight) * 100;

        indicator.style.width = `${Math.max(0, Math.min(100, scrollPercent))}%`;
    };

    window.addEventListener("scroll", update, { passive: true });
    update();

    return (): void => {
        window.removeEventListener("scroll", update);
        indicator.remove();
    };
}

function applyInteractiveHoverEffects(): CleanupFunction {
    const hoverElements = Array.from(
        document.querySelectorAll<HTMLElement>("[data-sb-hover]")
    );

    if (hoverElements.length === 0) {
        return (): void => {
            // No-op when no hover-enhanced elements are present.
        };
    }

    const cleanupFunctions = hoverElements.map((element) => {
        const setPointerPosition = (clientX: number, clientY: number): void => {
            const rectangle = element.getBoundingClientRect();
            const relativeX =
                ((clientX - rectangle.left) / rectangle.width) * 100;
            const relativeY =
                ((clientY - rectangle.top) / rectangle.height) * 100;

            element.style.setProperty("--sb-hover-x", `${relativeX}%`);
            element.style.setProperty("--sb-hover-y", `${relativeY}%`);
        };

        const handlePointerEnter = (event: PointerEvent): void => {
            element.classList.add("is-hover-active");
            setPointerPosition(event.clientX, event.clientY);
        };

        const handlePointerMove = (event: PointerEvent): void => {
            setPointerPosition(event.clientX, event.clientY);
        };

        const handlePointerLeave = (): void => {
            element.classList.remove("is-hover-active");
            element.style.removeProperty("--sb-hover-x");
            element.style.removeProperty("--sb-hover-y");
        };

        const handleFocus = (): void => {
            element.classList.add("is-hover-active");
            element.style.setProperty("--sb-hover-x", "50%");
            element.style.setProperty("--sb-hover-y", "50%");
        };

        const handleBlur = (): void => {
            handlePointerLeave();
        };

        element.addEventListener("pointerenter", handlePointerEnter);
        element.addEventListener("pointermove", handlePointerMove);
        element.addEventListener("pointerleave", handlePointerLeave);
        element.addEventListener("focus", handleFocus);
        element.addEventListener("blur", handleBlur);

        return (): void => {
            element.removeEventListener("pointerenter", handlePointerEnter);
            element.removeEventListener("pointermove", handlePointerMove);
            element.removeEventListener("pointerleave", handlePointerLeave);
            element.removeEventListener("focus", handleFocus);
            element.removeEventListener("blur", handleBlur);
            handlePointerLeave();
        };
    });

    return (): void => {
        cleanupFunctions.forEach((cleanup) => {
            cleanup();
        });
    };
}

function applyThemeToggleAnimation(): CleanupFunction {
    const themeToggle = document.querySelector(
        '[aria-label*="color mode"], [title*="Switch"]'
    );

    if (!isHTMLElement(themeToggle)) {
        return (): void => {
            // No-op when the theme toggle is unavailable.
        };
    }

    let animationTimer: null | ReturnType<typeof setTimeout> = null;

    const handleClick = (): void => {
        themeToggle.style.transform = "scale(0.94)";
        themeToggle.style.transition = "transform 120ms ease";

        if (animationTimer !== null) {
            clearTimeout(animationTimer);
        }

        animationTimer = setTimeout(() => {
            themeToggle.style.transform = "scale(1)";
            animationTimer = null;
        }, 90);
    };

    themeToggle.addEventListener("click", handleClick);

    return (): void => {
        if (animationTimer !== null) {
            clearTimeout(animationTimer);
            animationTimer = null;
        }

        themeToggle.removeEventListener("click", handleClick);
    };
}

function initializeAdvancedFeatures(): CleanupFunction {
    const cleanupFunctions: CleanupFunction[] = [];
    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    cleanupFunctions.push(createScrollIndicator());
    cleanupFunctions.push(applySidebarLabelTokenColoring());

    if (!prefersReducedMotion) {
        cleanupFunctions.push(applyInteractiveHoverEffects());
        cleanupFunctions.push(applyThemeToggleAnimation());
    }

    return (): void => {
        cleanupFunctions.forEach((cleanup) => {
            cleanup();
        });
    };
}

function initializeEnhancements(): CleanupFunction {
    const cleanupRef: CleanupRef = {
        current: null,
    };
    let initialSetupFrame: null | number = null;
    let initialSetupTimer: null | ReturnType<typeof setTimeout> = null;

    const setupEnhancements = (): void => {
        cleanupRef.current?.();
        cleanupRef.current = initializeAdvancedFeatures();
    };

    const cancelInitialSetup = (): void => {
        if (initialSetupFrame !== null) {
            window.cancelAnimationFrame(initialSetupFrame);
            initialSetupFrame = null;
        }

        if (initialSetupTimer !== null) {
            clearTimeout(initialSetupTimer);
            initialSetupTimer = null;
        }
    };

    const scheduleInitialSetup = (): void => {
        cancelInitialSetup();

        initialSetupFrame = window.requestAnimationFrame(() => {
            initialSetupFrame = null;

            initialSetupTimer = setTimeout(() => {
                initialSetupTimer = null;
                setupEnhancements();
            }, INITIAL_HYDRATION_DELAY_MS);
        });
    };

    const handleWindowLoad = (): void => {
        window.removeEventListener("load", handleWindowLoad);
        scheduleInitialSetup();
    };

    if (document.readyState === "complete") {
        scheduleInitialSetup();
    } else {
        window.addEventListener("load", handleWindowLoad, {
            once: true,
        });
    }

    let routeChangeTimer: null | ReturnType<typeof setTimeout> = null;
    let previousPathname = location.pathname;

    const observer = new MutationObserver(() => {
        if (location.pathname === previousPathname) {
            return;
        }

        previousPathname = location.pathname;

        if (routeChangeTimer !== null) {
            clearTimeout(routeChangeTimer);
        }

        routeChangeTimer = setTimeout(() => {
            setupEnhancements();
            routeChangeTimer = null;
        }, ROUTE_REFRESH_DELAY_MS);
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
    });

    const handleBeforeUnload = (): void => {
        window.removeEventListener("load", handleWindowLoad);
        cancelInitialSetup();
        cleanupRef.current?.();

        if (routeChangeTimer !== null) {
            clearTimeout(routeChangeTimer);
            routeChangeTimer = null;
        }

        observer.disconnect();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return (): void => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
        handleBeforeUnload();
    };
}

if (typeof window !== "undefined" && typeof document !== "undefined") {
    initializeEnhancements();
    window.initializeDocsEnhancements = initializeAdvancedFeatures;
}

export { initializeAdvancedFeatures, initializeEnhancements };
export default initializeEnhancements;
