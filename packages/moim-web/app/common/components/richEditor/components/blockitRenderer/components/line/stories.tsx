import * as React from "react";
import styled from "styled-components";
const { storiesOf } = require("@storybook/react");
const {
  text: textKnob,
  number: numberKnob,
} = require("@storybook/addon-knobs");

import LineBlock from ".";
import { STORY_BOOK_PATH } from "../..";

const Wrapper = styled.div`
  margin: 1rem;
`;

storiesOf(`${STORY_BOOK_PATH}/Components/Lines`, module).add("Default", () => {
  return (
    <div>
      <Wrapper>
        <LineBlock
          backgroundColor={textKnob("BG color", "#AAA")}
          fillColor={textKnob("Fill color", "#0F0")}
          fillWidth={numberKnob("fillWidth", 0)}
          height={numberKnob("Height", 1)}
        />
      </Wrapper>
    </div>
  );
});
