---
title: Overview
description: What eslint-plugin-remark does, how the rule docs are organized, and where to start.
---

# Overview

`eslint-plugin-remark` is built for teams that want Markdown quality checks to run through the same ESLint command and editor integration as the rest of their codebase.

1. **Bridge Remark into ESLint** so Remark diagnostics and autofixes can flow through the ESLint pipeline.
2. **Enforce maintainable Remark config authoring** so `remark.config.*` and `.remarkrc.*` files stay predictable, reviewable, and automation-friendly.

If you only care about bridge behavior, start with:

- [`remark` rule](../remark.md)
- [`remarkOnly` preset](../presets/remark-only.md)

If you also want strict configuration hygiene, start with:

- [`recommended` preset](../presets/recommended.md)
- [Config Authoring](./config-authoring.md)

## How this rules documentation is organized

The Rules docs section is split by decision-making flow:

1. **Guides** for adoption strategy and practical setup.
2. **Presets** for curated rule sets ([reference](../presets/index.md)).
3. **Rule catalog** for per-rule details and examples ([catalog](../overview.md)).

## Pick a path

### Path A — "Just run Remark from ESLint"

Use this if your main goal is unified Markdown lint execution in CI and editors:

1. Follow [Getting Started](./getting-started.md).
2. Enable [`remarkOnly`](../presets/remark-only.md).
3. Tune the [`remark` rule options](../remark.md) if needed.

### Path B — "Also standardize config quality"

Use this if you want consistent Remark config shape across repos:

1. Start with [`recommended`](../presets/recommended.md).
2. Review [Config Authoring](./config-authoring.md).
3. Tighten with additional rule-level policies from [Rule Catalog](../overview.md).

### Path C — "Need details before enabling"

If you are evaluating behavior or migration risk:

- Read [Remark Bridge](./remark-bridge.md).
- Skim [FAQ](./faq.md).
- Validate on a small target package first.

## Quick map

- [Getting Started](./getting-started.md)
- [Remark Bridge](./remark-bridge.md)
- [Config Authoring](./config-authoring.md)
- [FAQ](./faq.md)
- [Presets](../presets/index.md)
- [Rule Catalog](../overview.md)