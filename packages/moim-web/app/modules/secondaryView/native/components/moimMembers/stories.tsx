import * as React from "react";
const { storiesOf } = require("@storybook/react");

import { STORYBOOK_PREFIX } from "common/constants/storybook";

import MoimMember from ".";

storiesOf(
  `${STORYBOOK_PREFIX.MODULE_COMPONENTS}/MoimMember`,
  module,
).add("default", () => <MoimMember />);
