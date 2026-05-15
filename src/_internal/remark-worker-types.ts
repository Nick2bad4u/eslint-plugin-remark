/**
 * @packageDocumentation
 * Serializable contracts shared between the Remark worker and its sync client.
 */
import type { MessagePort } from "node:worker_threads";

/** Failure response posted from the worker. */
export type RemarkWorkerErrorResponse = Readonly<{
    error: Readonly<{
        message: string;
        name: string;
        stack?: string;
    }>;
    ok: false;
}>;

/** Request posted from the main thread to the worker. */
export type RemarkWorkerRequest = Readonly<{
    options: SerializableRemarkLintOptions;
    port: MessagePort;
    signalBuffer: SharedArrayBuffer;
}>;

/** Worker response union used by the sync client. */
export type RemarkWorkerResponse =
    | RemarkWorkerErrorResponse
    | RemarkWorkerSuccessResponse;

/** Success response posted from the worker. */
export type RemarkWorkerSuccessResponse = Readonly<{
    ok: true;
    result: SerializableRemarkResult;
}>;

/** Rule option subset forwarded to the Remark bridge worker. */
export type SerializableRemarkLintOptions = Readonly<{
    code: string;
    codeFilename: string;
    configFile?: string;
    cwd?: string;
    fix?: boolean;
    quiet?: boolean;
}>;

/** Minimal serializable message payload returned to the ESLint rule. */
export type SerializableRemarkMessage = Readonly<{
    column: number;
    endColumn?: number;
    endLine?: number;
    fatal: boolean;
    line: number;
    reason: string;
    ruleId?: string;
    source?: string;
}>;

/** Minimal serializable position payload returned to the ESLint rule. */
export type SerializableRemarkPoint = Readonly<{
    column: number;
    line: number;
}>;

/** Minimal result payload returned from the worker. */
export type SerializableRemarkResult = Readonly<{
    messages: readonly SerializableRemarkMessage[];
    output?: string;
}>;
