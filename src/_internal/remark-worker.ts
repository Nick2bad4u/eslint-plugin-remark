import type { UnknownArray, UnknownRecord } from "type-fest";
import type { Pluggable, Plugin, Preset } from "unified";
import type { VFileMessage } from "vfile-message";

/**
 * @packageDocumentation
 * Dedicated worker that runs Remark's async processor API for sync ESLint rule consumers.
 */
import { existsSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { isMainThread, parentPort } from "node:worker_threads";
import { remark } from "remark";
import { arrayFirst, isDefined, keyIn } from "ts-extras";
import { VFile } from "vfile";

import type {
    RemarkWorkerRequest,
    RemarkWorkerResponse,
    SerializableRemarkMessage,
    SerializableRemarkResult,
} from "./remark-worker-types.js";

const DONE_STATE = 1 as const;

const configFileNames = [
    ".remarkrc.cjs",
    ".remarkrc.js",
    ".remarkrc.mjs",
    "remark.config.cjs",
    "remark.config.js",
    "remark.config.mjs",
] as const;

type RemarkConfig = Readonly<{
    data?: UnknownRecord;
    plugins?: Readonly<UnknownArray>;
    settings?: UnknownRecord;
}>;

const isRecord = (value: unknown): value is UnknownRecord =>
    typeof value === "object" && value !== null && !Array.isArray(value);

const isUnknownArray = (value: unknown): value is UnknownArray =>
    Array.isArray(value);

const isRemarkConfig = (value: unknown): value is RemarkConfig =>
    isRecord(value);

const isPlugin = (value: unknown): value is Plugin<unknown[]> =>
    typeof value === "function";

const isPluggable = (value: unknown): value is Pluggable =>
    isPlugin(value) || isUnknownArray(value) || isRecord(value);

const getPluginTupleParameters = (entry: UnknownArray): unknown[] => {
    const parameters: unknown[] = [];

    for (let index = 1; index < entry.length; index += 1) {
        parameters.push(entry[index]);
    }

    return parameters;
};

const hasPositionEnd = (
    value: unknown
): value is Readonly<{ end: { column?: number; line?: number } }> =>
    isRecord(value) && isRecord(value["end"]);

const toSerializableMessage = (
    message: Readonly<VFileMessage>
): SerializableRemarkMessage => {
    const place = message.place;
    const endPoint = hasPositionEnd(place) ? place.end : undefined;

    return {
        column: message.column ?? 1,
        ...(typeof endPoint?.column === "number" && {
            endColumn: endPoint.column,
        }),
        ...(typeof endPoint?.line === "number" && { endLine: endPoint.line }),
        fatal: message.fatal === true,
        line: message.line ?? 1,
        reason: message.reason,
        ...(isDefined(message.ruleId) && { ruleId: message.ruleId }),
        ...(isDefined(message.source) && { source: message.source }),
    };
};

const findConfigFile = (
    codeFilename: string,
    cwd: string | undefined
): string | undefined => {
    let currentDirectory = path.isAbsolute(codeFilename)
        ? path.dirname(codeFilename)
        : path.resolve(cwd ?? process.cwd());

    while (true) {
        for (const configFileName of configFileNames) {
            const candidatePath = path.join(currentDirectory, configFileName);

            // eslint-disable-next-line n/no-sync, security/detect-non-literal-fs-filename -- Candidate paths are deterministic config names under ancestor directories.
            if (existsSync(candidatePath)) {
                return candidatePath;
            }
        }

        const parentDirectory = path.dirname(currentDirectory);

        if (parentDirectory === currentDirectory) {
            return undefined;
        }

        currentDirectory = parentDirectory;
    }
};

const loadModuleDefault = async (modulePath: string): Promise<unknown> => {
    // eslint-disable-next-line no-unsanitized/method -- modulePath is resolved from Remark config/package resolution before import.
    const moduleNamespace: unknown = await import(
        pathToFileURL(modulePath).href
    );

    return isRecord(moduleNamespace) && keyIn(moduleNamespace, "default")
        ? moduleNamespace["default"]
        : moduleNamespace;
};

const resolveModulePath = (specifier: string, baseFilePath: string): string => {
    const requireFromConfig = createRequire(pathToFileURL(baseFilePath).href);

    return requireFromConfig.resolve(specifier);
};

const loadPluginSpecifier = async (
    specifier: string,
    configFilePath: string
): Promise<Pluggable> => {
    const resolvedModulePath = resolveModulePath(specifier, configFilePath);
    const loadedModule = await loadModuleDefault(resolvedModulePath);

    if (!isPluggable(loadedModule)) {
        throw new TypeError(
            `Remark plugin '${specifier}' did not export a pluggable function, tuple, or preset.`
        );
    }

    return loadedModule;
};

const normalizePluginEntry = async (
    entry: unknown,
    configFilePath: string
): Promise<Pluggable> => {
    if (typeof entry === "string") {
        return loadPluginSpecifier(entry, configFilePath);
    }

    if (isUnknownArray(entry)) {
        const firstEntry = arrayFirst(entry);

        if (typeof firstEntry === "string") {
            const loadedPlugin = await loadPluginSpecifier(
                firstEntry,
                configFilePath
            );

            if (!isPlugin(loadedPlugin)) {
                throw new TypeError(
                    `Remark plugin tuple '${firstEntry}' must resolve to a plugin function.`
                );
            }

            return [
                loadedPlugin,
                ...getPluginTupleParameters(entry),
            ] satisfies [Plugin<unknown[]>, ...unknown[]];
        }
    }

    if (!isPluggable(entry)) {
        throw new TypeError("Remark plugin entries must be pluggable values.");
    }

    return entry;
};

const loadRemarkConfig = async (
    explicitConfigFile: string | undefined,
    codeFilename: string,
    cwd: string | undefined
): Promise<Readonly<{ config?: RemarkConfig; configFilePath?: string }>> => {
    const configFilePath = isDefined(explicitConfigFile)
        ? path.resolve(cwd ?? process.cwd(), explicitConfigFile)
        : findConfigFile(codeFilename, cwd);

    if (!isDefined(configFilePath)) {
        return {};
    }

    const config = await loadModuleDefault(configFilePath);

    if (!isRemarkConfig(config)) {
        return { configFilePath };
    }

    return { config, configFilePath };
};

const createProcessor = async (
    request: RemarkWorkerRequest
): Promise<ReturnType<typeof remark>> => {
    const processor = remark();
    const { config, configFilePath } = await loadRemarkConfig(
        request.options.configFile,
        request.options.codeFilename,
        request.options.cwd
    );

    if (!isDefined(config) || !isDefined(configFilePath)) {
        return processor;
    }

    if (isDefined(config.settings)) {
        processor.data("settings", config.settings);
    }

    if (isDefined(config.data)) {
        processor.data(config.data);
    }

    if (isDefined(config.plugins)) {
        const plugins = await Promise.all(
            config.plugins.map((pluginEntry) =>
                normalizePluginEntry(pluginEntry, configFilePath)
            )
        );

        processor.use({ plugins } satisfies Preset);
    }

    return processor;
};

const toSerializableResult = (
    file: Readonly<VFile>,
    request: RemarkWorkerRequest
): SerializableRemarkResult => {
    const messages =
        request.options.quiet === true
            ? file.messages.filter((message) => message.fatal === true)
            : file.messages;
    const output = String(file);

    return {
        ...(request.options.fix === true &&
            output !== request.options.code && { output }),
        messages: messages.map((message) => toSerializableMessage(message)),
    };
};

const notifyCompletion = (
    request: RemarkWorkerRequest,
    response: RemarkWorkerResponse
): void => {
    // eslint-disable-next-line unicorn/require-post-message-target-origin -- Worker MessagePort.postMessage does not support browser target origins.
    request.port.postMessage(response);
    request.port.close();

    const signal = new Int32Array(request.signalBuffer);
    Atomics.store(signal, 0, DONE_STATE);
    Atomics.notify(signal, 0);
};

const handleRequest = async (request: RemarkWorkerRequest): Promise<void> => {
    try {
        const processor = await createProcessor(request);
        const file = new VFile({
            path: request.options.codeFilename,
            value: request.options.code,
        });
        const processedFile = await processor.process(file);

        notifyCompletion(request, {
            ok: true,
            result: toSerializableResult(processedFile, request),
        });
    } catch (error: unknown) {
        const normalizedError =
            error instanceof Error
                ? {
                      message: error.message,
                      name: error.name,
                      ...(isDefined(error.stack) && { stack: error.stack }),
                  }
                : {
                      message: `Unknown Remark worker failure: ${String(error)}`,
                      name: "RemarkWorkerError",
                  };

        notifyCompletion(request, {
            error: normalizedError,
            ok: false,
        });
    }
};

if (!isMainThread) {
    const onMessage = (request: RemarkWorkerRequest): void => {
        void handleRequest(request);
    };

    const removeOnExit = (): void => {
        parentPort?.off("message", onMessage);
    };

    parentPort?.on("message", onMessage);
    process.once("exit", removeOnExit);
}
