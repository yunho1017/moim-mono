import * as React from "react";
import { STORYBOOK_PREFIX } from "common/constants/storybook";
import ThreadWriteButton from "./index";

const { storiesOf } = require("@storybook/react");

storiesOf(
  `${STORYBOOK_PREFIX.MODULE_COMPONENTS}/Forum/ThreadWriteButton`,
  module,
)
  .add("Active", () => (
    <div>
      <ThreadWriteButton forumId="C:123" visibleTopTabNavigation={false} />
    </div>
  ))
  .add("Inactive", () => (
    <div>
      <ThreadWriteButton forumId="C:123" visibleTopTabNavigation={false} />
    </div>
  ));
