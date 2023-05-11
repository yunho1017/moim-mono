import * as React from "react";
import styled from "styled-components";
const { storiesOf } = require("@storybook/react");
const {} = require("@storybook/addon-knobs");

import ItemCell from ".";
import { STORY_BOOK_PATH } from "../../../..";

const Wrapper = styled.div`
  width: 37.5rem;
  margin: 1rem;
`;

storiesOf(`${STORY_BOOK_PATH}/Components/List/ItemCell`, module).add(
  "default",
  () => (
    <Wrapper>
      <ItemCell
        size="large"
        align="left"
        avatarType="round"
        title={{
          content: "TOK",
          subType: "body2",
          color: "#010505",
        }}
        rightDescription={{
          content: "20",
          subType: "h7",
          color: "#010505",
        }}
        bottomDescription={{
          content: "TOK",
          subType: "caption",
          color: "#010505",
        }}
        params={{
          contractAccount: "issuertest11",
          symbol: "TOK",
        }}
        botId="B8PBQSHWA"
      />
    </Wrapper>
  ),
);
