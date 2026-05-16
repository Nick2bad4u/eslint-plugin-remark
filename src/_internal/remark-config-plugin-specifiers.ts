import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

/**
 * @packageDocumentation
 * Helpers for reading and rewriting Remark `plugins` specifier entries.
 */
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import { arrayFirst } from "ts-extras";

import { createFixToRemoveObjectProperty } from "./remark-config-object.js";

/** Direct entry in a top-level Remark `plugins` array. */
export type RemarkPluginArrayEntry = Readonly<{
    arrayExpression: Readonly<TSESTree.ArrayExpression>;
    element: Readonly<ArrayElement>;
}>;

/** Static string specifier found in a Remark `plugins` declaration. */
export type RemarkPluginSpecifierReference = Readonly<{
    arrayEntry: RemarkPluginArrayEntry | undefined;
    literal: Readonly<TSESTree.StringLiteral>;
    removalTarget: RemarkPluginSpecifierRemovalTarget;
}>;

type ArrayElement = Exclude<TSESTree.ArrayExpression["elements"][number], null>;

type RemarkPluginSpecifierRemovalTarget = Readonly<
    | {
          arrayExpression: Readonly<TSESTree.ArrayExpression>;
          element: Readonly<ArrayElement>;
          kind: "arrayElement";
      }
    | {
          kind: "objectProperty";
          objectExpression: Readonly<TSESTree.ObjectExpression>;
          property: Readonly<TSESTree.Property>;
      }
>;

const isPropertyExpressionValue = (
    value: Readonly<TSESTree.Property["value"]>
): value is TSESTree.Expression =>
    value.type !== AST_NODE_TYPES.ArrayPattern &&
    value.type !== AST_NODE_TYPES.AssignmentPattern &&
    value.type !== AST_NODE_TYPES.ObjectPattern &&
    value.type !== AST_NODE_TYPES.TSEmptyBodyFunctionExpression;

const isArrayElement = (element: unknown): element is ArrayElement =>
    element !== null;

const isStringLiteralExpression = (
    value: Readonly<TSESTree.Node>
): value is TSESTree.StringLiteral =>
    value.type === AST_NODE_TYPES.Literal && typeof value.value === "string";

const getTuplePluginLiteral = (
    tupleExpression: Readonly<TSESTree.ArrayExpression>
): TSESTree.StringLiteral | undefined => {
    const firstElement = arrayFirst(tupleExpression.elements);

    if (!isArrayElement(firstElement)) {
        return undefined;
    }

    return isStringLiteralExpression(firstElement) ? firstElement : undefined;
};

const getPluginsArrayExpression = (
    pluginsProperty: Readonly<TSESTree.Property>
): TSESTree.ArrayExpression | undefined => {
    const propertyValue = pluginsProperty.value;

    if (
        !isPropertyExpressionValue(propertyValue) ||
        propertyValue.type !== AST_NODE_TYPES.ArrayExpression
    ) {
        return undefined;
    }

    return propertyValue;
};

/**
 * Collect direct entries from a top-level Remark `plugins` array.
 *
 * @param pluginsProperty - Candidate `plugins` property.
 *
 * @returns Non-hole direct array entries.
 */
export const getRemarkPluginArrayEntries = (
    pluginsProperty: Readonly<TSESTree.Property>
): readonly RemarkPluginArrayEntry[] => {
    const pluginsArrayExpression = getPluginsArrayExpression(pluginsProperty);

    if (pluginsArrayExpression === undefined) {
        return [];
    }

    const entries: RemarkPluginArrayEntry[] = [];

    for (const element of pluginsArrayExpression.elements) {
        if (!isArrayElement(element)) {
            continue;
        }

        entries.push({
            arrayExpression: pluginsArrayExpression,
            element,
        });
    }

    return entries;
};

/**
 * Collect statically analyzable plugin specifier string literals from a Remark
 * `plugins` property.
 *
 * Supports top-level string declarations, direct string array entries, and
 * tuple entries such as `["remark-toc", { heading: "contents" }]`.
 *
 * @param options - Config object and its `plugins` property.
 *
 * @returns Collected specifier references.
 */
export const getRemarkPluginSpecifierReferences = (
    options: Readonly<{
        configObject: Readonly<TSESTree.ObjectExpression>;
        pluginsProperty: Readonly<TSESTree.Property>;
    }>
): readonly RemarkPluginSpecifierReference[] => {
    const { configObject, pluginsProperty } = options;
    const propertyValue = pluginsProperty.value;

    if (!isPropertyExpressionValue(propertyValue)) {
        return [];
    }

    if (isStringLiteralExpression(propertyValue)) {
        return [
            {
                arrayEntry: undefined,
                literal: propertyValue,
                removalTarget: {
                    kind: "objectProperty",
                    objectExpression: configObject,
                    property: pluginsProperty,
                },
            },
        ];
    }

    if (propertyValue.type !== AST_NODE_TYPES.ArrayExpression) {
        return [];
    }

    const references: RemarkPluginSpecifierReference[] = [];

    for (const element of propertyValue.elements) {
        if (
            !isArrayElement(element) ||
            element.type === AST_NODE_TYPES.SpreadElement
        ) {
            continue;
        }

        if (isStringLiteralExpression(element)) {
            const arrayEntry = {
                arrayExpression: propertyValue,
                element,
            } as const satisfies RemarkPluginArrayEntry;

            references.push({
                arrayEntry,
                literal: element,
                removalTarget: {
                    arrayExpression: propertyValue,
                    element,
                    kind: "arrayElement",
                },
            });
            continue;
        }

        if (element.type !== AST_NODE_TYPES.ArrayExpression) {
            continue;
        }

        const tuplePluginLiteral = getTuplePluginLiteral(element);

        if (tuplePluginLiteral === undefined) {
            continue;
        }

        references.push({
            arrayEntry: {
                arrayExpression: propertyValue,
                element,
            },
            literal: tuplePluginLiteral,
            removalTarget: {
                arrayExpression: propertyValue,
                element,
                kind: "arrayElement",
            },
        });
    }

    return references;
};

/**
 * Build a safe fixer for removing one direct entry from an array expression.
 *
 * @param options - Removal options.
 *
 * @returns Fix removing the array entry while preserving array syntax.
 */
export const createFixToRemoveArrayElement = (
    options: Readonly<{
        arrayExpression: Readonly<TSESTree.ArrayExpression>;
        element: Readonly<ArrayElement>;
        fixer: TSESLint.RuleFixer;
    }>
): TSESLint.RuleFix => {
    const { arrayExpression, element, fixer } = options;
    const elements = arrayExpression.elements.filter(isArrayElement);
    const elementIndex = elements.indexOf(element);

    if (elementIndex === -1) {
        return fixer.remove(element);
    }

    if (elements.length === 1) {
        return fixer.replaceText(arrayExpression, "[]");
    }

    const nextElement = elements[elementIndex + 1];

    if (nextElement !== undefined) {
        return fixer.removeRange([
            arrayFirst(element.range),
            arrayFirst(nextElement.range),
        ]);
    }

    const previousElement = elements[elementIndex - 1];

    if (previousElement === undefined) {
        return fixer.remove(element);
    }

    return fixer.removeRange([previousElement.range[1], element.range[1]]);
};

/**
 * Build a fixer for removing the declaration that owns a plugin specifier.
 *
 * @param options - Removal target and fixer.
 *
 * @returns Fix removing the specifier declaration.
 */
export const createFixToRemovePluginSpecifier = (
    options: Readonly<{
        fixer: TSESLint.RuleFixer;
        removalTarget: RemarkPluginSpecifierRemovalTarget;
    }>
): TSESLint.RuleFix => {
    const { fixer, removalTarget } = options;

    if (removalTarget.kind === "objectProperty") {
        return createFixToRemoveObjectProperty({
            fixer,
            objectExpression: removalTarget.objectExpression,
            property: removalTarget.property,
        });
    }

    return createFixToRemoveArrayElement({
        arrayExpression: removalTarget.arrayExpression,
        element: removalTarget.element,
        fixer,
    });
};
