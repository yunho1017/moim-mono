import * as React from "react";
import styled from "styled-components";
const { storiesOf } = require("@storybook/react");
const {
  text: textKnob,
  number: numberKnob,
} = require("@storybook/addon-knobs");

import ShavedTextBlock from ".";
import { STORY_BOOK_PATH } from "../..";

const Wrapper = styled.div`
  margin: 1rem;
  width: 30rem;
`;

storiesOf(`${STORY_BOOK_PATH}/Components/ShavedText`, module).add(
  "Default",
  () => (
    <Wrapper>
      <ShavedTextBlock
        shaveLine={numberKnob("Shave Line", 4)}
        content={textKnob(
          "Content",
          "The reason why I voted this option is this Then reason why I voted this option is this The reason why I voted this option is this The reason why I voted this option is this The reason why I voted this option is this The reason why I voted this option is this The reason why I voted this option is this The reason why I voted this option is this The reason why I voted this option is this ",
        )}
      />
    </Wrapper>
  ),
);
