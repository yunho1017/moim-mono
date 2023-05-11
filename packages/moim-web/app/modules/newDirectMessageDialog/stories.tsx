import * as React from "react";
const { storiesOf } = require("@storybook/react");

import { STORYBOOK_PREFIX } from "common/constants/storybook";

import NewConversation from ".";

storiesOf(
  `${STORYBOOK_PREFIX.MODULE_COMPONENTS}/Conversations/newConversation`,
  module,
).add("default", () => <NewConversation />);
