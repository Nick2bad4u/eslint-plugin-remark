import type { JSX } from "react";

import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";

import GitHubStats from "../components/GitHubStats";
import HomepageFeatures from "../components/HomepageFeatures";
import styles from "./index.module.css";

type HeroBadge = Readonly<{
    description: string;
    icon: string;
    label: string;
}>;

type HeroQuickLink = Readonly<
    | {
          label: string;
          to: string;
      }
    | {
          href: string;
          label: string;
      }
>;

const heroBadges = [
    {
        description:
            "Drop-in bridge for running Remark inside your existing ESLint command and editor workflow.",
        icon: "\uf013",
        label: "ESLint-first workflow",
    },
    {
        description:
            "Configuration-focused rules that make Remark disable comments and reporting defaults safer.",
        icon: "\ue628",
        label: "Safer config authoring",
    },
    {
        description:
            "Actionable diagnostics with autofixes and suggestions where automatic changes are safe.",
        icon: "\uf0ad",
        label: "DX-focused diagnostics",
    },
] as const satisfies readonly HeroBadge[];

const heroQuickLinks = [
    {
        label: "📏 Rule catalog",
        to: "/docs/rules",
    },
    {
        label: "🎛️ Presets",
        to: "/docs/rules/presets",
    },
    {
        label: "🎨 Remark bridge",
        to: "/docs/rules/guides/remark-bridge",
    },
    {
        href: "https://remark.js.org/",
        label: "🧾 Remark docs",
    },
    {
        href: "https://github.com/Nick2bad4u/eslint-plugin-remark",
        label: "󰊤 GitHub",
    },
] as const satisfies readonly HeroQuickLink[];

const comparePresetsButtonIcon = "\udb85\udc92";
const heroKickerIcon = "\uf0ad";
const heroKickerIcon2 = "\uf135";
const overviewButtonIcon = "\udb81\udf1d";

const homepageDescription =
    "Explore eslint-plugin-remark docs, presets, and rules for running Remark through ESLint and enforcing safer Remark config authoring patterns.";
const homepageKeywords =
    "eslint-plugin-remark, remark, eslint, eslint plugin, markdown linting, flat config, remark config";
const homepageSocialImageUrl =
    "https://nick2bad4u.github.io/eslint-plugin-remark/img/logo.png";
const homepageStructuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    codeRepository: "https://github.com/Nick2bad4u/eslint-plugin-remark",
    description: homepageDescription,
    image: homepageSocialImageUrl,
    license:
        "https://github.com/Nick2bad4u/eslint-plugin-remark/blob/main/LICENSE",
    name: "eslint-plugin-remark",
    programmingLanguage: "TypeScript",
    runtimePlatform: "Node.js",
    url: "https://nick2bad4u.github.io/eslint-plugin-remark/",
} as const;

/** Render the docs landing page hero, quick links, and entry-point content. */
export default function Home(): JSX.Element {
    const logoSrc = useBaseUrl("/img/logo.svg");

    return (
        <Layout
            title="Remark + ESLint in one workflow | eslint-plugin-remark"
            description={homepageDescription}
        >
            <Head>
                <meta content={homepageKeywords} name="keywords" />
                <meta content={homepageSocialImageUrl} property="og:image" />
                <meta content="summary_large_image" name="twitter:card" />
                <meta content={homepageSocialImageUrl} name="twitter:image" />
                <script type="application/ld+json">
                    {JSON.stringify(homepageStructuredData)}
                </script>
            </Head>
            <header className={styles["heroBanner"]}>
                <div className={`container ${styles["heroContent"]}`}>
                    <div className={styles["heroGrid"]}>
                        <div>
                            <p className={styles["heroKicker"]}>
                                {`${heroKickerIcon} ESLint plugin for modern Markdown workflows ${heroKickerIcon2}`}
                            </p>
                            <Heading as="h1" className={styles["heroTitle"]}>
                                eslint-plugin-remark
                            </Heading>
                            <p className={styles["heroSubtitle"]}>
                                ESLint rules and bridge tooling that run{" "}
                                <Link
                                    className={`${styles["heroInlineLink"]} ${styles["heroInlineLinkRemark"]}`}
                                    href="https://remark.js.org/"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    Remark
                                </Link>{" "}
                                inside{" "}
                                <Link
                                    className={`${styles["heroInlineLink"]} ${styles["heroInlineLinkEslint"]}`}
                                    href="https://eslint.org/"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    ESLint
                                </Link>{" "}
                                while enforcing safer Remark configuration
                                patterns so diagnostics, autofixes, and CI stay
                                unified.
                            </p>
                            <div className={styles["heroBadgeRow"]}>
                                {heroBadges.map((badge) => (
                                    <article
                                        key={badge.label}
                                        className={styles["heroBadge"]}
                                    >
                                        <p className={styles["heroBadgeLabel"]}>
                                            <span
                                                aria-hidden="true"
                                                className={
                                                    styles["heroBadgeIcon"]
                                                }
                                            >
                                                {badge.icon}
                                            </span>
                                            {badge.label}
                                        </p>
                                        <p
                                            className={
                                                styles["heroBadgeDescription"]
                                            }
                                        >
                                            {badge.description}
                                        </p>
                                    </article>
                                ))}
                            </div>
                            <div className={styles["heroActions"]}>
                                <Link
                                    className={`button button--lg ${styles["heroActionButton"]} ${styles["heroActionPrimary"]}`}
                                    to="/docs/rules/overview"
                                >
                                    {overviewButtonIcon} Start with Overview
                                </Link>
                                <Link
                                    className={`button button--lg ${styles["heroActionButton"]} ${styles["heroActionSecondary"]}`}
                                    to="/docs/rules/presets"
                                >
                                    {comparePresetsButtonIcon} Compare Presets
                                </Link>
                            </div>
                        </div>
                        <aside className={styles["heroPanel"]}>
                            <img
                                alt="eslint-plugin-remark logo"
                                className={styles["heroPanelLogo"]}
                                decoding="async"
                                height="240"
                                loading="eager"
                                src={logoSrc}
                                width="240"
                            />
                        </aside>
                    </div>
                    <GitHubStats
                        className={styles["heroLiveBadges"] ?? "heroLiveBadges"}
                    />
                    <nav
                        aria-label="Quick documentation links"
                        className={styles["heroQuickLinks"]}
                    >
                        {heroQuickLinks.map((quickLink) => (
                            <Link
                                key={quickLink.label}
                                className={
                                    styles["heroQuickLink"] ?? "heroQuickLink"
                                }
                                {...("to" in quickLink
                                    ? { to: quickLink.to }
                                    : {
                                          href: quickLink.href,
                                          rel: "noopener noreferrer",
                                          target: "_blank",
                                      })}
                            >
                                {quickLink.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            </header>
            <HomepageFeatures />
        </Layout>
    );
}
