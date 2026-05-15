/**
 * @packageDocumentation
 * Require canonical Stylelint config filenames for shared configuration files.
 */
import { arrayAt, stringSplit } from "ts-extras";

import type { RuleModuleWithDocs } from "../_internal/typed-rule.js";

import { isStylelintConfigFile } from "../_internal/stylelint-config-object.js";
import { createTypedRule, toRuleListener } from "../_internal/typed-rule.js";

type MessageIds = "requireCanonicalStylelintConfigFilename";
type Options = readonly [];

const canonicalStylelintConfigFilenamePattern =
    /^stylelint\.config\.(?:[cm]?js|[cm]?ts)$/v;

const getBasename = (filename: string): string => {
    const windowsSeparators = stringSplit(filename, "\\");
    const lastWindowsSegment = arrayAt(windowsSeparators, -1) ?? filename;
    const posixSeparators = stringSplit(lastWindowsSegment, "/");

    return arrayAt(posixSeparators, -1) ?? lastWindowsSegment;
};

/**
 * Rule module that requires canonical `stylelint.config.*` naming.
 */
const requireStylelintConfigFileNamingConventionRule: RuleModuleWithDocs<
    MessageIds,
    Options
> = createTypedRule({
    create(context) {
        const physicalFilename = context.physicalFilename;

        if (!isStylelintConfigFile(physicalFilename)) {
            return {};
        }

        if (physicalFilename === "<input>") {
            return {};
        }

        const basename = getBasename(physicalFilename);

        if (canonicalStylelintConfigFilenamePattern.test(basename)) {
            return {};
        }

        return toRuleListener({
            Program() {
                context.report({
                    messageId: "requireCanonicalStylelintConfigFilename",
                    node: context.sourceCode.ast,
                });
            },
        });
    },
    meta: {
        deprecated: false,
        docs: {
            configs: [
                "stylelint2.configs.recommended",
                "stylelint2.configs.configuration",
                "stylelint2.configs.all",
            ],
            description:
                "require canonical `stylelint.config.*` naming for shared Stylelint config files.",
            frozen: false,
            recommended: true,
            requiresTypeChecking: false,
            url: "https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/require-stylelint-config-file-naming-convention",
        },
        messages: {
            requireCanonicalStylelintConfigFilename:
                "Use canonical `stylelint.config.*` naming for shared Stylelint config files to improve discoverability.",
        },
        schema: [],
        type: "suggestion",
    },
    name: "require-stylelint-config-file-naming-convention",
});

export default requireStylelintConfigFileNamingConventionRule;
