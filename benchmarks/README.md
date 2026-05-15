# Benchmarks

This directory contains meaningful ESLint performance benchmarks for `eslint-plugin-stylelint-2`.

The current benchmark set focuses on the two shipped workflows:

- running the `stylelint` bridge rule on CSS files
- running `prefer-stylelint-define-config` on Stylelint config modules

For the intentionally invalid CSS fixture, the benchmark config enables `ignoreDisables: true` so the corpus can keep a local disable comment without polluting ordinary editor diagnostics.

## Included scenarios

- **Valid stylesheet corpus** to measure low-noise baseline cost
- **Invalid stylesheet corpus** to measure Stylelint reporting overhead
- **Fix-enabled stylesheet corpus** to measure Stylelint edit-info and ESLint fix-path overhead
- **Invalid config corpus** to measure config-rule rewrite cost

## Outputs

`run-eslint-stats.mjs` writes JSON reports to `coverage/benchmarks/eslint-stats.json`.
