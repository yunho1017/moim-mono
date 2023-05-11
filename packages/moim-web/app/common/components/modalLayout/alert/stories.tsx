import * as React from "react";
import { STORYBOOK_PREFIX } from "common/constants/storybook";
const { storiesOf } = require("@storybook/react");
const { action } = require("@storybook/addon-actions");

import AlertModalLayout from "./index";

const title = "Alert dialog title";
const content =
  "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna wirl aliqua. Up exlaborum incididunt.";
const button = {
  text: "Button",
  onClick: action("onClick"),
};

storiesOf(`${STORYBOOK_PREFIX.COMMON_COMPONENTS}/ModalLayout/Alert`, module)
  .add("title contents", () => (
    <AlertModalLayout
      title={title}
      content={content}
      leftButtons={[button]}
      rightButtons={[button, button]}
    />
  ))
  .add("title", () => (
    <AlertModalLayout
      title={title}
      leftButtons={[button]}
      rightButtons={[button, button]}
    />
  ))
  .add("contents", () => <AlertModalLayout content={content} rightButtons={[button]} />);
