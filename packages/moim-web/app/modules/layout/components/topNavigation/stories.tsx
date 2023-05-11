import * as React from "react";
const { storiesOf } = require("@storybook/react");
import { STORYBOOK_PREFIX } from "common/constants/storybook";
import TopNavigation from ".";

storiesOf(
  `${STORYBOOK_PREFIX.COMMON_COMPONENTS}/Banner/TopNavigation`,
  module,
).add("Default", () => <TopNavigation />);
