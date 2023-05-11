import * as React from "react";
const { storiesOf } = require("@storybook/react");
import { STORYBOOK_PREFIX } from "common/constants/storybook";
import SettingMenu from "./index";

storiesOf(`${STORYBOOK_PREFIX.MODULE_COMPONENTS}/Setting Menu`, module).add(
  "default",
  () => (
    <SettingMenu
      menus={[
        {
          text: "Menu1",
          location: "/menus/menu1",
        },
      ]}
    />
  ),
);
