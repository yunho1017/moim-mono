import * as React from "react";
import styled from "styled-components";
const { storiesOf } = require("@storybook/react");
const { boolean: booleanKnob } = require("@storybook/addon-knobs");

import FormBlock from ".";
import { STORY_BOOK_PATH } from "../..";

const Wrapper = styled.div`
  margin: 1rem;
`;

storiesOf(`${STORY_BOOK_PATH}/Components/Form`, module).add("Default", () => {
  const cancelButton = booleanKnob("Has CancelButton", false)
    ? ({
        content: "취소",
        type: "text",
        style: "general",
        size: "large",
      } as Moim.Blockit.IButtonBlockElement)
    : undefined;
  return (
    <div>
      <Wrapper>
        <FormBlock
          botId="bot1234"
          actionId="form"
          buttons={{
            submit: {
              content: "투표",
              type: "flat",
              style: "primary",
              size: "large",
            },
            cancel: cancelButton,
          }}
          blocks={[
            {
              type: "input",
              name: "input-1",
              label:
                "EN) How many [point type] would you spend to vote for [this option name]?",
              element: {
                decimalPlaces: 0,
                initialValue: 2,
                maxValue: 60,
                placeholder: "ICV",
                required: true,
                type: "number-input",
              },
            },
            {
              type: "text",
              subType: "caption",
              content: "Available voting power | # [point type]",
            },
            {
              type: "text",
              subType: "caption",
              content: "Total voting power | # [point type]",
            },
            {
              type: "text",
              subType: "caption",
              content: "Used voting power | # [point type]",
            },
            {
              type: "line",
              backgroundColor: "#e9edf0",
              height: 1,
              fillWidth: 0,
              fillColor: "primary-main",
            },
            {
              type: "input",
              name: "input-2",
              label: "Why would you like to vote for [this option name]?",
              description: "Please write within {count} characters.",
              element: {
                initialValue: "test",
                isMultiline: true,
                maxLength: 10000,
                placeholder: "Enter your response here...",
                required: true,
                type: "text-input",
              },
            },
          ]}
        />
      </Wrapper>
    </div>
  );
});
