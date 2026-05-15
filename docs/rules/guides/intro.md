---
title: Overview
description: What eslint-plugin-stylelint-2 does, how the rules docs are organized, and where to start for your use case.
---

# Overview

`eslint-plugin-stylelint-2` is built for teams that want Stylelint and ESLint to cooperate cleanly.

1. **Bridge Stylelint into ESLint** so style diagnostics and autofixes can flow through your existing ESLint pipeline.
2. **Enforce maintainable Stylelint config authoring** so your Stylelint configuration stays predictable, reviewable, and automation-friendly.

If you only care about bridge behavior, start with:

- [`stylelint` rule](../stylelint.md)
- [`stylelintOnly` preset](../presets/stylelint-only.md)

If you also want strict configuration hygiene, start with:

- [`recommended` preset](../presets/recommended.md)
- then progressively adopt stricter config-focused rules from the main [rule catalog](../overview.md)

## How this rules documentation is organized

The Rules docs section is intentionally split by decision-making flow:

1. **Guides** (you are here) for adoption strategy and practical setup.
2. **Presets** for curated rule sets ([reference](../presets/index.md)).
3. **Rule catalog** for per-rule details and examples ([catalog](../overview.md)).

## Pick a path

### Path A — "Just run Stylelint from ESLint"

Use this if your main goal is unified lint execution in CI/editor:

1. Follow [Getting Started](./getting-started.md).
2. Enable [`stylelintOnly`](../presets/stylelint-only.md).
3. Tune the [`stylelint` rule options](../stylelint.md) if needed.

### Path B — "Also standardize config quality"

Use this if you want consistent stylelint config shape across repos:

1. Start with [`recommended`](../presets/recommended.md).
2. Review [Config Authoring](./config-authoring.md).
3. Tighten with additional rule-level policies from [Rule Catalog](../overview.md).

### Path C — "Need details before enabling"

If you are evaluating behavior or migration risk:

- Read [Stylelint Bridge](./stylelint-bridge.md).
- Skim [FAQ](./faq.md).
- Validate on a small target package first.

## Quick map

- [Getting Started](./getting-started.md)
- [Stylelint Bridge](./stylelint-bridge.md)
- [Config Authoring](./config-authoring.md)
- [FAQ](./faq.md)
- [Presets](../presets/index.md)
- [Rule Catalog](../overview.md)

## Recommended first steps (practical)

1. Enable one preset (`stylelintOnly` or `recommended`) and run lint once.
2. Apply autofixes and inspect diff quality in a PR.
3. Add config policy rules gradually (not all at once) to reduce noisy rollouts.
4. Lock in conventions via CI and editor integration.
