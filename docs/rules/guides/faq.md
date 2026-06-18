---
title: FAQ
description: Answers to common questions about bridge behavior, presets, rollout, and troubleshooting.
---

# FAQ

## Do I still need the Remark CLI if I use this plugin?

Not necessarily.

If your goal is a unified lint pipeline, ESLint plus `remark/remark` is usually enough. Keep a dedicated Remark CLI job only if you need separate formatter/output contracts or a non-ESLint workflow.

## Which preset should I start with?

- Start with [`remarkOnly`](../presets/remark-only.md) for minimal-risk adoption.
- Start with [`recommended`](../presets/recommended.md) if you want bridge plus config quality enforcement from day one.

## Why am I seeing both ESLint Markdown and Remark errors for similar issues?

You may have overlapping policy between `@eslint/markdown` rules and bridged Remark plugins. Audit overlap and choose one source of truth for each policy area.

## Can I use autofix safely?

In most repos, yes. Start by running `eslint --fix` in a branch and reviewing the diff. Then enforce in CI once results are stable.

## How do I load project-specific Remark plugins?

Create a supported JavaScript config file such as `remark.config.mjs` and list plugins in `plugins`. The bridge resolves string plugin specifiers relative to the config file.

## What if some packages in a monorepo resolve config differently?

Set the `configFile` option intentionally for each package or config block. Avoid fragile relative paths in Remark config references and use package-install validation rules to catch missing dependencies early.

## Why do config authoring rules matter if my Remark config already works?

A config can "work" while still being brittle, duplicated, or hard to review. Authoring rules reduce long-term churn and make diffs deterministic.

## What is the best migration order for existing repos?

1. Enable one preset.
2. Run autofix.
3. Resolve high-value violations first.
4. Promote warnings to errors once baseline is clean.

## Where should I go next?

- Setup flow: [Getting Started](./getting-started.md)
- Bridge internals and behavior: [Remark Bridge](./remark-bridge.md)
- Config quality conventions: [Config Authoring](./config-authoring.md)
