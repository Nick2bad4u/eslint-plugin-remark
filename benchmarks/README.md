# Benchmarks

This directory contains meaningful ESLint performance benchmarks for `eslint-plugin-remark`.

The current benchmark set focuses on the two shipped workflows:

- running the `remark` bridge rule on Markdown files
- running `prefer-remark-plugins-array` on Remark config modules

## Included scenarios

- **Valid Markdown corpus** to measure low-noise baseline cost
- **Invalid Markdown corpus** to measure Remark reporting overhead
- **Fix-enabled Markdown corpus** to measure Remark edit-info and ESLint fix-path overhead
- **Invalid config corpus** to measure config-rule rewrite cost

## Outputs

`run-eslint-stats.mjs` writes JSON reports to `coverage/benchmarks/eslint-stats.json`.