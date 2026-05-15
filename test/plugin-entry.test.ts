/**
 * @packageDocumentation
 * Vitest coverage for the public plugin entry module.
 */
import { createRequire } from "node:module";
import { describe, expect, it } from "vitest";

import stylelint2Plugin from "../src/plugin";

const requireFromTestModule = createRequire(import.meta.url);
const packageJson = requireFromTestModule("../package.json") as {
    name: string;
    version: string;
};

const expectedPluginVersion = packageJson.version;
const packageName = packageJson.name;

describe("plugin entry module", () => {
    it("exports the default plugin object with rule and config registries", () => {
        expect.hasAssertions();

        expect(stylelint2Plugin).toStrictEqual(
            expect.objectContaining({
                configs: expect.any(Object),
                meta: expect.any(Object),
                processors: expect.any(Object),
                rules: expect.any(Object),
            })
        );

        expect(stylelint2Plugin.meta).toStrictEqual(
            expect.objectContaining({
                name: "eslint-plugin-stylelint-2",
                namespace: "stylelint-2",
                version: expectedPluginVersion,
            })
        );
    });

    it("exports the rebuilt rule names", () => {
        expect.hasAssertions();

        expect(
            Object.keys(stylelint2Plugin.rules).toSorted((left, right) =>
                left.localeCompare(right)
            )
        ).toStrictEqual([
            "disallow-stylelint-allow-empty-input",
            "disallow-stylelint-configuration-comment",
            "disallow-stylelint-custom-syntax",
            "disallow-stylelint-default-severity",
            "disallow-stylelint-duplicate-extends",
            "disallow-stylelint-duplicate-plugins",
            "disallow-stylelint-duplicate-rule-option-values",
            "disallow-stylelint-empty-rules-object",
            "disallow-stylelint-ignore-disables",
            "disallow-stylelint-ignore-files",
            "disallow-stylelint-null-rule-config",
            "disallow-stylelint-overrides-runtime-options",
            "disallow-stylelint-processors",
            "disallow-stylelint-relative-extends-paths",
            "disallow-stylelint-relative-plugin-paths",
            "prefer-stylelint-cache",
            "prefer-stylelint-define-config",
            "prefer-stylelint-extends-array",
            "prefer-stylelint-fix",
            "prefer-stylelint-formatter",
            "prefer-stylelint-plugins-array",
            "prefer-stylelint-report-descriptionless-disables",
            "prefer-stylelint-report-invalid-scope-disables",
            "prefer-stylelint-report-needless-disables",
            "prefer-stylelint-report-unscoped-disables",
            "require-stylelint-config-file-naming-convention",
            "require-stylelint-custom-syntax-in-overrides",
            "require-stylelint-extends-packages-installed",
            "require-stylelint-overrides-configuration",
            "require-stylelint-overrides-files",
            "require-stylelint-overrides-files-array",
            "require-stylelint-plugins-packages-installed",
            "require-stylelint-report-disables",
            "require-stylelint-rules-object",
            "sort-stylelint-extends",
            "sort-stylelint-plugins",
            "sort-stylelint-rule-keys",
            "stylelint",
        ]);
    });

    it("resolves the package through self-reference ESM import", async () => {
        expect.hasAssertions();

        // eslint-disable-next-line no-unsanitized/method -- packageName comes from the local package.json fixture for this repository.
        const runtimeModule = (await import(packageName)) as {
            default: unknown;
        };

        expect(runtimeModule.default).toStrictEqual(
            expect.objectContaining({
                meta: expect.objectContaining({
                    name: "eslint-plugin-stylelint-2",
                    namespace: "stylelint-2",
                    version: expectedPluginVersion,
                }),
            })
        );
    });

    it("resolves the package through self-reference CJS require", () => {
        expect.hasAssertions();

        const runtimePlugin = requireFromTestModule(
            "eslint-plugin-stylelint-2"
        ) as {
            meta?: {
                name?: string;
                namespace?: string;
                version?: string;
            };
        };

        expect(runtimePlugin.meta).toStrictEqual(
            expect.objectContaining({
                name: "eslint-plugin-stylelint-2",
                namespace: "stylelint-2",
                version: expectedPluginVersion,
            })
        );
    });
});
