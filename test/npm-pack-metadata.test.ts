/**
 * @packageDocumentation
 * Regression coverage for npm pack metadata emitted by supported npm releases.
 */
import { describe, expect, it } from "vitest";

import { extractNpmPackFilename } from "../scripts/parse-npm-pack-filename.mjs";

describe("npm pack metadata parser", () => {
    it("accepts the legacy array metadata shape", () => {
        expect.hasAssertions();

        expect(
            extractNpmPackFilename([
                { filename: "eslint-plugin-remark-1.0.4.tgz" },
            ])
        ).toBe("eslint-plugin-remark-1.0.4.tgz");
    });

    it("accepts the npm 12 package-keyed metadata shape", () => {
        expect.hasAssertions();

        expect(
            extractNpmPackFilename({
                "eslint-plugin-remark": {
                    filename: "eslint-plugin-remark-1.0.4.tgz",
                },
            })
        ).toBe("eslint-plugin-remark-1.0.4.tgz");
    });

    it.each([
        [
            "a primitive",
            "invalid",
            /array or package-keyed object/v,
        ],
        [
            "an empty array",
            [],
            /exactly one npm pack record/v,
        ],
        [
            "an empty object",
            {},
            /exactly one npm pack record/v,
        ],
        [
            "multiple array records",
            [{ filename: "a.tgz" }, { filename: "b.tgz" }],
            /exactly one npm pack record/v,
        ],
        [
            "multiple object records",
            {
                first: { filename: "a.tgz" },
                second: { filename: "b.tgz" },
            },
            /exactly one npm pack record/v,
        ],
        [
            "a non-object record",
            [null],
            /record to be an object/v,
        ],
        [
            "a missing filename",
            [{}],
            /nonblank filename/v,
        ],
        [
            "a non-string filename",
            [{ filename: 1 }],
            /nonblank filename/v,
        ],
        [
            "a blank filename",
            [{ filename: " ".repeat(3) }],
            /nonblank filename/v,
        ],
    ])("rejects %s", (_description, packMetadata, expectedMessage) => {
        expect.hasAssertions();

        expect(() => extractNpmPackFilename(packMetadata)).toThrow(
            expectedMessage
        );
    });
});
