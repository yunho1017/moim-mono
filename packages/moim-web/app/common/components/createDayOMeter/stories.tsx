import * as React from "react";

const { storiesOf } = require("@storybook/react");
const { date: dateKnob } = require("@storybook/addon-knobs");

import CreateDayOMeter from ".";
import { STORYBOOK_PREFIX } from "common/constants/storybook";

const currentDate = new Date();

storiesOf(
  `${STORYBOOK_PREFIX.COMMON_COMPONENTS}/Texts/Date/CreateDayOMeter`,
  module,
).add("Base", () => (
  <CreateDayOMeter givenDate={dateKnob("생성일", currentDate, "G1")} />
));
