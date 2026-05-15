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

## Release safety checklist

Before tagging/releasing:

- lint/typecheck/tests pass
- production build passes
- docs build passes
- generated docs and sidebar updates are committed

## Common pitfalls

- Editing generated output instead of source
- Leaving stale links after route/sidebar changes
- Updating presets docs without re-running matrix/table sync
