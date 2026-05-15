/**
 * @packageDocumentation
 * Bridge Stylelint diagnostics and computed autofixes into ESLint.
 */
import type { TSESLint } from "@typescript-eslint/utils";

import { isDefined } from "ts-extras";

import { runStylelintSynchronously } from "../_internal/stylelint-runner.js";
import {
    createTypedRule,
    replaceTextRange,
    type RuleModuleWithDocs,
    toRuleListener,
} from "../_internal/typed-rule.js";

type MessageIds =
    | "stylelintConfigWarning"
    | "stylelintParseError"
    | "stylelintProblem";

type Options = readonly [StylelintRuleOption?];

type ReportLocation = Readonly<{
    end: { column: number; line: number };
    start: { column: number; line: number };
}>;

type StylelintRuleOption = Readonly<{
    allowEmptyInput?: boolean;
    configBasedir?: string;
    configFile?: string;
    customSyntax?: string;
    ignoreDisables?: boolean;
    quiet?: boolean;
}>;

const toEslintLoc = (
    problem: Readonly<{
        column: number;
        endColumn?: number;
        endLine?: number;
        line: number;
    }>
): ReportLocation => ({
    end: {
        column: Math.max((problem.endColumn ?? problem.column + 1) - 1, 0),
        line: problem.endLine ?? problem.line,
    },
    start: {
        column: Math.max(problem.column - 1, 0),
        line: problem.line,
    },
});

/** Rule module that bridges Stylelint diagnostics into ESLint. */
const stylelintRule: RuleModuleWithDocs<MessageIds, Options> = createTypedRule<
    MessageIds,
    Options
>({
    create(context, [rawOptions = {}]) {
        return toRuleListener({
            StyleSheet() {
                const sourceCode = context.sourceCode;
                const lintResult = runStylelintSynchronously({
                    code: sourceCode.text,
                    codeFilename: context.physicalFilename,
                    cwd: context.cwd,
                    ...(isDefined(rawOptions.allowEmptyInput)
                        ? { allowEmptyInput: rawOptions.allowEmptyInput }
                        : {}),
                    ...(isDefined(rawOptions.configBasedir)
                        ? { configBasedir: rawOptions.configBasedir }
                        : {}),
                    ...(isDefined(rawOptions.configFile)
                        ? { configFile: rawOptions.configFile }
                        : {}),
                    ...(isDefined(rawOptions.customSyntax)
                        ? { customSyntax: rawOptions.customSyntax }
                        : {}),
                    ...(isDefined(rawOptions.ignoreDisables)
                        ? { ignoreDisables: rawOptions.ignoreDisables }
                        : {}),
                    ...(isDefined(rawOptions.quiet)
                        ? { quiet: rawOptions.quiet }
                        : {}),
                });
                const reportNode = sourceCode.ast;

                for (const parseError of lintResult.parseErrors) {
                    context.report({
                        data: {
                            message: parseError.message,
                        },
                        loc: toEslintLoc(parseError),
                        messageId: "stylelintParseError",
                        node: reportNode,
                    });
                }

                for (const warning of lintResult.warnings) {
                    const fixData = warning.fix;

                    context.report({
                        data: {
                            rule: warning.rule,
                            text: warning.text,
                        },
                        loc: toEslintLoc(warning),
                        messageId: "stylelintProblem",
                        node: reportNode,
                        ...(isDefined(fixData)
                            ? {
                                  fix: (fixer: TSESLint.RuleFixer) =>
                                      replaceTextRange(
                                          fixer,
                                          fixData.range,
                                          fixData.text
                                      ),
                              }
                            : {}),
                    });
                }

                for (const invalidOptionWarning of lintResult.invalidOptionWarnings) {
                    context.report({
                        data: {
                            message: invalidOptionWarning,
                        },
                        loc: {
                            end: { column: 0, line: 1 },
                            start: { column: 0, line: 1 },
                        },
                        messageId: "stylelintConfigWarning",
                        node: reportNode,
                    });
                }

                for (const deprecation of lintResult.deprecations) {
                    context.report({
                        data: {
                            message: deprecation,
                        },
                        loc: {
                            end: { column: 0, line: 1 },
                            start: { column: 0, line: 1 },
                        },
                        messageId: "stylelintConfigWarning",
                        node: reportNode,
                    });
                }
            },
        });
    },
    meta: {
        defaultOptions: [{}],
        deprecated: false,
        docs: {
            configs: [
                "stylelint2.configs.recommended",
                "stylelint2.configs.stylelintOnly",
                "stylelint2.configs.all",
            ],
            description:
                "enforce running Stylelint against CSS files from ESLint and surface Stylelint autofixes through ESLint's fixer pipeline.",
            recommended: true,
            requiresTypeChecking: false,
            url: "https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/stylelint",
        },
        fixable: "code",
        messages: {
            stylelintConfigWarning:
                "Stylelint configuration warning: {{message}}",
            stylelintParseError: "Stylelint parse error: {{message}}",
            stylelintProblem: "Stylelint ({{rule}}): {{text}}",
        },
        schema: [
            {
                additionalProperties: false,
                description:
                    "Optional Stylelint bridge settings forwarded to the Stylelint Node API.",
                properties: {
                    allowEmptyInput: {
                        description:
                            "Allow empty input when forwarding the file to Stylelint.",
                        type: "boolean",
                    },
                    configBasedir: {
                        description:
                            "Base directory used when resolving relative paths from the chosen Stylelint config.",
                        type: "string",
                    },
                    configFile: {
                        description:
                            "Explicit Stylelint config file path to use instead of normal config discovery.",
                        type: "string",
                    },
                    customSyntax: {
                        description:
                            "Optional Stylelint custom syntax package name.",
                        type: "string",
                    },
                    ignoreDisables: {
                        description:
                            "Ignore Stylelint disable comments while linting the file.",
                        type: "boolean",
                    },
                    quiet: {
                        description:
                            "Suppress warning-level Stylelint messages.",
                        type: "boolean",
                    },
                },
                type: "object",
            },
        ],
        type: "layout",
    },
    name: "stylelint",
});

export default stylelintRule;
