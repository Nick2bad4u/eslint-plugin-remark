/**
 * @packageDocumentation
 * Vitest coverage for the public plugin entry module.
 */
import { createRequire } from "node:module";
import { describe, expect, it } from "vitest";

import remarkPlugin from "../src/plugin";

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

        expect(remarkPlugin).toStrictEqual(
            expect.objectContaining({
                configs: expect.any(Object),
                meta: expect.any(Object),
                processors: expect.any(Object),
                rules: expect.any(Object),
            })
        );

        expect(remarkPlugin.meta).toStrictEqual(
            expect.objectContaining({
                name: "eslint-plugin-remark",
                namespace: "remark",
                version: expectedPluginVersion,
            })
        );
    });

    it("exports the rebuilt rule names", () => {
        expect.hasAssertions();

        expect(
            Object.keys(remarkPlugin.rules).toSorted((left, right) =>
                left.localeCompare(right)
            )
        ).toStrictEqual([
            "disallow-empty-remark-config-values",
            "disallow-empty-remark-plugin-specifiers",
            "disallow-invalid-remark-plugin-tuples",
            "disallow-remark-duplicate-plugins",
            "disallow-remark-relative-plugin-paths",
            "disallow-unknown-remark-config-properties",
            "prefer-remark-plugins-array",
            "remark",
            "require-remark-config-file-naming-convention",
            "require-remark-plugins-packages-installed",
            "require-remark-settings-object",
            "sort-remark-plugins",
            "trim-remark-plugin-specifiers",
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
                    name: "eslint-plugin-remark",
                    namespace: "remark",
                    version: expectedPluginVersion,
                }),
            })
        );
    });

    it("resolves the package through self-reference CJS require", () => {
        expect.hasAssertions();

        const runtimePlugin = requireFromTestModule(packageName) as {
            meta?: {
                name?: string;
                namespace?: string;
                version?: string;
            };
        };

        expect(runtimePlugin.meta).toStrictEqual(
            expect.objectContaining({
                name: "eslint-plugin-remark",
                namespace: "remark",
                version: expectedPluginVersion,
            })
        );
    });
});
