# stylelint

Run Stylelint against CSS files from ESLint and surface Stylelint autofixes through ESLint's fixer pipeline.

## Targeted pattern scope

This rule targets complete CSS files linted through ESLint's `css/css` language support.

It does not look for one AST pattern inside a stylesheet. Instead, it forwards the whole file to Stylelint and converts Stylelint's findings into ESLint reports.

## What this rule reports

This rule reports:

- Stylelint rule violations for the current stylesheet
- Stylelint parse errors for the current stylesheet
- Stylelint invalid option warnings and deprecation warnings

When Stylelint provides computed edit info for a warning, this rule exposes that edit as an ESLint autofix.

## Why this rule exists

Projects often want ESLint to be the single command that editors, pre-commit hooks, and CI jobs run.

Without a bridge rule, stylesheet linting usually lives in a separate Stylelint command with a separate reporting flow. That split increases setup overhead and makes autofix workflows less consistent.

## ❌ Incorrect

```css
.button {
    color: #ffffff;
}
```

If the active Stylelint config prefers short hex colors, this stylesheet is reported through ESLint.

## ✅ Correct

```css
.button {
    color: #fff;
}
```

## Behavior and migration notes

- This rule uses Stylelint's Node API under the hood.
- The rule is only as strict as the Stylelint config it resolves for the current file.
- If your Stylelint config provides computed edit info, `eslint --fix` can apply the corresponding change.
- Non-fixable Stylelint warnings are still reported.
- You can set `ignoreDisables: true` when you want Stylelint disable comments to be ignored for a specific ESLint run.

## Additional examples

### ✅ Correct — explicit Stylelint config file

```ts
import stylelint2 from "eslint-plugin-stylelint-2";

export default [
    {
        ...stylelint2.configs.stylelintOnly,
        rules: {
            "stylelint-2/stylelint": [
                "error",
                {
                    configFile: "./stylelint.config.mjs",
                    ignoreDisables: true,
                },
            ],
        },
    },
];
```

## ESLint flat config example

```ts
import stylelint2 from "eslint-plugin-stylelint-2";

export default [
    ...stylelint2.configs.recommended,
];
```

## When not to use it

Do not use this rule if your team intentionally wants Stylelint to remain a separate command with separate editor integration.

## Package documentation

Stylelint package documentation:

> **Rule catalog ID:** R001

## Further reading

- [Stylelint Node.js API](https://stylelint.io/user-guide/node-api/)
- [Stylelint configuration guide](https://stylelint.io/user-guide/configure)
- [ESLint custom rules](https://eslint.org/docs/latest/extend/custom-rules)
