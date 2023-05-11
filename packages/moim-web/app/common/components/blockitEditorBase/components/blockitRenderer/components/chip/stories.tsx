import * as React from "react";
import styled from "styled-components";
const { storiesOf } = require("@storybook/react");
const { text } = require("@storybook/addon-knobs");

import Chip from ".";
import { STORY_BOOK_PATH } from "../..";

const Wrapper = styled.div`
  margin: 1rem;
`;

storiesOf(`${STORY_BOOK_PATH}/Components/Chip`, module).add("Default", () => {
  return (
    <div>
      <Wrapper>
        <h1>Large</h1>
        <Chip
          content="VingleMoim Admin"
          style="square"
          size="large"
          color={text("color", "#0abacd")}
        />
        <Chip
          content="VingleMoim Admin"
          style="round"
          size="large"
          color={text("color", "#0abacd")}
        />
      </Wrapper>
      <Wrapper>
        <h1>Medium</h1>
        <Chip
          content="VingleMoim Admin"
          style="square"
          size="medium"
          color={text("color", "#0abacd")}
        />
        <Chip
          content="VingleMoim Admin"
          style="round"
          size="medium"
          color={text("color", "#0abacd")}
        />
      </Wrapper>
      <Wrapper>
        <h1>Large</h1>
        <Chip
          content="VingleMoim Admin"
          style="square"
          size="small"
          color={text("color", "#0abacd")}
        />
        <Chip
          content="VingleMoim Admin"
          style="round"
          size="small"
          color={text("color", "#0abacd")}
        />
      </Wrapper>
    </div>
  );
});
