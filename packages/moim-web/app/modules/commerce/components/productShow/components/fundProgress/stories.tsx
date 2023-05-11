import * as React from "react";
import { STORYBOOK_PREFIX } from "common/constants/storybook";
const { storiesOf } = require("@storybook/react");
const { number: numberKnob } = require("@storybook/addon-knobs");

import FundProgress from ".";

storiesOf(
  `${STORYBOOK_PREFIX.LAYOUT_COMPONENTS}/product show/FundProgress`,
  module,
).add("Default", () => {
  return (
    <FundProgress
      status="onSale"
      soldAmount={numberKnob("soldAmount", 0)}
      goalAmount={numberKnob("goalAmount", 1000000)}
      buyersCount={numberKnob("buyersCount", 0)}
      currency="KRW"
      buyers={[]}
    />
  );
});
