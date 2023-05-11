import * as React from "react";
const { storiesOf } = require("@storybook/react");
const { action } = require("@storybook/addon-actions");
import { STORYBOOK_PREFIX } from "common/constants/storybook";
import { MenuWrapper, MenuItem } from "../menu";
import MenuPopover from ".";

storiesOf(
  `${STORYBOOK_PREFIX.COMMON_COMPONENTS}/Responsive menu/Components/Menu popover`,
  module,
).add("Default", () => (
  <MenuPopover open={true} onCloseRequest={action("onCloseRequest")}>
    <MenuWrapper>
      <MenuItem key="menu_1">Menu 1</MenuItem>
      <MenuItem key="menu_2">Menu 2</MenuItem>
      <MenuItem key="menu_3">Menu 3</MenuItem>
      <MenuItem key="menu_4">Menu 4</MenuItem>
    </MenuWrapper>
  </MenuPopover>
));
