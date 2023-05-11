import * as React from "react";
const { storiesOf } = require("@storybook/react");
const { action } = require("@storybook/addon-actions");
const {
  text: textKnob,
  boolean: booleanKnob,
  number: numberKnob,
  select: selectKnob,
} = require("@storybook/addon-knobs");

import { MultilineBoxInput, SingleLineBoxInput, NumberBoxInput } from ".";

import { STORYBOOK_PREFIX } from "common/constants/storybook";

storiesOf(`${STORYBOOK_PREFIX.DESIGN_SYSTEM}/BoxInput`, module)
  .add("Singleline", () => {
    const suffixType = selectKnob("Suffix Type", {
      Characters: "characters",
      Text: "text",
    });
    const maxLength = numberKnob("Max length", 200);
    const textSuffix = textKnob("Text Suffix", "");
    const suffix =
      suffixType === "characters"
        ? {
            type: "characters",
            maxCount: maxLength,
          }
        : {
            type: "text",
            text: textSuffix,
          };

    return (
      <SingleLineBoxInput
        size={selectKnob("Size", {
          Large: "Large",
          Small: "Small",
        })}
        status={selectKnob("Status", {
          Inactive: "Inactive",
          Focused: "Focused",
          Error: "Error",
        })}
        value={textKnob("Value", "")}
        placeholder={textKnob("PlaceHolder", "placeholder")}
        helperText={textKnob("HelperText", "")}
        disabled={booleanKnob("Disabled", false)}
        suffix={suffix as any}
        onChange={action("onContentChange")}
      />
    );
  })
  .add("Multiline", () => {
    const suffixType = selectKnob("Suffix Type", {
      Characters: "characters",
      Text: "text",
    });
    const maxLength = numberKnob("Max length", 200);
    const textSuffix = textKnob("Text Suffix", "");
    const suffix =
      suffixType === "characters"
        ? {
            type: "characters",
            maxCount: maxLength,
          }
        : {
            type: "text",
            text: textSuffix,
          };

    return (
      <MultilineBoxInput
        size={selectKnob("Size", {
          Large: "Large",
          Small: "Small",
        })}
        status={selectKnob("Status", {
          Inactive: "Inactive",
          Focused: "Focused",
          Error: "Error",
        })}
        value={textKnob("Value", "")}
        helperText={textKnob("HelperText", "")}
        placeholder={textKnob("PlaceHolder", "placeholder")}
        disabled={booleanKnob("Disabled", false)}
        suffix={suffix as any}
        onChange={action("onContentChange")}
      />
    );
  })
  .add("Number", () => (
    <NumberBoxInput
      value={numberKnob("Value", 0)}
      min={numberKnob("Min", 0)}
      max={numberKnob("Max", 10)}
      size={selectKnob("Size", {
        Large: "Large",
        Small: "Small",
      })}
      status={selectKnob("Status", {
        Inactive: "Inactive",
        Focused: "Focused",
        Error: "Error",
      })}
      helperText={textKnob("HelperText", "")}
      placeholder={textKnob("PlaceHolder", "placeholder")}
      disabled={booleanKnob("Disabled", false)}
      onChange={action("onContentChange")}
    />
  ));
