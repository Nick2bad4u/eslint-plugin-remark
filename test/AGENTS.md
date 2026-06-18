---
name: "Codex-Instructions-ESLint-Remark-Testing"
description: "Instructions for writing robust tests for eslint-plugin-remark."
applyTo: "test/**"
---

# Test Instructions

- Use Vitest and `@typescript-eslint/rule-tester` through `test/_internal/ruleTester.ts`.
- Resolve rule modules with `getPluginRule("<rule-id>")` so tests verify public plugin wiring.
- Put bridge fixtures under `test/fixtures/remark/`.
- Cover valid cases, invalid cases, edge cases, and fixer output for every rule.
- Prefer explicit expected output over snapshots.
- Do not copy stale Stylelint test cases into new Remark rules.
