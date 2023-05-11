import * as React from "react";
import styled from "styled-components";
import "rsuite/lib/styles/index.less";
const { storiesOf } = require("@storybook/react");
const { action } = require("@storybook/addon-actions");
const {
  text: textKnob,
  boolean: booleanKnob,
  number: numberKnob,
  date: dateKnob,
} = require("@storybook/addon-knobs");

import Inputs from ".";
import CheckBox from "./checkbox";
import DateTimePicker from "./dateTimePicker";
import { STORY_BOOK_PATH } from "../..";

const Wrapper = styled.div`
  margin: 1rem;
`;

storiesOf(`${STORY_BOOK_PATH}/Components/Inputs`, module)
  .add("Text Input", () => {
    return (
      <div>
        <Wrapper>
          <Inputs
            name="input-1"
            label={textKnob("Label", "Label text here")}
            description={
              booleanKnob("Enable Description", false)
                ? textKnob("description", "Hello hi")
                : undefined
            }
            element={{
              type: "text-input",
              validationExpression: textKnob("validationExpression", undefined),
              validationErrorMessage: textKnob(
                "validationErrorMessage",
                undefined,
              ),
              required: booleanKnob("required", false),
              placeholder: textKnob("placeholder", "placeholder..."),
              initialValue: textKnob("initialValue", ""),
              isRichText: false,
              isMultiline: booleanKnob("isMultiline", false),
              minLength: numberKnob("minLength", 0),
              maxLength: booleanKnob("Enable MaxLength", false)
                ? numberKnob("maxLength", 0)
                : undefined,
            }}
            onChange={action("onChange")}
          />
        </Wrapper>
      </div>
    );
  })
  .add("Number Input", () => {
    return (
      <div>
        <Wrapper>
          <Inputs
            name="input-1"
            label={textKnob("Label", "Label text here")}
            description={
              booleanKnob("Enable Description", false)
                ? textKnob("description", "Hello hi")
                : undefined
            }
            element={{
              type: "number-input",
              validationExpression: textKnob("validationExpression", undefined),
              validationErrorMessage: textKnob(
                "validationErrorMessage",
                undefined,
              ),
              required: booleanKnob("required", false),
              placeholder: textKnob("placeholder", "placeholder..."),
              initialValue: textKnob("initialValue", ""),
              decimalPlaces: numberKnob("decimalPlaces", 0),
              minValue: numberKnob("minValue", 0),
              maxValue: booleanKnob("Enable MaxValue", false)
                ? numberKnob("maxValue", 0)
                : undefined,
            }}
            onChange={action("onChange")}
          />
        </Wrapper>
      </div>
    );
  });

storiesOf(`${STORY_BOOK_PATH}/Components/Inputs/Select`, module)
  .add("CheckBox", () => (
    <CheckBox
      name="test"
      label={textKnob("label", "")}
      element={{
        type: "check-box-input",
        initialChecked: booleanKnob("initialChecked", false),
        required: booleanKnob("required", false),
      }}
    />
  ))
  .add("DateTimePicker", () => (
    <DateTimePicker
      name="test"
      label={textKnob("label", "")}
      element={{
        type: "date-select-input",
        required: booleanKnob("required", false),
        placeholder: textKnob("placeholder", ""),
        initialValue: dateKnob("initialVale", new Date()),
        format: textKnob("format", "YYYY-MM-DD HH:mm:ss"),
      }}
    />
  ));
