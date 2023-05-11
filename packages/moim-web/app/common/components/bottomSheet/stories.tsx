import * as React from "react";
const { storiesOf } = require("@storybook/react");
const { action } = require("@storybook/addon-actions");
const { number: numberKnob } = require("@storybook/addon-knobs");

import BottomSheet from ".";
import { STORYBOOK_PREFIX } from "common/constants/storybook";

const MockComponent = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = React.useCallback(() => {
    setOpen(true);
  }, []);
  const handleClose = React.useCallback(() => {
    setOpen(false);
    action("onCloseRequest");
  }, []);

  return (
    <div>
      <button
        style={{ width: "100%", height: "50px", border: "1px solid grey" }}
        onClick={handleOpen}
      >
        OPEN BOTTOM SHEET
      </button>
      <BottomSheet
        open={open}
        minHeight={numberKnob("Min Height", 0)}
        onCloseRequest={handleClose}
      >
        <ul>
          <li style={{ height: "4.2rem" }} key="1">
            menu 1
          </li>
          <li style={{ height: "4.2rem" }} key="2">
            menu 2
          </li>
          <li style={{ height: "4.2rem" }} key="3">
            menu 3
          </li>
          <li style={{ height: "4.2rem" }} key="4">
            menu 4
          </li>
          <li style={{ height: "4.2rem" }} key="5">
            menu 5
          </li>
        </ul>
      </BottomSheet>
    </div>
  );
};

storiesOf(
  `${STORYBOOK_PREFIX.COMMON_COMPONENTS}/Bottom sheet`,
  module,
).add("Default", () => <MockComponent />);
