import * as React from "react";
const { storiesOf } = require("@storybook/react");
const { action } = require("@storybook/addon-actions");
const {
  text: textKnob,
  boolean: booleanKnob,
  number: numberKnob,
} = require("@storybook/addon-knobs");

import ResponsiveTextArea from ".";
import { STORYBOOK_PREFIX } from "common/constants/storybook";

storiesOf(
  `${STORYBOOK_PREFIX.COMMON_COMPONENTS}/Inputs/Responsive textarea`,
  module,
).add("Default", () => (
  <ResponsiveTextArea
    content={textKnob("Value", "")}
    placeholder={textKnob("PlaceHolder", "placeholder")}
    disabled={booleanKnob("Disabled", false)}
    readOnly={booleanKnob("Readonly", false)}
    maxLength={numberKnob("Max length", 200)}
    onContentChange={action("onContentChange")}
    onEnter={action("onEnter")}
  />
));
