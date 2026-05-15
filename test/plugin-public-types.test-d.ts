/* eslint-disable unused-imports/no-unused-vars -- This file intentionally keeps negative compile-time assignments for d.ts contract testing. */
import { assertType } from "vitest";

import type {
    RemarkConfigName,
    RemarkPlugin,
    RemarkRuleId,
    RemarkRuleName,
} from "../src/plugin";

const validConfigName = "recommended";
assertType<RemarkConfigName>(validConfigName);
// @ts-expect-error Invalid preset key must not satisfy RemarkConfigName.
const _invalidConfigName: RemarkConfigName = "recommended-type-checked";

const validRuleId = "remark/remark";
assertType<RemarkRuleId>(validRuleId);
// @ts-expect-error Rule ids must include the remark namespace.
const _invalidRuleId: RemarkRuleId = "remark";

declare const pluginContract: RemarkPlugin;

assertType<RemarkRuleName>("remark");
assertType(pluginContract.configs.recommended);
assertType(pluginContract.configs.remarkOnly);
assertType(pluginContract.configs.configuration);
assertType(pluginContract.configs.markdown);
assertType(pluginContract.configs.configs);
assertType(pluginContract.meta.name);
assertType(pluginContract.meta.namespace);
/* eslint-enable unused-imports/no-unused-vars -- End of compile-time negative test declarations. */
