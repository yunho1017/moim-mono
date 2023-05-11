import * as React from "react";
const { storiesOf } = require("@storybook/react");

import AutoCompleteList from ".";
import { STORYBOOK_PREFIX } from "common/constants/storybook";

storiesOf(
  `${STORYBOOK_PREFIX.MODULE_COMPONENTS}/AutoCompleteList`,
  module,
).add("default", () => <AutoCompleteList />);
