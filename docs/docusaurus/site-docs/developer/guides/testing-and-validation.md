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

## When docs/navigation change

Also validate:

- no broken links in docs build output
- sidebar routes keep expected context
- navbar/footer links match current route structure

## When preset docs change

Run sync scripts that maintain generated preset and rules tables when needed.

## CI parity guidance

If local and CI differ:

1. capture failing logs into `temp/`
2. identify first root-cause error
3. fix source/config (not generated build output)
