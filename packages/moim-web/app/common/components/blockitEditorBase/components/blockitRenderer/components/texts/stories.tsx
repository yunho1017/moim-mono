import * as React from "react";
import styled from "styled-components";
const { storiesOf } = require("@storybook/react");
const { select: selectKnob } = require("@storybook/addon-knobs");

import { H1, H2, H3, H4, H5, H6, Body1, Body2, Body3, Caption } from ".";
import { STORY_BOOK_PATH } from "../..";

const Wrapper = styled.div`
  margin: 1rem;
`;

storiesOf(`${STORY_BOOK_PATH}/Components/Texts`, module).add("Default", () => {
  const align = selectKnob("align", {
    Left: "left",
    Center: "center",
    Right: "right",
  });
  return (
    <div>
      <Wrapper>
        <H1 align={align}>H1</H1>
      </Wrapper>
      <Wrapper>
        <H2 align={align}>H2</H2>
      </Wrapper>
      <Wrapper>
        <H3 align={align}>H3</H3>
      </Wrapper>
      <Wrapper>
        <H4 align={align}>H4</H4>
      </Wrapper>
      <Wrapper>
        <H5 align={align}>H5</H5>
      </Wrapper>
      <Wrapper>
        <H6 align={align}>H6</H6>
      </Wrapper>
      <Wrapper>
        <Body1 align={align}>Body1</Body1>
      </Wrapper>
      <Wrapper>
        <Body2 align={align}>Body2</Body2>
      </Wrapper>
      <Wrapper>
        <Body3 align={align}>Body3</Body3>
      </Wrapper>
      <Wrapper>
        <Caption align={align}>Caption</Caption>
      </Wrapper>
    </div>
  );
});
