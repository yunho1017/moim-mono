import * as React from "react";
const { storiesOf } = require("@storybook/react");
const { action } = require("@storybook/addon-actions");
import { STORYBOOK_PREFIX } from "common/constants/storybook";

import Positions from ".";
import { RAW } from "app/__mocks__";

storiesOf(
  `${STORYBOOK_PREFIX.MODULE_COMPONENTS}/Profile Dialog/components/positions`,
  module,
).add("Default", () => (
  <Positions positions={[RAW.POSITION]} onClickMore={action("OnClickMore")} />
));
