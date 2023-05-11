import * as React from "react";
const { storiesOf } = require("@storybook/react");
const { action } = require("@storybook/addon-actions");
import { STORYBOOK_PREFIX } from "common/constants/storybook";
import ForumShowContainer from "./";

storiesOf(
  `${STORYBOOK_PREFIX.MODULE_COMPONENTS}/Forum/Container/ForumShow`,
  module,
).add("default", () => (
  <div style={{ height: "1500px" }}>
    <ForumShowContainer
      isMobile={false}
      onMainBackClick={action("onMainBackClick")}
    />
  </div>
));
