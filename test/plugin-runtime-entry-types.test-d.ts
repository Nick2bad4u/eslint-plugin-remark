import type { ESLint } from "eslint";

import { assertType } from "vitest";

import remarkPlugin from "../src/plugin";

assertType<ESLint.Plugin>(remarkPlugin);
assertType<ESLint.Plugin["configs"] | undefined>(remarkPlugin.configs);
assertType<string | undefined>(remarkPlugin.meta?.name);
assertType<string | undefined>(remarkPlugin.meta?.version);
assertType<ESLint.Plugin["rules"] | undefined>(remarkPlugin.rules);
