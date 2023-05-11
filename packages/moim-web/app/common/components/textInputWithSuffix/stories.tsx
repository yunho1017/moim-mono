import * as React from "react";
const { storiesOf } = require("@storybook/react");

import { STORYBOOK_PREFIX } from "common/constants/storybook";
import TextInputWithSuffix from ".";

storiesOf(
  `${STORYBOOK_PREFIX.COMMON_COMPONENTS}/Inputs/TextInputWithSuffix`,
  module,
).add("default", () => (
  <TextInputWithSuffix suffix=".vingle.group" placeholder="Create Group URL" />
));
