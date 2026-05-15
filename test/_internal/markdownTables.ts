/**
 * @packageDocumentation
 * Shared Markdown table normalization helpers for sync tests.
 */

export const normalizeLineEndings = (value: string): string =>
    value.replaceAll("\r\n", "\n");

export const normalizeMarkdownTableSpacing = (markdown: string): string =>
    normalizeLineEndings(markdown)
        .split("\n")
        .map((line) => {
            const trimmedLine = line.trimEnd();
            const isTableRow = /^\|.*\|$/v.test(trimmedLine);

            if (!isTableRow) {
                return trimmedLine;
            }

            const cells = trimmedLine
                .split("|")
                .slice(1, -1)
                .map((cell) => {
                    const trimmedCell = cell.trim();
                    const isSeparatorCell = /^:?-+:?$/v.test(trimmedCell);
                    const hasStartColon = trimmedCell.startsWith(":");
                    const hasEndColon = trimmedCell.endsWith(":");

                    if (!isSeparatorCell) {
                        return trimmedCell;
                    }

                    if (hasStartColon && hasEndColon) {
                        return ":-:";
                    }

                    if (hasStartColon) {
                        return ":--";
                    }

                    if (hasEndColon) {
                        return "--:";
                    }

                    return "---";
                });

            return `| ${cells.join(" | ")} |`;
        })
        .join("\n")
        .trim();
