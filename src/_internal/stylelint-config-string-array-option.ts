import type { TSESTree } from "@typescript-eslint/utils";

/**
 * @packageDocumentation
 * Helpers for reading top-level Stylelint string-or-string-array options.
 */
import { AST_NODE_TYPES } from "@typescript-eslint/utils";

const isPropertyExpressionValue = (
    value: Readonly<TSESTree.Property["value"]>
): value is TSESTree.Expression =>
    value.type !== AST_NODE_TYPES.ArrayPattern &&
    value.type !== AST_NODE_TYPES.AssignmentPattern &&
    value.type !== AST_NODE_TYPES.ObjectPattern &&
    value.type !== AST_NODE_TYPES.TSEmptyBodyFunctionExpression;

const isStringLiteralExpression = (
    value: Readonly<TSESTree.Expression>
): value is TSESTree.StringLiteral =>
    value.type === AST_NODE_TYPES.Literal && typeof value.value === "string";

type StringArrayOptionValue = Readonly<
    | {
          arrayExpression: Readonly<TSESTree.ArrayExpression>;
          kind: "array";
          stringLiterals: readonly TSESTree.StringLiteral[];
      }
    | {
          kind: "string";
          stringLiteral: Readonly<TSESTree.StringLiteral>;
      }
>;

/**
 * Parse a top-level object property value as either a string literal or a
 * string-only array expression.
 *
 * @param property - Candidate object property.
 *
 * @returns Parsed value when the property can be handled safely.
 */
export const getStringArrayOptionValue = (
    property: Readonly<TSESTree.Property>
): StringArrayOptionValue | undefined => {
    const propertyValue = property.value;

    if (!isPropertyExpressionValue(propertyValue)) {
        return undefined;
    }

    if (isStringLiteralExpression(propertyValue)) {
        return {
            kind: "string",
            stringLiteral: propertyValue,
        };
    }

    if (propertyValue.type !== AST_NODE_TYPES.ArrayExpression) {
        return undefined;
    }

    const stringLiterals: TSESTree.StringLiteral[] = [];

    for (const element of propertyValue.elements) {
        if (element === null) {
            return undefined;
        }

        if (element.type === AST_NODE_TYPES.SpreadElement) {
            return undefined;
        }

        if (!isStringLiteralExpression(element)) {
            return undefined;
        }

        stringLiterals.push(element);
    }

    return {
        arrayExpression: propertyValue,
        kind: "array",
        stringLiterals,
    };
};

/**
 * Determine whether a Stylelint extends/plugins-like entry is a relative path.
 *
 * @param specifier - Candidate extends/plugins string value.
 *
 * @returns `true` when the entry starts with `./`, `../`, `.\\`, or `..\\`.
 */
export const isRelativeSpecifier = (specifier: string): boolean =>
    specifier.startsWith("./") ||
    specifier.startsWith("../") ||
    specifier.startsWith(".\\") ||
    specifier.startsWith("..\\");
