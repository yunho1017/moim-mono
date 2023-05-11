import * as React from "react";
const { storiesOf } = require("@storybook/react");

import { STORYBOOK_PREFIX } from "common/constants/storybook";
import CreateGroup from ".";

storiesOf(
  `${STORYBOOK_PREFIX.MODULE_COMPONENTS}/CreateGroup`,
  module,
).add("main", () => <CreateGroup />);
