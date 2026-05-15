---
title: Config Authoring
description: Build predictable, maintainable Remark config files with eslint-plugin-remark rule enforcement.
---

# Config Authoring

Bridge execution solves "how to run Remark from ESLint." Config authoring rules solve "how to keep Remark config files maintainable over time."

## Why config quality rules matter

In larger repositories, Remark config drift usually appears as:

- duplicated `plugins` entries
- inconsistent plugin array ordering
- hidden relative path assumptions
- plugin packages referenced by config but missing from package metadata

The config rule set keeps config files deterministic and review-friendly.

## Recommended baseline

Start with [`recommended`](../presets/recommended.md), then strengthen incrementally.

A practical progression:

1. Shape rules such as [`prefer-remark-plugins-array`](../prefer-remark-plugins-array.md).
2. Deduplication and sorting rules for stable diffs.
3. Package and path checks for monorepo safety.

## Authoring conventions that scale

### 1. Keep `plugins` explicit

- Avoid implicit path behavior.
- Prefer package-based references where possible.
- Enforce package-install checks with [`require-remark-plugins-packages-installed`](../require-remark-plugins-packages-installed.md).

### 2. Keep arrays deterministic

Use sorting rules to minimize merge churn:

- [`sort-remark-plugins`](../sort-remark-plugins.md)

### 3. Avoid local relative plugins by default

Local Remark plugins can be valid, but they are harder to package, share, and resolve consistently in monorepos.

Use [`disallow-remark-relative-plugin-paths`](../disallow-remark-relative-plugin-paths.md) unless local plugins are an explicit project policy.

## Monorepo tips

- Keep `configFile` explicit when packages need different Remark behavior.
- Avoid relative plugin path assumptions between packages.
- Validate package dependencies where Remark config references plugins.

## Migration strategy for existing repos

1. Enable config rules in warning mode first.
2. Apply autofixes and sorting.
3. Resolve remaining hard violations in batches.
4. Promote to error once baseline debt is cleared.

## Related docs

- Runtime bridge behavior: [Remark Bridge](./remark-bridge.md)
- Initial setup: [Getting Started](./getting-started.md)
- Full policy sets: [Preset Reference](../presets/index.md)