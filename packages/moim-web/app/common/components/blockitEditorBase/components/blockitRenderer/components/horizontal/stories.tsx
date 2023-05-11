import * as React from "react";
import styled from "styled-components";
const { storiesOf } = require("@storybook/react");
const { select: selectKnob } = require("@storybook/addon-knobs");

import MultiLine from "./multiLine";
import SingleLine from "./singleLine";
import { STORY_BOOK_PATH } from "../..";

const chips = [
  {
    type: "chip",
    content: "Chip One",
    style: "square",
    size: "small",
    color: "#aa9bfe",
  },
  {
    type: "chip",
    content: "Chip two",
    style: "square",
    size: "small",
    color: "#aa9bfe",
  },
  {
    type: "chip",
    content: "Chip three",
    style: "square",
    size: "small",
    color: "#efadce",
  },
  {
    type: "chip",
    content: "Chip four",
    style: "square",
    size: "small",
    color: "#0f0fac",
  },
  {
    type: "chip",
    content: "Chip five",
    style: "square",
    size: "small",
    color: "#cca",
  },
  {
    type: "chip",
    content: "Chip six",
    style: "square",
    size: "small",
    color: "#aca",
  },
  {
    type: "chip",
    content: "Chip seven",
    style: "square",
    size: "small",
    color: "#bdc",
  },
];

const Wrapper = styled.div`
  width: 20rem;
  margin: 1rem;
`;
const WideWrapper = styled.div`
  width: 100rem;
  margin: 1rem;
`;

storiesOf(`${STORY_BOOK_PATH}/Components/Horizontal`, module)
  .add("SingleLine", () => {
    const alignment = selectKnob("Alignment", {
      Left: "left",
      Center: "center",
      Right: "right",
    });
    return (
      <div>
        <Wrapper>
          <SingleLine align={alignment} blocks={chips} />
        </Wrapper>
        <br />
        <WideWrapper>
          <SingleLine align={alignment} blocks={chips} />
        </WideWrapper>
      </div>
    );
  })
  .add("MultiLine", () => {
    const alignment = selectKnob("Alignment", {
      Left: "left",
      Center: "center",
      Right: "right",
    });
    return (
      <div>
        <Wrapper>
          <MultiLine align={alignment} blocks={chips} />
        </Wrapper>
        <WideWrapper>
          <MultiLine align={alignment} blocks={chips} />
        </WideWrapper>
      </div>
    );
  });
