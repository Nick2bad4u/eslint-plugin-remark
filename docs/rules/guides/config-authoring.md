---
title: Config Authoring
description: Build predictable, maintainable stylelint config files with eslint-plugin-stylelint-2 rule enforcement.
---

# Config Authoring

Bridge execution solves "how to run Stylelint from ESLint." Config authoring rules solve "how to keep Stylelint config files maintainable over time."

## Why config quality rules matter

In larger repositories, stylelint config drift usually appears as:

- duplicated `extends` / `plugins`
- inconsistent array ordering
- hidden relative path assumptions
- stale override blocks

The config rule set helps keep config files deterministic and review-friendly.

## Recommended baseline

Start with [`recommended`](../presets/recommended.md), then strengthen incrementally.

A practical progression:

1. Deduplication and shape rules (`require-*`, `disallow-*` basics)
2. Sorting rules for stable diffs
3. Environment-specific hardening (monorepo path/package checks)

## Authoring conventions that scale

### 1) Keep `extends` and `plugins` explicit

- Avoid implicit path behavior
- Prefer package-based references where possible
- Enforce package-install checks with dedicated rules

### 2) Keep arrays deterministic

Use sorting rules to minimize merge churn:

- [`sort-stylelint-extends`](../sort-stylelint-extends.md)
- [`sort-stylelint-plugins`](../sort-stylelint-plugins.md)
- [`sort-stylelint-rule-keys`](../sort-stylelint-rule-keys.md)

### 3) Treat overrides as policy, not exceptions

Enforce consistent override structure and file targeting:

- [`require-stylelint-overrides-configuration`](../require-stylelint-overrides-configuration.md)
- [`require-stylelint-overrides-files`](../require-stylelint-overrides-files.md)
- [`require-stylelint-overrides-files-array`](../require-stylelint-overrides-files-array.md)

### 4) Prevent legacy/deprecated patterns

Guard against obsolete or risky stylelint config patterns with `disallow-*` rules.

## Monorepo tips

- Keep `configBasedir` stable when invoking bridge rule options.
- Avoid relative extends/plugin path assumptions between packages.
- Validate package dependencies where stylelint config references plugins/presets.

## Migration strategy for existing repos

1. Enable config rules in warning mode first.
2. Apply autofixes and sorting.
3. Resolve remaining hard violations in batches.
4. Promote to error once baseline debt is cleared.

## Related docs

- Runtime bridge behavior: [Stylelint Bridge](./stylelint-bridge.md)
- Initial setup: [Getting Started](./getting-started.md)
- Full policy sets: [Preset Reference](../presets/index.md)
