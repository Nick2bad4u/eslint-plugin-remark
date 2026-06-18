/**
 * @packageDocumentation
 * Bridge Remark diagnostics and optional full-document output into ESLint.
 */
import type { TSESLint } from "@typescript-eslint/utils";

import { arrayJoin, isDefined } from "ts-extras";

import { runRemarkSynchronously } from "../_internal/remark-runner.js";
import {
    createTypedRule,
    type RuleModuleWithDocs,
    toRuleListener,
} from "../_internal/typed-rule.js";

type MessageIds = "remarkConfigError" | "remarkProblem";

type Options = readonly [RemarkRuleOption?];

type RemarkRuleOption = Readonly<{
    configFile?: string;
    fix?: boolean;
    quiet?: boolean;
}>;

type ReportLocation = Readonly<{
    end: { column: number; line: number };
    start: { column: number; line: number };
}>;

const toEslintLoc = (
    message: Readonly<{
        column: number;
        endColumn?: number;
        endLine?: number;
        line: number;
    }>
): ReportLocation => ({
    end: {
        column: Math.max((message.endColumn ?? message.column + 1) - 1, 0),
        line: message.endLine ?? message.line,
    },
    start: {
        column: Math.max(message.column - 1, 0),
        line: message.line,
    },
});

const runRemarkForContext = (
    context: Readonly<TSESLint.RuleContext<MessageIds, Options>>,
    rawOptions: RemarkRuleOption
): ReturnType<typeof runRemarkSynchronously> | undefined => {
    try {
        return runRemarkSynchronously({
            code: context.sourceCode.text,
            codeFilename: context.physicalFilename,
            cwd: context.cwd,
            ...(isDefined(rawOptions.configFile) && {
                configFile: rawOptions.configFile,
            }),
            ...(isDefined(rawOptions.fix) && { fix: rawOptions.fix }),
            ...(isDefined(rawOptions.quiet) && { quiet: rawOptions.quiet }),
        });
    } catch (error: unknown) {
        context.report({
            data: {
                message: error instanceof Error ? error.message : String(error),
            },
            loc: {
                end: { column: 0, line: 1 },
                start: { column: 0, line: 1 },
            },
            messageId: "remarkConfigError",
            node: context.sourceCode.ast,
        });

        return undefined;
    }
};

/** Rule module that bridges Remark diagnostics into ESLint. */
const remarkRule: RuleModuleWithDocs<MessageIds, Options> = createTypedRule<
    MessageIds,
    Options
>({
    create(context, [rawOptions = {}]) {
        const runRemarkBridge = (): void => {
            const sourceCode = context.sourceCode;
            const lintResult = runRemarkForContext(context, rawOptions);

            if (!isDefined(lintResult)) {
                return;
            }

            const output = lintResult.output;

            if (isDefined(output)) {
                context.report({
                    data: {
                        rule: "remark-output",
                        text: "Remark produced normalized output for this Markdown file.",
                    },
                    fix: (fixer: TSESLint.RuleFixer) =>
                        fixer.replaceTextRange(
                            [0, sourceCode.text.length],
                            output
                        ),
                    loc: {
                        end: { column: 0, line: 1 },
                        start: { column: 0, line: 1 },
                    },
                    messageId: "remarkProblem",
                    node: sourceCode.ast,
                });
            }

            for (const message of lintResult.messages) {
                context.report({
                    data: {
                        rule:
                            arrayJoin(
                                [message.source, message.ruleId].filter(
                                    isDefined
                                ),
                                "/"
                            ) || "remark",
                        text: message.reason,
                    },
                    loc: toEslintLoc(message),
                    messageId: "remarkProblem",
                    node: sourceCode.ast,
                });
            }
        };

        return toRuleListener({
            Program: runRemarkBridge,
            root: runRemarkBridge,
        });
    },
    meta: {
        defaultOptions: [{}],
        deprecated: false,
        docs: {
            configs: [
                "remark.configs.recommended",
                "remark.configs.remarkOnly",
                "remark.configs.all",
            ],
            description:
                "enforce Remark diagnostics for Markdown files from ESLint.",
            recommended: true,
            requiresTypeChecking: false,
            url: "https://nick2bad4u.github.io/eslint-plugin-remark/docs/rules/remark",
        },
        fixable: "code",
        messages: {
            remarkConfigError: "Remark configuration error: {{message}}",
            remarkProblem: "Remark ({{rule}}): {{text}}",
        },
        schema: [
            {
                additionalProperties: false,
                description:
                    "Optional Remark bridge settings forwarded to the Remark worker.",
                properties: {
                    configFile: {
                        description:
                            "Explicit Remark config file path to use instead of normal config discovery.",
                        type: "string",
                    },
                    fix: {
                        description:
                            "Replace the full Markdown document with Remark output when Remark changes it.",
                        type: "boolean",
                    },
                    quiet: {
                        description: "Only report fatal Remark messages.",
                        type: "boolean",
                    },
                },
                type: "object",
            },
        ],
        type: "layout",
    },
    name: "remark",
});

export default remarkRule;
