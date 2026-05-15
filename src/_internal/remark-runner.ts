/**
 * @packageDocumentation
 * Synchronous facade over Remark's async processor API using a dedicated worker.
 */
import {
    MessageChannel,
    receiveMessageOnPort,
    Worker,
} from "node:worker_threads";
import { assertDefined, isDefined, safeCastTo } from "ts-extras";

import type {
    RemarkWorkerResponse,
    SerializableRemarkLintOptions,
    SerializableRemarkResult,
} from "./remark-worker-types.js";

const WAIT_TIMEOUT_IN_MILLISECONDS = 30_000 as const;
const WORKER_DONE_STATE = 1 as const;

const lintResultCache = new Map<string, SerializableRemarkResult>();

let remarkWorker: null | Worker = null;
const usesTypeScriptSourceWorker = import.meta.url.endsWith(".ts");
const workerModuleUrl = new URL(
    usesTypeScriptSourceWorker ? "./remark-worker.ts" : "./remark-worker.js",
    import.meta.url
);

const createWorker = (): Worker =>
    new Worker(workerModuleUrl, {
        name: "remark-eslint-bridge",
        ...(usesTypeScriptSourceWorker
            ? { execArgv: ["--experimental-strip-types"] }
            : {}),
    });

const resetWorker = (): void => {
    const workerToTerminate = remarkWorker;

    if (workerToTerminate === null) {
        return;
    }

    void (async () => {
        try {
            await workerToTerminate.terminate();
        } catch {
            // Ignore termination failures while resetting worker state.
        }
    })();
    remarkWorker = null;
};

const getWorker = (): Worker => {
    if (remarkWorker === null) {
        remarkWorker = createWorker();
        remarkWorker.unref();
        remarkWorker.once("error", () => {
            remarkWorker = null;
        });
        remarkWorker.once("exit", () => {
            remarkWorker = null;
        });
    }

    return remarkWorker;
};

const createCacheKey = (options: SerializableRemarkLintOptions): string =>
    JSON.stringify(options);

const readWorkerResponse = (
    response: RemarkWorkerResponse | undefined
): SerializableRemarkResult => {
    assertDefined(response);

    if (response.ok) {
        return response.result;
    }

    const error = new Error(response.error.message);
    error.name = response.error.name;

    if (isDefined(response.error.stack)) {
        error.stack = response.error.stack;
    }

    throw error;
};

/** Run Remark synchronously for one source string. */
export const runRemarkSynchronously = (
    options: SerializableRemarkLintOptions
): SerializableRemarkResult => {
    const cacheKey = createCacheKey(options);
    const cachedResult = lintResultCache.get(cacheKey);

    if (isDefined(cachedResult)) {
        return cachedResult;
    }

    const worker = getWorker();
    const signalBuffer = new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT);
    const signal = new Int32Array(signalBuffer);
    const { port1, port2 } = new MessageChannel();

    /* eslint-disable sdl/no-postmessage-without-origin-allowlist -- Worker threads use structured-clone messaging, not browser window.postMessage. */
    worker.postMessage(
        {
            options,
            port: port2,
            signalBuffer,
        },
        [port2]
    );
    /* eslint-enable sdl/no-postmessage-without-origin-allowlist -- Re-enable after the worker-thread message dispatch. */

    const waitResult = Atomics.wait(signal, 0, 0, WAIT_TIMEOUT_IN_MILLISECONDS);

    if (waitResult === "timed-out") {
        port1.close();
        resetWorker();
        throw new Error(
            "Timed out while waiting for the Remark worker to finish."
        );
    }

    if (Atomics.load(signal, 0) !== WORKER_DONE_STATE) {
        port1.close();
        throw new Error("Remark worker did not enter a completed state.");
    }

    const workerMessage = receiveMessageOnPort(port1);
    port1.close();

    /* eslint-disable @typescript-eslint/no-unsafe-argument -- workerMessage?.message is validated inside readWorkerResponse via assertDefined and shape checks. */
    const result = readWorkerResponse(
        safeCastTo<RemarkWorkerResponse | undefined>(workerMessage?.message)
    );
    /* eslint-enable @typescript-eslint/no-unsafe-argument -- end validated worker-response forwarding. */

    lintResultCache.set(cacheKey, result);

    return result;
};
