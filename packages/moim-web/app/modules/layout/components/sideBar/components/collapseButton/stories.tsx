// vendor
import * as React from "react";

const { storiesOf } = require("@storybook/react");
const { action } = require("@storybook/addon-actions");
import { STORYBOOK_PREFIX } from "common/constants/storybook";
import CollapseButton from "./";

storiesOf(
  `${STORYBOOK_PREFIX.COMMON_COMPONENTS}/CollapseButton`,
  module,
).add("Default", () => <CollapseButton onClick={action("onClick")} />);
