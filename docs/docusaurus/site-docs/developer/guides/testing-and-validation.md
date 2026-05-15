---
title: Testing and Validation
description: Validation checklist for rule changes, docs changes, and release safety.
---

# Testing and Validation

Use this checklist before merging significant changes.

## Fast local checks

- `npm run lint:fix:quiet`
- `npm run typecheck`
- `npm run test`

## Full quality gate

- `npm run lint:all:fix:quiet`
- `npm run build`
- `npm run docs:build`
- `npm run release:verify`

## When docs/navigation change

Also validate:

- no broken links in docs build output
- sidebar routes keep expected context
- navbar/footer links match current route structure
- generated static output contains the expected target route when changing homepage, navbar, or footer links

## When preset docs change

Run sync scripts that maintain generated preset and rules tables:

```bash
npm run build
npm run sync:presets-rules-matrix
npm run sync:readme-rules-table
```

Use the `--write` script form only when intentionally updating generated markdown:

```bash
node scripts/sync-presets-rules-matrix.mjs --write
node scripts/sync-readme-rules-table.mjs --write
```

## CI parity guidance

If local and CI differ:

1. capture failing logs into `temp/`
2. identify first root-cause error
3. fix source/config (not generated build output)
