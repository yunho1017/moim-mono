import * as React from "react";
import { STORYBOOK_PREFIX } from "common/constants/storybook";
import ForumThreadList from "./";

const { storiesOf } = require("@storybook/react");

storiesOf(
  `${STORYBOOK_PREFIX.MODULE_COMPONENTS}/Forum/ForumThreadList`,
  module,
).add("Default", () => (
  <div>
    <ForumThreadList />
  </div>
));
