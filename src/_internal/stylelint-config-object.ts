import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

/**
 * @packageDocumentation
 * Shared helpers for reading and rewriting Stylelint config objects.
 */
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import path from "node:path";
import { arrayFirst } from "ts-extras";

const configBaseNamePattern =
    /^(?:stylelint\.config|\.stylelintrc)\.(?:[cm]?js|[cm]?ts)$/v;

/**
 * Check whether a filename looks like a Stylelint config module.
 *
 * @param filename - Absolute or relative filename.
 *
 * @returns `true` when the file name matches supported Stylelint config names.
 */
export const isStylelintConfigFile = (filename: string): boolean =>
    configBaseNamePattern.test(path.basename(filename));

/**
 * Check whether a property key matches a specific string literal name.
 *
 * @param property - Candidate object property.
 * @param name - Expected property name.
 *
 * @returns `true` when the property key matches the provided name.
 */
export const isPropertyNamed = (
    property: Readonly<TSESTree.Property>,
    name: string
): boolean => {
    if (property.computed) {
        return false;
    }

    if (property.key.type === AST_NODE_TYPES.Identifier) {
        return property.key.name === name;
    }

    const literalKeyValue = property.key.value;

    return typeof literalKeyValue === "string" && literalKeyValue === name;
};

/**
 * Extract the top-level Stylelint config object from an export default
 * declaration.
 *
 * @param declaration - Export default declaration payload.
 *
 * @returns Config object expression when the export is supported.
 */
export const getExportedStylelintConfigObject = (
    declaration: Readonly<TSESTree.ExportDefaultDeclaration["declaration"]>
): TSESTree.ObjectExpression | undefined => {
    if (declaration.type === AST_NODE_TYPES.ObjectExpression) {
        return declaration;
    }

    if (
        declaration.type === AST_NODE_TYPES.CallExpression &&
        declaration.callee.type === AST_NODE_TYPES.Identifier &&
        declaration.callee.name === "defineConfig"
    ) {
        const firstArgument = arrayFirst(declaration.arguments);

        return firstArgument?.type === AST_NODE_TYPES.ObjectExpression
            ? firstArgument
            : undefined;
    }

    return undefined;
};

const getUnknownNodeType = (node: unknown): string | undefined => {
    if (node === null || typeof node !== "object") {
        return undefined;
    }

    const nodeType: unknown = Reflect.get(node, "type");

    return typeof nodeType === "string" ? nodeType : undefined;
};

/** Type guard for unknown nodes entering generic rule listeners. */
export const isExportDefaultDeclarationNode = (
    node: unknown
): node is TSESTree.ExportDefaultDeclaration =>
    getUnknownNodeType(node) === AST_NODE_TYPES.ExportDefaultDeclaration;

/**
 * Find one named top-level object property.
 *
 * @param objectExpression - Object expression to inspect.
 * @param name - Expected property name.
 *
 * @returns Matching property when present.
 */
export const getObjectPropertyByName = (
    objectExpression: Readonly<TSESTree.ObjectExpression>,
    name: string
): TSESTree.Property | undefined => {
    for (const property of objectExpression.properties) {
        if (property.type !== AST_NODE_TYPES.Property) {
            continue;
        }

        if (isPropertyNamed(property, name)) {
            return property;
        }
    }

    return undefined;
};

/**
 * Collect top-level object properties, excluding spread elements.
 *
 * @param objectExpression - Object expression to inspect.
 *
 * @returns Top-level object properties in source order.
 */
export const getObjectProperties = (
    objectExpression: Readonly<TSESTree.ObjectExpression>
): readonly TSESTree.Property[] => {
    const properties: TSESTree.Property[] = [];

    for (const property of objectExpression.properties) {
        if (property.type !== AST_NODE_TYPES.Property) {
            continue;
        }

        properties.push(property);
    }

    return properties;
};

/**
 * Build a safe fixer for removing one top-level object property.
 *
 * @param options - Removal options containing the fixer, parent object
 *   expression, and property to remove.
 *
 * @returns Fix removing the property while preserving object syntax.
 */
export const createFixToRemoveObjectProperty = (
    options: Readonly<{
        fixer: TSESLint.RuleFixer;
        objectExpression: Readonly<TSESTree.ObjectExpression>;
        property: Readonly<TSESTree.Property>;
    }>
): TSESLint.RuleFix => {
    const { fixer, objectExpression, property } = options;
    const properties = getObjectProperties(objectExpression);
    const propertyIndex = properties.indexOf(property);

    if (propertyIndex === -1) {
        return fixer.remove(property);
    }

    if (properties.length === 1) {
        return fixer.replaceText(objectExpression, "{}");
    }

    const nextProperty = properties[propertyIndex + 1];

    if (nextProperty !== undefined) {
        return fixer.removeRange([
            arrayFirst(property.range),
            arrayFirst(nextProperty.range),
        ]);
    }

    const previousProperty = properties[propertyIndex - 1];

    if (previousProperty === undefined) {
        return fixer.remove(property);
    }

    return fixer.removeRange([previousProperty.range[1], property.range[1]]);
};
