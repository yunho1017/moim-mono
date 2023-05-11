import * as React from "react";
import { STORYBOOK_PREFIX } from "common/constants/storybook";
const { storiesOf } = require("@storybook/react");
const { action } = require("@storybook/addon-actions");

import AlertDialog from ".";

const title = "Alert dialog title";
const content =
  "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna wirl aliqua. Up exlaborum incididunt.";
const button = {
  text: "Button",
  onClick: action("onClick"),
};

storiesOf(`${STORYBOOK_PREFIX.COMMON_COMPONENTS}/AlertDialog`, module)
  .add("default", () => (
    <AlertDialog
      open={true}
      title={title}
      content={content}
      leftButtons={[button]}
      rightButtons={[button, button]}
      onClose={action("onClose")}
    />
  ))
  .add("Only Title", () => (
    <AlertDialog
      open={true}
      title={title}
      rightButtons={[button]}
      onClose={action("onClose")}
    />
  ))
  .add("Only Content", () => (
    <AlertDialog
      open={true}
      content={content}
      rightButtons={[button]}
      onClose={action("onClose")}
    />
  ));
