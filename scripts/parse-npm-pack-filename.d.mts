/** Extract one tarball filename from npm pack JSON metadata. */
export declare const extractNpmPackFilename: (packMetadata: unknown) => string;

/** Read npm pack metadata from disk and extract its tarball filename. */
export declare const readNpmPackFilename: (
    metadataPath: string
) => Promise<string>;
