---
title: Rule Authoring Workflow
description: A practical workflow for adding and maintaining rules in eslint-plugin-remark.
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

## 6) Check preset impact explicitly

Before adding a rule to a preset, decide whether the rule belongs in:

- `remark.configs.remarkOnly` for Markdown bridge behavior only
- `remark.configs.configuration` for Remark config-file policy only
- `remark.configs.recommended` for low-noise defaults
- `remark.configs.all` for every shipped policy

Preset membership appears in the README, aggregate preset page, and every preset detail page. Keep the runtime config change and generated docs diff in the same commit.

## 7) Release-readiness pass

After implementation and docs updates:

```bash
npm run release:verify
```

Do not treat a rule as release-ready until the generated docs checks pass without modifying the working tree.
