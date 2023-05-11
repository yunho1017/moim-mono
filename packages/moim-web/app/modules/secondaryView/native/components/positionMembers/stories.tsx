import * as React from "react";
const { storiesOf } = require("@storybook/react");

import { STORYBOOK_PREFIX } from "common/constants/storybook";

import PositionMembers from ".";

storiesOf(
  `${STORYBOOK_PREFIX.MODULE_COMPONENTS}/PositionMembers`,
  module,
).add("default", () => <PositionMembers positionId="P12314" />);
