import * as React from "react";
const { storiesOf } = require("@storybook/react");

import ResponsiveMenu from ".";
import { MenuWrapper, MenuItem } from "./components/menu";
import { STORYBOOK_PREFIX } from "common/constants/storybook";

const MockComponent = () => {
  const refTarget = React.useRef<HTMLButtonElement>(null);
  const [open, setOpenState] = React.useState(false);
  const setOpen = React.useCallback(() => {
    setOpenState(true);
  }, []);
  const setClose = React.useCallback(() => {
    setOpenState(false);
  }, []);

  return (
    <div>
      <button
        ref={refTarget}
        style={{
          float: "right",
          width: 42,
          height: 42,
        }}
        onClick={setOpen}
      >
        메뉴
      </button>
      <ResponsiveMenu
        open={open}
        anchorElement={refTarget.current}
        onCloseRequest={setClose}
      >
        <MenuWrapper>
          <MenuItem key="menu_1">Menu 1</MenuItem>
          <MenuItem key="menu_2">Menu 2</MenuItem>
          <MenuItem key="menu_3">Menu 3</MenuItem>
          <MenuItem key="menu_4">Menu 4</MenuItem>
        </MenuWrapper>
      </ResponsiveMenu>
    </div>
  );
};

storiesOf(
  `${STORYBOOK_PREFIX.COMMON_COMPONENTS}/Responsive menu`,
  module,
).add("Default", () => <MockComponent />);
