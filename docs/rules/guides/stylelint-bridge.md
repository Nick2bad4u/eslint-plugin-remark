---
title: Stylelint Bridge
description: Understand how eslint-plugin-stylelint-2 executes Stylelint through ESLint and what that means for diagnostics, fixes, and CI.
---

# Stylelint Bridge

The bridge is powered by the [`stylelint` rule](../stylelint.md). It runs Stylelint during ESLint execution and reports results as ESLint diagnostics.

## What the bridge gives you

- A single lint entrypoint (`eslint`) for JS/TS + style quality
- One diagnostics stream in editors and CI
- Unified autofix flow (`eslint --fix`) where safe

## How execution works

At a high level:

1. ESLint visits a supported file.
2. `stylelint2/stylelint` invokes Stylelint with your configured options.
3. Stylelint results are mapped to ESLint reports.
4. Autofixable issues are offered through ESLint fixers.

## What gets reported

The bridge can surface:

- Stylelint rule violations
- Stylelint parsing failures
- Invalid/unsupported Stylelint configuration details
- Deprecation and migration warnings (depending on Stylelint behavior)

## Fixing behavior

Use standard ESLint workflows:

```bash
npx eslint . --fix
```

Practical advice:

- Prefer `--fix` first, then triage leftovers.
- Treat non-fixable findings as policy debt, not random noise.
- Keep bridge options explicit so behavior is deterministic across CI/local environments.

## Option tuning checklist

If behavior looks inconsistent, verify:

- `configFile` points to the intended Stylelint config
- `configBasedir` is stable in monorepos
- `customSyntax` is set for non-standard syntaxes
- `allowEmptyInput` and `quiet` match your expectations

See full option docs in [`stylelint` rule reference](../stylelint.md).

## Performance tips

- Scope lint targets intentionally (do not lint the whole repo blindly in every job).
- Cache ESLint in CI where possible.
- Start with [`stylelintOnly`](../presets/stylelint-only.md) if you need low-friction adoption.
- Add config-authoring rules after baseline bridge stability.

## When to keep Stylelint CLI separately

You might still keep a dedicated Stylelint CLI job when:

- You require Stylelint-specific formatter output in a separate pipeline stage.
- You need parity with existing non-ESLint tooling contracts.

If you do this, avoid duplicated failing signals in PR checks (assign one owner per policy area).

## Related guides

- Setup path: [Getting Started](./getting-started.md)
- Config quality standards: [Config Authoring](./config-authoring.md)
- Troubleshooting edge cases: [FAQ](./faq.md)
