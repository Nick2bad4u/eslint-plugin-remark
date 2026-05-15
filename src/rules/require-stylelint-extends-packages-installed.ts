/**
 * @packageDocumentation
 * Require Stylelint extends package specifiers to resolve from dependencies.
 */
import type { RuleModuleWithDocs } from "../_internal/typed-rule.js";

import { createStylelintConfigRequireInstalledPackageOptionRule } from "../_internal/stylelint-config-package-option-rule.js";

/**
 * Rule module that requires package-backed `extends` entries to exist in
 * workspace dependencies.
 */
const requireStylelintExtendsPackagesInstalledRule: RuleModuleWithDocs<
    "requireInstalledPackage",
    readonly []
> = createStylelintConfigRequireInstalledPackageOptionRule({
    meta: {
        deprecated: false,
        docs: {
            configs: [
                "stylelint2.configs.recommended",
                "stylelint2.configs.configuration",
                "stylelint2.configs.all",
            ],
            description:
                "require top-level Stylelint `extends` package specifiers to be listed in workspace dependencies.",
            frozen: false,
            recommended: true,
            requiresTypeChecking: false,
            url: "https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/require-stylelint-extends-packages-installed",
        },
        messages: {
            requireInstalledPackage:
                "Add `{{packageName}}` to dependencies for this shared config, or remove the unresolved `extends` reference.",
        },
        schema: [],
        type: "problem",
    },
    name: "require-stylelint-extends-packages-installed",
    optionName: "extends",
});

export default requireStylelintExtendsPackagesInstalledRule;
