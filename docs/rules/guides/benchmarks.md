---
title: Benchmarks
description: Benchmark strategy for eslint-plugin-remark.
---

# Benchmarks

The benchmark suite in this repository focuses on meaningful real-world workflows instead of toy snippets.

## Current scenarios

- valid Markdown corpus
- invalid Markdown corpus
- fix-enabled Markdown corpus
- invalid Remark config corpus

## Goal

The goal is to catch regressions in the Remark bridge path and the config-authoring rule path before they become editor-time annoyances.

## What is benchmarked today

- Markdown reporting without fixes
- Markdown reporting with fixes
- config-rule evaluation for invalid config files

These are the workloads most likely to matter during normal editor and CI usage.
