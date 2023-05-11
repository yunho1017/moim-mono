import * as React from "react";
const { storiesOf } = require("@storybook/react");

import { STORYBOOK_PREFIX } from "common/constants/storybook";

import Conversations from ".";

storiesOf(
  `${STORYBOOK_PREFIX.MODULE_COMPONENTS}/Conversations`,
  module,
).add("default", () => <Conversations channelId="12314" />);
