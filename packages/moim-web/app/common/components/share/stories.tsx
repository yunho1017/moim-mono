import * as React from "react";
const { storiesOf } = require("@storybook/react");

import { H4Bold } from "common/components/designSystem/typos";
import Share from ".";
import { STORYBOOK_PREFIX } from "common/constants/storybook";

storiesOf(
  `${STORYBOOK_PREFIX.COMMON_COMPONENTS}/Share & Copy`,
  module,
).add("Default", () => (
  <Share displayText={<H4Bold>SHARE!</H4Bold>} copyValue="Sample copy value" />
));
