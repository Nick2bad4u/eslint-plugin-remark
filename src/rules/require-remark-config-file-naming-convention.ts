/**
 * @packageDocumentation
 * Require canonical Remark config filenames for shared configuration files.
 */
import { arrayAt, stringSplit } from "ts-extras";

import type { RuleModuleWithDocs } from "../_internal/typed-rule.js";

import { isRemarkConfigFile } from "../_internal/remark-config-object.js";
import { createTypedRule, toRuleListener } from "../_internal/typed-rule.js";

type MessageIds = "requireCanonicalRemarkConfigFilename";
type Options = readonly [];

const canonicalRemarkConfigFilenamePattern =
    /^remark\.config\.(?:[cm]?js|[cm]?ts)$/v;

const getBasename = (filename: string): string => {
    const windowsSeparators = stringSplit(filename, "\\");
    const lastWindowsSegment = arrayAt(windowsSeparators, -1) ?? filename;
    const posixSeparators = stringSplit(lastWindowsSegment, "/");

    return arrayAt(posixSeparators, -1) ?? lastWindowsSegment;
};

/** Rule module that requires canonical `remark.config.*` naming. */
const requireRemarkConfigFileNamingConventionRule: RuleModuleWithDocs<
    MessageIds,
    Options
> = createTypedRule({
    create(context) {
        const physicalFilename = context.physicalFilename;

        if (!isRemarkConfigFile(physicalFilename)) {
            return {};
        }

        if (physicalFilename === "<input>") {
            return {};
        }

        const basename = getBasename(physicalFilename);

        if (canonicalRemarkConfigFilenamePattern.test(basename)) {
            return {};
        }

        return toRuleListener({
            Program() {
                context.report({
                    messageId: "requireCanonicalRemarkConfigFilename",
                    node: context.sourceCode.ast,
                });
            },
        });
    },
    meta: {
        deprecated: false,
        docs: {
            configs: [
                "remark.configs.recommended",
                "remark.configs.configuration",
                "remark.configs.all",
            ],
            description:
                "require canonical `remark.config.*` naming for shared Remark config files.",
            frozen: false,
            recommended: true,
            requiresTypeChecking: false,
            url: "https://nick2bad4u.github.io/eslint-plugin-remark/docs/rules/require-remark-config-file-naming-convention",
        },
        messages: {
            requireCanonicalRemarkConfigFilename:
                "Use canonical `remark.config.*` naming for shared Remark config files to improve discoverability.",
        },
        schema: [],
        type: "suggestion",
    },
    name: "require-remark-config-file-naming-convention",
});

export default requireRemarkConfigFileNamingConventionRule;
