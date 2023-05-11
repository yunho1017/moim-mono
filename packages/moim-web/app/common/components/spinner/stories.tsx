import * as React from "react";

const { storiesOf } = require("@storybook/react");
import Spinner from ".";
import { STORYBOOK_PREFIX } from "common/constants/storybook";

storiesOf(
  `${STORYBOOK_PREFIX.COMMON_COMPONENTS}/Loader/Spinner`,
  module,
).add("Default", () => <Spinner />);
