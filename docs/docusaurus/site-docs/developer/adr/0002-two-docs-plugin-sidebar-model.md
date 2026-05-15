---
title: ADR-0002 Two-docs-plugin sidebar model
description: Why rules docs and classic docs use separate docs plugin instances and sidebar sources.
---

# ADR-0002: Two-docs-plugin sidebar model

- **Status:** Accepted
- **Date:** 2026-04-04

## Context

The project has two distinct documentation audiences:

1. Rule consumers (`/docs/rules/**`)
2. Plugin contributors (`/docs/developer/**`)

## Decision

Use two docs plugin instances:

- classic docs plugin for developer-focused docs
- dedicated rules docs plugin for rules/presets/guides

Keep separate sidebar sources to maintain audience-focused navigation.

## Consequences

### Positive

- Clearer navigation per audience
- Cleaner sidebar information density
- Less cross-context sidebar confusion

### Trade-offs

- Route/link updates must be synchronized across plugin boundaries
- Navbar/footer links require extra care when moving docs pages
