// vendor
import * as React from "react";

const { storiesOf } = require("@storybook/react");
const { actions } = require("@storybook/addon-actions");

import { STORYBOOK_PREFIX } from "common/constants/storybook";
import GroupInfo from ".";
import { RAW } from "app/__mocks__";

storiesOf(
  `${STORYBOOK_PREFIX.COMMON_COMPONENTS}/GroupInfo`,
  module,
).add("Default", () => (
  <GroupInfo
    groupName="Vingle"
    icon={RAW.IMAGE_ICON}
    onClickMoimProfile={actions("onClickMoimProfile")}
  />
));
