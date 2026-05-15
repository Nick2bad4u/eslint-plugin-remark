/* eslint-disable unused-imports/no-unused-vars -- This file intentionally keeps negative compile-time assignments for d.ts contract testing. */
import { assertType } from "vitest";

import type {
    Stylelint2ConfigName,
    Stylelint2Plugin,
    Stylelint2RuleId,
    Stylelint2RuleName,
} from "../src/plugin";

const validConfigName = "recommended";
assertType<Stylelint2ConfigName>(validConfigName);
// @ts-expect-error Invalid preset key must not satisfy Stylelint2ConfigName.
const _invalidConfigName: Stylelint2ConfigName = "recommended-type-checked";

const validRuleId = "stylelint-2/stylelint";
assertType<Stylelint2RuleId>(validRuleId);
// @ts-expect-error Rule ids must include the stylelint-2 namespace.
const _invalidRuleId: Stylelint2RuleId = "stylelint";

declare const pluginContract: Stylelint2Plugin;

assertType<Stylelint2RuleName>("stylelint");
assertType(pluginContract.configs.recommended);
assertType(pluginContract.configs.stylelintOnly);
assertType(pluginContract.configs.configuration);
assertType(pluginContract.configs.stylesheets);
assertType(pluginContract.configs.configs);
assertType(pluginContract.meta.name);
assertType(pluginContract.meta.namespace);
/* eslint-enable unused-imports/no-unused-vars -- End of compile-time negative test declarations. */
