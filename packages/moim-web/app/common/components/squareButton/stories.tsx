import * as React from "react";

const { storiesOf } = require("@storybook/react");
import SquareButton from ".";
import { STORYBOOK_PREFIX } from "common/constants/storybook";

storiesOf(
  `${STORYBOOK_PREFIX.COMMON_COMPONENTS}/Buttons/Square button`,
  module,
).add("Default", () => <SquareButton>HELLO</SquareButton>);
