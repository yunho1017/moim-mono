import * as React from "react";
import { STORYBOOK_PREFIX } from "common/constants/storybook";
import JoinButtonView from "./component";

const { storiesOf } = require("@storybook/react");
const { action } = require("@storybook/addon-actions");
const { text: textKnob } = require("@storybook/addon-knobs");

storiesOf(`${STORYBOOK_PREFIX.COMMON_COMPONENTS}/JoinButton/Flat`, module)
  .add("Default", () => (
    <JoinButtonView
      label={textKnob("label", "Join moim")}
      onClick={action("onClick")}
    />
  ))
  .add("disabled", () => (
    <JoinButtonView
      label={textKnob("label", "Join moim")}
      onClick={action("onClick")}
    />
  ));
