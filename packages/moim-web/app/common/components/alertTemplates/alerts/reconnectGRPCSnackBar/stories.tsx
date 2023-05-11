import * as React from "react";
const { storiesOf } = require("@storybook/react");
import { STORYBOOK_PREFIX } from "common/constants/storybook";
import SignGuideBanner from ".";

storiesOf(
  `${STORYBOOK_PREFIX.COMMON_COMPONENTS}/Banner/SignGuideBanner`,
  module,
).add("Default", () => <SignGuideBanner onClose={() => {}} />);
