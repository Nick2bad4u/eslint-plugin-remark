---
title: ADR-0001 Bridge-first architecture
description: Why this plugin centers on bridging Stylelint diagnostics through ESLint.
---

# ADR-0001: Bridge-first architecture

- **Status:** Accepted
- **Date:** 2026-04-04

## Context

Consumers wanted one linting workflow and one diagnostics channel in CI/editor.

## Decision

Adopt a bridge-first model where `stylelint2/stylelint` surfaces Stylelint diagnostics inside ESLint execution.

## Consequences

### Positive

- Unified lint command surface
- Centralized CI checks
- Consistent editor diagnostics flow

### Trade-offs

- Requires careful option/config alignment between Stylelint and ESLint contexts
- Some teams may still need dedicated Stylelint CLI jobs for formatter-specific reporting
