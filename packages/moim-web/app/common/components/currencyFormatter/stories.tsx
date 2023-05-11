import * as React from "react";
import { STORYBOOK_PREFIX } from "common/constants/storybook";
const { storiesOf } = require("@storybook/react");
const { text, number: numberKnob } = require("@storybook/addon-knobs");

import CurrencyFormatter from ".";

storiesOf(
  `${STORYBOOK_PREFIX.COMMON_COMPONENTS}/CurrencyFormatter`,
  module,
).add("Default", () => {
  return (
    <CurrencyFormatter
      currency={text("Currency", "KRW")}
      value={numberKnob("Value", 99999)}
    />
  );
});
