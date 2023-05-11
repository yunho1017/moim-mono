import * as React from "react";
const { storiesOf } = require("@storybook/react");

import { STORYBOOK_PREFIX } from "common/constants/storybook";
import ThreadListAppBar from ".";

storiesOf(
  `${STORYBOOK_PREFIX.MODULE_COMPONENTS}/Forum/ThreadListAppBar`,
  module,
).add("Active", () => (
  <div style={{ width: "375px" }}>
    <ThreadListAppBar visibleTopTabNavigation={false} />
  </div>
));
