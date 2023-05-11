import * as React from "react";
import styled from "styled-components";
const { storiesOf } = require("@storybook/react");
const {
  number: numberKnob,
  // select,
  // boolean: booleanKnob,
} = require("@storybook/addon-knobs");

import Category from ".";
import { STORY_BOOK_PATH } from "../../..";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

storiesOf(`${STORY_BOOK_PATH}/Components/Commerce/Category`, module).add(
  "Default",
  () => {
    return (
      <Wrapper>
        <Category
          categoryId="X1234"
          itemContainerWidth={100}
          itemContainerWidth_web={100}
          columnCount={4}
          columnCount_web={numberKnob("Column count", 8)}
          // itemStyle
          // itemStyle_web
        />
      </Wrapper>
    );
  },
);
