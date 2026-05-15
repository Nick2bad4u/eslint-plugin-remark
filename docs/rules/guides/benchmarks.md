---
title: Benchmarks
description: Benchmark strategy for eslint-plugin-stylelint-2.
---

# Benchmarks

The benchmark suite in this repository focuses on meaningful real-world workflows instead of toy snippets.

## Current scenarios

- valid stylesheet corpus
- invalid stylesheet corpus
- fix-enabled stylesheet corpus
- invalid config corpus

## Goal

The goal is to catch regressions in the Stylelint bridge path and the config-authoring rule path before they become editor-time annoyances.

## What is benchmarked today

- stylesheet reporting without fixes
- stylesheet reporting with fixes
- config-rule evaluation for invalid config files

These are the workloads most likely to matter during normal editor and CI usage.
