---
title: Rule Authoring Workflow
description: A practical workflow for adding and maintaining rules in eslint-plugin-stylelint-2.
---

# Rule Authoring Workflow

## 1) Define rule intent first

Before writing code, lock down:

- what code/config shape is allowed
- what should be reported
- whether fixers are safe or should be suggestions only

## 2) Implement rule metadata correctly

Every rule should define:

- `meta.type`
- `meta.docs.description`
- `meta.docs.url`
- `meta.schema`
- `meta.messages`

Use `messageId`-based reporting only.

## 3) Keep traversal fast

Prefer narrow selectors and early exits. Avoid expensive repeated work in visitors.

## 4) Add tests with intent coverage

At minimum include:

- valid cases (false-positive protection)
- invalid cases (true-positive coverage)
- fixer outputs (when applicable)
- edge cases for odd config structures

## 5) Update docs and presets together

When rule behavior affects docs or preset membership:

- update rule docs
- run sync scripts for generated tables/matrixes
- validate docs build
