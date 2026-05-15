/**
 * @packageDocumentation
 * Type declaration entrypoint for CommonJS consumers of `plugin.cjs`.
 */
import type { ESLint } from "eslint";

/** Default CommonJS export shape for eslint-plugin-remark. */
declare const plugin: ESLint.Plugin;

export = plugin;
