---
title: FAQ
description: Answers to common questions about bridge behavior, presets, rollout, and troubleshooting.
---

# FAQ

## Do I still need the Stylelint CLI if I use this plugin?

Not necessarily.

If your goal is a unified lint pipeline, ESLint + `stylelint2/stylelint` is usually enough.
Keep a dedicated Stylelint CLI job only if you need separate formatter/output contracts.

## Which preset should I start with?

- Start with [`stylelintOnly`](../presets/stylelint-only.md) for minimal-risk adoption.
- Start with [`recommended`](../presets/recommended.md) if you want bridge + config quality enforcement from day one.

## Why am I seeing both ESLint and Stylelint errors for similar issues?

You may have overlapping policy between ESLint ecosystem rules and bridged Stylelint rules.
Audit overlap and choose one source of truth for each policy area.

## Can I use autofix safely?

In most repos, yes—start by running `eslint --fix` in a branch and reviewing the diff.
Then enforce in CI once results are stable.

## How do I lint files that require custom parsers/syntaxes?

Configure the [`stylelint` rule](../stylelint.md) with `customSyntax` (and related options) so Stylelint parses those files correctly.

## What if some packages in a monorepo resolve config differently?

Set `configBasedir` intentionally and avoid fragile relative paths in Stylelint config references.
Use package-install validation rules to catch missing dependencies early.

## Why do config authoring rules matter if my Stylelint config already works?

A config can "work" while still being brittle, duplicated, or hard to review.
Authoring rules reduce long-term churn and make diffs deterministic.

## What’s the best migration order for existing repos?

1. Enable one preset.
2. Run autofix.
3. Resolve high-value violations first.
4. Promote warnings to errors once baseline is clean.

## Where should I go next?

- Setup flow: [Getting Started](./getting-started.md)
- Bridge internals and behavior: [Stylelint Bridge](./stylelint-bridge.md)
- Config quality conventions: [Config Authoring](./config-authoring.md)
