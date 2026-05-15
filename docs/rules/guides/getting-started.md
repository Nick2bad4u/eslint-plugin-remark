---
title: Getting Started
description: Install eslint-plugin-remark, pick the right preset, and roll it out safely in CI/editor workflows.
---

# Getting Started

This guide gets you from zero to a production-safe Remark-in-ESLint baseline.

## Prerequisites

- ESLint with Flat Config
- Remark installed in the same project
- A Remark config file if you want project-specific Remark plugins, for example `remark.config.mjs`

## Step 1: Install dependencies

```bash
npm install --save-dev eslint-plugin-remark eslint remark
```

Install any Remark plugins your config uses as normal project dependencies.

## Step 2: Start with one preset

Pick one adoption mode:

- **Bridge only**: [`remarkOnly`](../presets/remark-only.md)
- **Bridge + config quality**: [`recommended`](../presets/recommended.md)

Example `eslint.config.mjs`:

```js
import remark from "eslint-plugin-remark";

export default [
    ...remark.configs.recommended,
];
```

## Step 3: Run lint once and apply fixes

```bash
npx eslint . --fix
```

Review the PR diff and categorize findings:

1. **Safe autofixes**: accept immediately.
2. **Configuration cleanups**: plan staged rollout.
3. **Markdown content findings**: fix or suppress with rationale.

## Step 4: Configure the bridge rule intentionally

If your project needs a specific Remark config, tune the [`remark` rule](../remark.md).

Common options include:

- `configFile`
- `fix`
- `quiet`

## Step 5: Roll out in phases

Recommended rollout model:

1. Enable `remarkOnly` or `recommended` in warning mode for a short baseline period.
2. Resolve baseline Markdown and config issues.
3. Switch to error-level enforcement.
4. Add stricter config-authoring rules over time.

## Common rollout mistakes

- **Enabling `all` immediately**: higher noise and slower adoption.
- **Running separate Remark and ESLint gates with overlapping output** without clear ownership.
- **Skipping the autofix pass before triage**.

## Where to go next

- Architecture and behavior: [Remark Bridge](./remark-bridge.md)
- Team standards and config conventions: [Config Authoring](./config-authoring.md)
- Preset details: [Preset Reference](../presets/index.md)
- Common troubleshooting: [FAQ](./faq.md)