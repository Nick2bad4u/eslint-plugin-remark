import type { JSX } from "react";

import clsx from "clsx";
import Link from "@docusaurus/Link";
import Heading from "@theme/Heading";

import styles from "./styles.module.css";

type ExternalFeature = Readonly<{
    description: string;
    href: string;
    icon: string;
    linkLabel: string;
    toneClassName: string;
    title: string;
}>;

type InternalFeature = Readonly<{
    description: string;
    icon: string;
    linkLabel: string;
    toneClassName: string;
    title: string;
    to: string;
}>;

type Feature = ExternalFeature | InternalFeature;

const features: readonly Feature[] = [
    {
        description:
            "Install the plugin, enable a preset, and start enforcing modern Stylelint config and rule-authoring patterns.",
        icon: "",
        linkLabel: "Open section →",
        title: "Get Started",
        toneClassName: styles["cardStarted"] ?? "",
        to: "/docs/rules/getting-started",
    },
    {
        description:
            "Choose the right preset for your team, from minimal baseline policy to full strict config-authoring coverage.",
        icon: "",
        linkLabel: "Open section →",
        title: "Presets",
        toneClassName: styles["cardPresets"] ?? "",
        to: "/docs/rules/presets",
    },
    {
        description:
            "Browse every rule with concrete incorrect/correct examples, actionable diagnostics, and migration guidance.",
        icon: "󰘥",
        linkLabel: "Open section →",
        title: "Rule Reference",
        toneClassName: styles["cardRules"] ?? "",
        to: "/docs/rules/overview",
    },
];

/** Render the homepage feature cards that route users into core docs areas. */
export default function HomepageFeatures(): JSX.Element {
    const cardClassName = styles["card"] ?? "";
    const featuresClassName = styles["features"] ?? "";
    const gridClassName = styles["grid"] ?? "";
    const linkClassName = styles["link"] ?? "";
    const descriptionClassName = styles["description"] ?? "";
    const footerClassName = styles["featureFooter"] ?? "";
    const iconClassName = styles["icon"] ?? "";

    return (
        <section className={featuresClassName}>
            <div className="container">
                <div className={gridClassName}>
                    {features.map((feature) => (
                        <article
                            key={feature.title}
                            className={clsx(
                                "card",
                                cardClassName,
                                feature.toneClassName
                            )}
                            data-sb-hover="lift"
                        >
                            <Heading as="h2">{feature.title}</Heading>
                            <p className={descriptionClassName}>
                                {feature.description}
                            </p>
                            <div className={footerClassName}>
                                {"href" in feature ? (
                                    <Link
                                        className={linkClassName}
                                        href={feature.href}
                                    >
                                        {feature.linkLabel}
                                    </Link>
                                ) : (
                                    <Link
                                        className={linkClassName}
                                        to={feature.to}
                                    >
                                        {feature.linkLabel}
                                    </Link>
                                )}
                                <span
                                    className={iconClassName}
                                    aria-hidden="true"
                                >
                                    {feature.icon}
                                </span>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
