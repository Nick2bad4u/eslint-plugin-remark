import { defineConfig } from "stylelint-define-config";

const sharedRules = {
    "declaration-no-important": true,
    "font-family-no-missing-generic-family-keyword": true,
} as const;

export default defineConfig({
    fix: true,
    cache: true,
    formatter: "string",
    overrides: [
        {
            customSyntax: "postcss-scss",
            files: ["**/*.scss"],
            rules: sharedRules,
        },
    ],
    rules: {
        ...sharedRules,
    },
});
