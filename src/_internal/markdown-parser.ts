/**
 * @packageDocumentation
 * Minimal parser for full-document Markdown linting through ESLint.
 */
import type { Linter } from "eslint";

type MarkdownProgram = Readonly<{
    body: [];
    comments: [];
    loc: SourceLocation;
    range: [number, number];
    sourceType: "module";
    tokens: [];
    type: "Program";
}>;

type SourceLocation = Readonly<{
    end: SourcePosition;
    start: SourcePosition;
}>;

type SourcePosition = Readonly<{
    column: number;
    line: number;
}>;

const getDocumentEndPosition = (text: string): SourcePosition => {
    let column = 0;
    let line = 1;

    for (let index = 0; index < text.length; index += 1) {
        const character = text[index];

        if (character === "\r") {
            line += 1;
            column = 0;

            if (text[index + 1] === "\n") {
                index += 1;
            }

            continue;
        }

        if (
            character === "\n" ||
            character === "\u{2028}" ||
            character === "\u{2029}"
        ) {
            line += 1;
            column = 0;
            continue;
        }

        column += 1;
    }

    return {
        column,
        line,
    };
};

const createMarkdownProgram = (text: string): MarkdownProgram => ({
    body: [],
    comments: [],
    loc: {
        end: getDocumentEndPosition(text),
        start: {
            column: 0,
            line: 1,
        },
    },
    range: [0, text.length],
    sourceType: "module",
    tokens: [],
    type: "Program",
});

/**
 * Parser that gives ESLint a valid empty ESTree program while preserving the
 * original Markdown text on `context.sourceCode.text` for the Remark bridge.
 */
export const markdownParser: Linter.Parser = {
    meta: {
        name: "eslint-plugin-remark/markdown-parser",
        version: "1.0.0",
    },
    parseForESLint: (text: string) => ({
        ast: createMarkdownProgram(text),
        services: {},
        visitorKeys: {
            Program: [],
        },
    }),
};
