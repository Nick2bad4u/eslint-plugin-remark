---
title: "ADR-0001: Bridge-first architecture"
description: Why this plugin centers on bridging Remark diagnostics through ESLint.
---

# ADR-0001: Bridge-first architecture

## Status

Accepted.

## Context

Teams often already run ESLint as the single editor and CI lint entrypoint. Markdown quality checks usually live in a separate Remark command, which can create duplicate workflow setup and inconsistent reporting.

## Decision

Adopt a bridge-first model where `remark/remark` surfaces Remark diagnostics inside ESLint execution.

The plugin still keeps config-authoring rules separate from the bridge rule so users can adopt Markdown linting and config hygiene independently.

## Consequences

- ESLint remains the primary editor/CI integration point.
- Remark plugins and fixes can be surfaced through ESLint rule reports.
- Config authoring rules can validate `remark.config.*` and `.remarkrc.*` files without running Markdown content linting.
- The bridge must carefully preserve ESLint's synchronous rule contract while Remark processing stays asynchronous internally.
