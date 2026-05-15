/**
 * @packageDocumentation
 * Unit coverage for the internal Markdown compatibility parser.
 */
import { describe, expect, it } from "vitest";

import { markdownParser } from "../src/_internal/markdown-parser";

type UnknownRecord = Record<string, unknown>;

const isRecord = (value: unknown): value is UnknownRecord =>
    typeof value === "object" && value !== null;

const parseMarkdown = (text: string): UnknownRecord => {
    if (!("parseForESLint" in markdownParser)) {
        throw new TypeError(
            "Expected markdownParser to expose parseForESLint."
        );
    }

    const result = markdownParser.parseForESLint(text);

    if (!isRecord(result.ast)) {
        throw new TypeError("Expected markdownParser to return an AST object.");
    }

    return result.ast;
};

const getEndLocation = (ast: Readonly<UnknownRecord>): UnknownRecord => {
    const loc = ast["loc"];

    if (!isRecord(loc)) {
        throw new TypeError("Expected Markdown AST to expose loc metadata.");
    }

    const end = loc["end"];

    if (!isRecord(end)) {
        throw new TypeError(
            "Expected Markdown AST loc to expose end metadata."
        );
    }

    return end;
};

describe("markdown compatibility parser", () => {
    it("returns an empty ESTree program for Markdown source", () => {
        expect.hasAssertions();

        expect(parseMarkdown("# Heading\n\nText.\n")).toMatchObject({
            body: [],
            comments: [],
            range: [0, 17],
            sourceType: "module",
            tokens: [],
            type: "Program",
        });
    });

    it("tracks CRLF as a single line break", () => {
        expect.hasAssertions();

        expect(getEndLocation(parseMarkdown("# A\r\nB"))).toStrictEqual({
            column: 1,
            line: 2,
        });
    });

    it("tracks Markdown-compatible Unicode line separators", () => {
        expect.hasAssertions();

        expect(
            getEndLocation(parseMarkdown("# A\u{2028}B\u{2029}CD"))
        ).toStrictEqual({
            column: 2,
            line: 3,
        });
    });
});
