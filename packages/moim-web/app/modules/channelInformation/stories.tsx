import * as React from "react";
const { storiesOf } = require("@storybook/react");
const { action } = require("@storybook/addon-actions");

import { STORYBOOK_PREFIX } from "common/constants/storybook";

import ChannelInformation from ".";
import { RAW, MOCK_CHANNEL } from "app/__mocks__";

storiesOf(
  `${STORYBOOK_PREFIX.MODULE_COMPONENTS}/ChannelInformation`,
  module,
).add("default", () => (
  <ChannelInformation
    isLoading={false}
    isInitialLoading={false}
    channel={MOCK_CHANNEL.FORUM_MOCK_DATA}
    members={{ data: [RAW.MEMBER], paging: {} }}
    onGetMembers={action("get members")}
  />
));
