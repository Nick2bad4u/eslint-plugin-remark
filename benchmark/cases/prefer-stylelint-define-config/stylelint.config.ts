import { defineConfig } from "stylelint-define-config";

export default defineConfig({
    fix: true,
    cache: true,
    formatter: "string",
    extends: ["stylelint-config-standard"],
    rules: {
        "alpha-value-notation": "number",
        "color-no-invalid-hex": true,
    },
});
