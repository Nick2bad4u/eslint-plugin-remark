/**
 * @packageDocumentation
 * Disallow top-level Stylelint ignoreFiles configuration in authored config files.
 */
import type { RuleModuleWithDocs } from "../_internal/typed-rule.js";

import { createStylelintConfigDisallowedOptionRule } from "../_internal/stylelint-config-disallowed-option-rule.js";

/** Rule module that disallows `ignoreFiles` in Stylelint config files. */
const disallowStylelintIgnoreFilesRule: RuleModuleWithDocs<
    "disallowConfigOption",
    readonly []
> = createStylelintConfigDisallowedOptionRule({
    meta: {
        deprecated: false,
        docs: {
            configs: [
                "stylelint2.configs.configuration",
                "stylelint2.configs.all",
            ],
            description:
                "disallow configuring Stylelint's top-level `ignoreFiles` option inside authored Stylelint config files.",
            frozen: false,
            recommended: false,
            requiresTypeChecking: false,
            url: "https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-ignore-files",
        },
        fixable: "code",
        messages: {
            disallowConfigOption:
                "Remove `ignoreFiles` from the shared Stylelint config. Ignore coverage should be defined in .stylelintignore or invocation-level file globs so repositories keep predictable lint scope.",
        },
        schema: [],
        type: "suggestion",
    },
    name: "disallow-stylelint-ignore-files",
    optionName: "ignoreFiles",
});

export default disallowStylelintIgnoreFilesRule;
