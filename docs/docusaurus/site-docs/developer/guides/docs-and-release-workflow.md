---
title: Docs and Release Workflow
description: Workflow for docs updates, generated assets, and release-oriented validation.
---

# Docs and Release Workflow

## Docs authoring workflow

1. Update source docs under `docs/rules/**` or `docs/docusaurus/site-docs/**`
2. Run relevant sync scripts for generated markdown tables
3. Build docs (`npm run docs:build`)
4. Verify no broken links and correct sidebar behavior

## Generated documentation surfaces

The project intentionally keeps rule and preset docs authored, but selected tables are generated from runtime plugin metadata so published docs cannot drift from actual preset wiring.

| Surface                  | Source of truth                                  | Validation command                  |
| ------------------------ | ------------------------------------------------ | ----------------------------------- |
| README rule table        | built plugin rule metadata                       | `npm run sync:readme-rules-table`   |
| Preset index rule matrix | built plugin configs/rules                       | `npm run sync:presets-rules-matrix` |
| Per-preset rule matrices | built plugin configs/rules                       | `npm run sync:presets-rules-matrix` |
| API docs                 | TypeDoc over `src/plugin.ts` and `src/_internal` | `npm run docs:build`                |

When a rule is added, removed, renamed, or moved between presets, run:

```bash
npm run build
node scripts/sync-presets-rules-matrix.mjs --write
node scripts/sync-readme-rules-table.mjs --write
```

Then review the generated markdown diff. Do not manually edit inside generated marker blocks.

## Preset docs contract

Every public preset page under `docs/rules/presets/` should explain:

- what the preset enables
- who should use it
- rollout considerations
- the generated rule matrix for that preset

The generated matrix is deliberately repeated on each preset detail page so readers do not need to jump back to the aggregate preset page to understand coverage.

## Release safety checklist

Before tagging/releasing:

- lint/typecheck/tests pass
- production build passes
- docs build passes
- generated docs and sidebar updates are committed
- `npm run release:verify` passes from a clean working tree or a reviewed release branch

## Common pitfalls

- Editing generated output instead of source
- Leaving stale links after route/sidebar changes
- Updating presets docs without re-running matrix/table sync
- Updating rule metadata without checking preset docs and README generated sections
