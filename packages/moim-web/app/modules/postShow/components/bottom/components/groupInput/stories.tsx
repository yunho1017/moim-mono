import * as React from "react";
const { storiesOf } = require("@storybook/react");
import { STORYBOOK_PREFIX } from "common/constants/storybook";

import GroupInput from ".";

storiesOf(
  `${STORYBOOK_PREFIX.MODULE_COMPONENTS}/Forum/Components/show/Bottom/GroupInput`,
  module,
).add("default", () => <GroupInput />);
