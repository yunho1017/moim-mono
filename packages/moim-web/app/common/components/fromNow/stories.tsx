import * as React from "react";
const { storiesOf } = require("@storybook/react");
const { number: numberKnob } = require("@storybook/addon-knobs");

import FromNow from ".";
import { STORYBOOK_PREFIX } from "common/constants/storybook";

storiesOf(
  `${STORYBOOK_PREFIX.COMMON_COMPONENTS}/FromNow`,
  module,
).add("Default", () => (
  <FromNow givenDate={numberKnob("FromNow", new Date().getTime())} />
));
