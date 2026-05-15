import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import { parseForESLint } from "@typescript-eslint/parser";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import * as path from "node:path";
import { describe, expect, it } from "vitest";

import {
    createFixToRemoveObjectProperty,
    getExportedRemarkConfigObject,
    getObjectProperties,
    getObjectPropertyByName,
    isExportDefaultDeclarationNode,
    isPropertyNamed,
    isRemarkConfigFile,
} from "../src/_internal/remark-config-object";
import {
    getStringArrayOptionValue,
    isRelativeSpecifier,
} from "../src/_internal/remark-config-string-array-option";
import {
    getDependencyNamesForFile,
    getPackageNameFromSpecifier,
} from "../src/_internal/remark-package-dependencies";

const parseProgram = (code: string): TSESTree.Program =>
    parseForESLint(code, {
        ecmaVersion: "latest",
        loc: true,
        range: true,
        sourceType: "module",
    }).ast;

const getDefaultDeclaration = (
    code: string
): TSESTree.ExportDefaultDeclaration => {
    const declaration = parseProgram(code).body.find(
        (node): node is TSESTree.ExportDefaultDeclaration =>
            node.type === AST_NODE_TYPES.ExportDefaultDeclaration
    );

    expect(declaration).toBeDefined();

    return declaration!;
};

const getDefaultConfigObject = (code: string): TSESTree.ObjectExpression => {
    const configObject = getExportedRemarkConfigObject(
        getDefaultDeclaration(code).declaration
    );

    expect(configObject).toBeDefined();

    return configObject!;
};

const createTemporaryDirectory = (): string =>
    mkdtempSync(path.join(tmpdir(), "remark-config-"));

const fakeFixer = {
    insertTextAfter(node, text) {
        return { range: [node.range[1], node.range[1]], text };
    },
    insertTextAfterRange(range, text) {
        return { range: [range[1], range[1]], text };
    },
    insertTextBefore(node, text) {
        return { range: [node.range[0], node.range[0]], text };
    },
    insertTextBeforeRange(range, text) {
        return { range: [range[0], range[0]], text };
    },
    remove(node) {
        return { range: node.range, text: "" };
    },
    removeRange(range) {
        return { range, text: "" };
    },
    replaceText(node, text) {
        return { range: node.range, text };
    },
    replaceTextRange(range, text) {
        return { range, text };
    },
} satisfies TSESLint.RuleFixer;

describe("remark config helper utilities", () => {
    it("recognizes supported Remark config filenames", () => {
        expect.hasAssertions();

        expect(isRemarkConfigFile("remark.config.mjs")).toBeTruthy();
        expect(isRemarkConfigFile(".remarkrc.cts")).toBeTruthy();
        expect(isRemarkConfigFile("remark.config.json")).toBeFalsy();
        expect(isRemarkConfigFile("eslint.config.mjs")).toBeFalsy();
    });

    it("extracts supported default-export config object forms", () => {
        expect.hasAssertions();

        expect(
            getExportedRemarkConfigObject(
                getDefaultDeclaration("export default { plugins: [] };")
                    .declaration
            )?.type
        ).toBe(AST_NODE_TYPES.ObjectExpression);
        expect(
            getExportedRemarkConfigObject(
                getDefaultDeclaration(
                    "export default defineConfig({ plugins: [] });"
                ).declaration
            )?.type
        ).toBe(AST_NODE_TYPES.ObjectExpression);
        expect(
            getExportedRemarkConfigObject(
                getDefaultDeclaration("export default defineConfig();")
                    .declaration
            )
        ).toBeUndefined();
        expect(
            getExportedRemarkConfigObject(
                getDefaultDeclaration("export default remarkConfig;")
                    .declaration
            )
        ).toBeUndefined();
    });

    it("reads named object properties without accepting computed keys or spreads", () => {
        expect.hasAssertions();

        const configObject = getDefaultConfigObject(
            'export default { plugins: [], "settings": {}, [dynamicKey]: true, ...sharedConfig };'
        );
        const properties = getObjectProperties(configObject);
        const pluginsProperty = getObjectPropertyByName(
            configObject,
            "plugins"
        );
        const settingsProperty = getObjectPropertyByName(
            configObject,
            "settings"
        );
        const computedProperty = properties.find(
            (property) => property.computed
        );

        expect(properties).toHaveLength(3);
        expect(pluginsProperty).toBeDefined();
        expect(settingsProperty).toBeDefined();
        expect(computedProperty).toBeDefined();
        expect(isPropertyNamed(pluginsProperty!, "plugins")).toBeTruthy();
        expect(isPropertyNamed(settingsProperty!, "settings")).toBeTruthy();
        expect(isPropertyNamed(computedProperty!, "dynamicKey")).toBeFalsy();
        expect(
            getObjectPropertyByName(configObject, "missing")
        ).toBeUndefined();
    });

    it("builds safe removal fixes for top-level object properties", () => {
        expect.hasAssertions();

        const onePropertyObject = getDefaultConfigObject(
            "export default { plugins: [] };"
        );
        const oneProperty = getObjectPropertyByName(
            onePropertyObject,
            "plugins"
        );
        const manyPropertyObject = getDefaultConfigObject(
            "export default { plugins: [], settings: {}, data: {} };"
        );
        const pluginsProperty = getObjectPropertyByName(
            manyPropertyObject,
            "plugins"
        );
        const settingsProperty = getObjectPropertyByName(
            manyPropertyObject,
            "settings"
        );
        const dataProperty = getObjectPropertyByName(
            manyPropertyObject,
            "data"
        );
        const unrelatedProperty = getObjectPropertyByName(
            getDefaultConfigObject("export default { unrelated: true };"),
            "unrelated"
        );

        expect(
            createFixToRemoveObjectProperty({
                fixer: fakeFixer,
                objectExpression: onePropertyObject,
                property: oneProperty!,
            }).text
        ).toBe("{}");
        expect(
            createFixToRemoveObjectProperty({
                fixer: fakeFixer,
                objectExpression: manyPropertyObject,
                property: pluginsProperty!,
            }).range[1]
        ).toBe(settingsProperty!.range[0]);
        expect(
            createFixToRemoveObjectProperty({
                fixer: fakeFixer,
                objectExpression: manyPropertyObject,
                property: dataProperty!,
            }).range[0]
        ).toBe(settingsProperty!.range[1]);
        expect(
            createFixToRemoveObjectProperty({
                fixer: fakeFixer,
                objectExpression: manyPropertyObject,
                property: unrelatedProperty!,
            }).range
        ).toStrictEqual(unrelatedProperty!.range);
    });

    it("parses string-array option shapes conservatively", () => {
        expect.hasAssertions();

        const stringProperty = getObjectPropertyByName(
            getDefaultConfigObject('export default { plugins: "remark-gfm" };'),
            "plugins"
        );
        const arrayProperty = getObjectPropertyByName(
            getDefaultConfigObject(
                'export default { plugins: ["remark-gfm", "remark-frontmatter"] };'
            ),
            "plugins"
        );
        const nullElementProperty = getObjectPropertyByName(
            getDefaultConfigObject(
                'export default { plugins: [, "remark-gfm"] };'
            ),
            "plugins"
        );
        const spreadProperty = getObjectPropertyByName(
            getDefaultConfigObject(
                'export default { plugins: ["remark-gfm", ...sharedPlugins] };'
            ),
            "plugins"
        );
        const numericProperty = getObjectPropertyByName(
            getDefaultConfigObject("export default { plugins: [1] };"),
            "plugins"
        );
        const objectProperty = getObjectPropertyByName(
            getDefaultConfigObject(
                "export default { plugins: { name: true } };"
            ),
            "plugins"
        );

        expect(getStringArrayOptionValue(stringProperty!)?.kind).toBe("string");
        expect(getStringArrayOptionValue(arrayProperty!)?.kind).toBe("array");
        expect(getStringArrayOptionValue(nullElementProperty!)).toBeUndefined();
        expect(getStringArrayOptionValue(spreadProperty!)).toBeUndefined();
        expect(getStringArrayOptionValue(numericProperty!)).toBeUndefined();
        expect(getStringArrayOptionValue(objectProperty!)).toBeUndefined();
        expect(isRelativeSpecifier("./plugin.mjs")).toBeTruthy();
        expect(isRelativeSpecifier(String.raw`..\plugin.cjs`)).toBeTruthy();
        expect(isRelativeSpecifier("remark-gfm")).toBeFalsy();
    });

    it("resolves package dependency names from nearest package manifests", () => {
        expect.hasAssertions();

        const rootDirectory = createTemporaryDirectory();

        try {
            const nestedDirectory = path.join(
                rootDirectory,
                "packages",
                "docs"
            );

            writeFileSync(
                path.join(rootDirectory, "package.json"),
                JSON.stringify({
                    dependencies: { "remark-gfm": "^1.0.0" },
                    devDependencies: { "@scope/remark-plugin": "^2.0.0" },
                    optionalDependencies: { "remark-optional": "^3.0.0" },
                    peerDependencies: { "remark-peer": "^4.0.0" },
                })
            );
            writeFileSync(path.join(rootDirectory, "placeholder.txt"), "");
            mkdtempSync(path.join(rootDirectory, "packages-"));

            expect(getPackageNameFromSpecifier("")).toBeUndefined();
            expect(getPackageNameFromSpecifier("node:test")).toBeUndefined();
            expect(
                getPackageNameFromSpecifier("@scope/remark-plugin/subpath")
            ).toBe("@scope/remark-plugin");
            expect(getPackageNameFromSpecifier("remark-gfm/subpath")).toBe(
                "remark-gfm"
            );
            expect(getPackageNameFromSpecifier("@scope")).toBeUndefined();

            writeFileSync(path.join(rootDirectory, "remark.config.mjs"), "");

            const dependencyNames = getDependencyNamesForFile(
                path.join(nestedDirectory, "remark.config.mjs"),
                rootDirectory
            );

            expect(dependencyNames?.has("remark-gfm")).toBeTruthy();
            expect(dependencyNames?.has("@scope/remark-plugin")).toBeTruthy();
            expect(dependencyNames?.has("remark-optional")).toBeTruthy();
            expect(dependencyNames?.has("remark-peer")).toBeTruthy();
        } finally {
            rmSync(rootDirectory, { force: true, recursive: true });
        }
    });

    it("rejects unknown export-default listener nodes", () => {
        expect.hasAssertions();

        expect(isExportDefaultDeclarationNode(null)).toBeFalsy();
        expect(
            isExportDefaultDeclarationNode({ type: "Identifier" })
        ).toBeFalsy();
        expect(
            isExportDefaultDeclarationNode(
                getDefaultDeclaration("export default {};")
            )
        ).toBeTruthy();
    });
});
