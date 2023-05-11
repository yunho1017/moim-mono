import * as React from "react";
import { STORYBOOK_PREFIX } from "common/constants/storybook";
import MessageBanner from "common/components/talk/components/messageBanner/index";

const { storiesOf } = require("@storybook/react");
const { action } = require("@storybook/addon-actions");

storiesOf(`${STORYBOOK_PREFIX.COMMON_COMPONENTS}/Talk/Banner`).add(
  "Index",
  () => (
    <MessageBanner
      message="4 new messages since"
      closeMessage="Mark as Read"
      onClickMessage={action("onClickMessage")}
      onClickClose={action("onClickClose")}
    />
  ),
);
