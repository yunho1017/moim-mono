import * as React from "react";
const { storiesOf } = require("@storybook/react");

import { STORYBOOK_PREFIX } from "common/constants/storybook";

import HorizontalChannelList from "./";

storiesOf(
  `${STORYBOOK_PREFIX.COMMON_COMPONENTS}/HorizontalChannelList`,
  module,
).add("default", () => (
  <div style={{ width: 500 }}>
    <HorizontalChannelList channelList={[]} onClickChannelItem={() => {}} />
  </div>
));
