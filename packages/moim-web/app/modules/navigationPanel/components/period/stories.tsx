import * as React from "react";
const { storiesOf } = require("@storybook/react");
const {
  date: dateKnob,
  select: selectKnob,
} = require("@storybook/addon-knobs");
import { STORYBOOK_PREFIX } from "common/constants/storybook";

import Period from ".";

storiesOf(
  `${STORYBOOK_PREFIX.MODULE_COMPONENTS}/navigationPanel/period`,
  module,
).add("Default", () => (
  <Period
    status={selectKnob("status", {
      ready: "ready",
      activated: "activated",
      terminated: "terminated",
    })}
    period={{
      startTime: new Date(
        dateKnob("Start date", new Date(Date.now() + 86400000), "Before"),
      ).getTime(),
      endTime: new Date(
        dateKnob("End date", new Date(Date.now() + 172800000), "Before"),
      ).getTime(),
    }}
  />
));
