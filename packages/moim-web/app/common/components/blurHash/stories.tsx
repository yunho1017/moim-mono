import * as React from "react";
const { storiesOf } = require("@storybook/react");

import BlurHash from ".";
import { STORYBOOK_PREFIX } from "common/constants/storybook";

storiesOf(
  `${STORYBOOK_PREFIX.COMMON_COMPONENTS}/BlurHash`,
  module,
).add("default", () => (
  <BlurHash
    hash="MNA0zo?GRhM_WA~Q-lRoRjWY-ixwR+WAax"
    width={492}
    height={328}
  />
));
