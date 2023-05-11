import * as React from "react";
const { storiesOf } = require("@storybook/react");
const {
  text: textKnob,
  select: selectKnob,
} = require("@storybook/addon-knobs");

import { ReasonInput } from ".";
import { STORYBOOK_PREFIX } from "common/constants/storybook";

storiesOf(`${STORYBOOK_PREFIX.COMMON_COMPONENTS}/Inputs/ReasonInput`, module)
  .add("Default", () => (
    <ReasonInput
      value={textKnob("Value", "hello")}
      reasonMessage={textKnob("Reason message", "Hello world")}
      reasonType={selectKnob("Reason type", {
        Normal: "normal",
        Success: "success",
        Error: "error",
      })}
    />
  ))
  .add("with label", () => (
    <ReasonInput
      label={textKnob("Title", "Title")}
      value={textKnob("Value", "hello")}
      reasonMessage={textKnob("Reason message", "Hello world")}
      reasonType={selectKnob("Reason type", {
        Normal: "normal",
        Success: "success",
        Error: "error",
      })}
    />
  ))
  .add("with suffix", () => (
    <ReasonInput
      suffix={textKnob("Title", "Title")}
      value={textKnob("Value", "hello")}
      reasonMessage={textKnob("Reason message", "Hello world")}
      reasonType={selectKnob("Reason type", {
        Normal: "normal",
        Success: "success",
        Error: "error",
      })}
    />
  ));
