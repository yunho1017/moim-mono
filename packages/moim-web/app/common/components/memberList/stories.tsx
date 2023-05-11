import * as React from "react";
const { storiesOf } = require("@storybook/react");
const { action } = require("@storybook/addon-actions");

import { STORYBOOK_PREFIX } from "common/constants/storybook";

import MemberList from ".";
import { RAW } from "app/__mocks__";

storiesOf(
  `${STORYBOOK_PREFIX.COMMON_COMPONENTS}/MemberList`,
  module,
).add("default", () => (
  <MemberList
    isLoading={false}
    members={{ data: [RAW.MEMBER], paging: {} }}
    onGetMembers={action("get members")}
  />
));
