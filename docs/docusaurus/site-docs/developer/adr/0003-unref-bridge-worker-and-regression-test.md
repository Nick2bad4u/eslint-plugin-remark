---
title: ADR-0003 Bridge worker process-exit safety
description: Prevent intermittent CI hangs by unref-ing the Stylelint bridge worker and enforcing exit behavior with a regression test.
---

# ADR-0003: Bridge worker process-exit safety

- **Status:** Accepted
- **Date:** 2026-04-14

## Context

The Stylelint bridge rule (`stylelint-2/stylelint`) executes Stylelint via a dedicated Node.js worker thread so the ESLint rule can keep a synchronous contract.

In CI, lint jobs intermittently appeared stuck even after visible lint output completed. Dump analysis showed an active `stylelint-eslint-bridge` worker thread while the main Node.js event loop was otherwise idle.

The behavior was hit-or-miss because the worker is created lazily:

- runs that never exercised the bridge rule exited normally,
- runs that exercised it could keep a referenced worker alive after lint work completed.

## Decision

1. Call `worker.unref()` when the bridge worker is created in `src/_internal/stylelint-runner.ts`.
2. Keep worker state self-healing by resetting the singleton reference when worker error/exit events occur.
3. Add an integration regression test (`test/stylelint-worker-exit.test.ts`) that runs bridge linting in an isolated Node process and asserts the process exits without timing out.

## Consequences

### Positive

- Removes a known source of intermittent CI hangs.
- Maintains bridge architecture without changing public API or rule behavior.
- Adds explicit automated protection against future process-lifecycle regressions.

### Trade-offs

- Adds one subprocess-based integration test, which is slower than purely in-process tests.
- Requires keeping the test aligned with the package entrypoint (`plugin.mjs`) and fixture paths.

## Notes

This ADR does not change Stylelint rule semantics, diagnostics, or autofix behavior. It is strictly a runtime lifecycle hardening decision for process termination safety.
