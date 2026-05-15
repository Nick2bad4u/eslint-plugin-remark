/**
 * @packageDocumentation
 * Require package-backed Remark plugins to be installed.
 */
import type { RuleModuleWithDocs } from "../_internal/typed-rule.js";

import { createRemarkConfigRequireInstalledPackageOptionRule } from "../_internal/remark-config-package-option-rule.js";

/** Rule module that requires top-level Remark `plugins` packages to exist. */
const requireRemarkPluginsPackagesInstalledRule: RuleModuleWithDocs<
    "requireInstalledPackage",
    readonly []
> = createRemarkConfigRequireInstalledPackageOptionRule({
    meta: {
        deprecated: false,
        docs: {
            configs: [
                "remark.configs.recommended",
                "remark.configs.configuration",
                "remark.configs.all",
            ],
            description:
                "require package-backed Remark `plugins` entries to be listed in workspace dependencies.",
            frozen: false,
            recommended: true,
            requiresTypeChecking: false,
            url: "https://nick2bad4u.github.io/eslint-plugin-remark/docs/rules/require-remark-plugins-packages-installed",
        },
        messages: {
            requireInstalledPackage:
                "Add `{{packageName}}` to this workspace's dependencies before referencing it from Remark `plugins`.",
        },
        schema: [],
        type: "problem",
    },
    name: "require-remark-plugins-packages-installed",
    optionName: "plugins",
});

export default requireRemarkPluginsPackagesInstalledRule;
