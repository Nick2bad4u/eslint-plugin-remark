#!/usr/bin/env node

/**
 * @packageDocumentation
 * Parse the tarball filename from npm pack JSON metadata.
 */
// @ts-check

import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Check whether an unknown value is a non-null object record.
 *
 * @param {unknown} value
 *
 * @returns {value is Record<string, unknown>}
 */
const isRecord = (value) => typeof value === "object" && value !== null;

/**
 * Extract one tarball filename from npm pack metadata.
 *
 * Npm 11 and older emit a record array. npm 12 emits an object keyed by package
 * name. Both contracts must contain exactly one record.
 *
 * @param {unknown} packMetadata
 *
 * @returns {string}
 *
 * @throws {Error} When the metadata shape or filename is invalid.
 */
export const extractNpmPackFilename = (packMetadata) => {
    const packRecords = Array.isArray(packMetadata)
        ? packMetadata
        : isRecord(packMetadata)
          ? Object.values(packMetadata)
          : null;

    if (packRecords === null) {
        throw new TypeError(
            "Expected npm pack metadata to be an array or package-keyed object."
        );
    }

    if (packRecords.length !== 1) {
        throw new RangeError(
            `Expected exactly one npm pack record, received ${packRecords.length}.`
        );
    }

    const packRecord = packRecords[0];

    if (!isRecord(packRecord)) {
        throw new TypeError("Expected the npm pack record to be an object.");
    }

    const filename = packRecord["filename"];

    if (typeof filename !== "string" || filename.trim().length === 0) {
        throw new TypeError(
            "Expected the npm pack record to contain a nonblank filename."
        );
    }

    return filename.trim();
};

/**
 * Read npm pack metadata from disk and extract its tarball filename.
 *
 * @param {string} metadataPath
 *
 * @returns {Promise<string>}
 */
export const readNpmPackFilename = async (metadataPath) => {
    const packMetadataContent = await readFile(metadataPath, "utf8");
    /** @type {unknown} */
    const packMetadata = JSON.parse(packMetadataContent);

    return extractNpmPackFilename(packMetadata);
};

const scriptPath = process.argv[1];

if (
    typeof scriptPath === "string" &&
    resolve(scriptPath) === fileURLToPath(import.meta.url)
) {
    try {
        const metadataPath = process.argv[2];

        if (typeof metadataPath !== "string" || process.argv.length !== 3) {
            throw new TypeError(
                "Usage: node scripts/parse-npm-pack-filename.mjs <metadata-path>"
            );
        }

        process.stdout.write(await readNpmPackFilename(metadataPath));
    } catch (error) {
        console.error("Failed to parse npm pack metadata:", error);
        process.exitCode = 1;
    }
}
