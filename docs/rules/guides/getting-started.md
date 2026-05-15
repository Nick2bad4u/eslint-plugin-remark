---
title: Getting Started
description: Install eslint-plugin-stylelint-2, pick the right preset, and roll it out safely in CI/editor workflows.
---

# Getting Started

This guide gets you from zero to a production-safe baseline quickly.

## Prerequisites

- ESLint with Flat Config
- Stylelint installed in the same project
- A stylelint config file (for example `stylelint.config.mjs`)

## Step 1: Install dependencies

```bash
npm install --save-dev eslint-plugin-stylelint-2 stylelint
```

## Step 2: Start with one preset

Pick one adoption mode:

- **Bridge only** (just run Stylelint from ESLint): [`stylelintOnly`](../presets/stylelint-only.md)
- **Bridge + config quality** (recommended for teams): [`recommended`](../presets/recommended.md)

Example `eslint.config.mjs`:

```js
import stylelint2 from "eslint-plugin-stylelint-2";

export default [
  stylelint2.configs.recommended,
  {
    rules: {
      // Optional: tune bridge behavior here.
      "stylelint2/stylelint": "error",
    },
  },
];
```

## Step 3: Run lint once and apply fixes

```bash
npx eslint . --fix
```

Review the PR diff and categorize findings:

1. **Safe autofixes** (accept immediately)
2. **Configuration cleanups** (plan staged rollout)
3. **Actual style violations** (fix or suppress with rationale)

## Step 4: Configure the bridge rule intentionally

If your project needs custom syntax or special file matching, tune the [`stylelint` rule](../stylelint.md).

Typical options include:

- `customSyntax`
- `configFile`
- `configBasedir`
- `quiet`
- `allowEmptyInput`

## Step 5: Roll out in phases

Recommended rollout model:

1. Enable preset + run in CI as warning-only (short period)
2. Resolve baseline issues
3. Switch to error-level enforcement
4. Add stricter config-authoring rules over time

## Common rollout mistakes

- **Enabling `all` immediately**: high noise and slower adoption
- **Mixing Stylelint CLI and ESLint bridge outputs in the same CI gate** without clear ownership
- **Skipping autofix pass before triage**

## Where to go next

- Architecture and behavior: [Stylelint Bridge](./stylelint-bridge.md)
- Team standards and config conventions: [Config Authoring](./config-authoring.md)
- Preset details: [Preset Reference](../presets/index.md)
- Common troubleshooting: [FAQ](./faq.md)
