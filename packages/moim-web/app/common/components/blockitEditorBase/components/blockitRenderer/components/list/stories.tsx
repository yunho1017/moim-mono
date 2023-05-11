import * as React from "react";
import styled from "styled-components";
const { storiesOf } = require("@storybook/react");
const {} = require("@storybook/addon-knobs");

import ListBlock from ".";
import { STORY_BOOK_PATH } from "../..";

const Wrapper = styled.div`
  width: 37.5rem;
  margin: 1rem;
`;

storiesOf(`${STORY_BOOK_PATH}/Components/List`, module).add("default", () => (
  <div>
    <Wrapper>
      <ListBlock
        actionId="loadMoreVotes"
        blockId="votes-T3B0aW9uOm0xZzBlYXlCZVpKYjEzVjk4TXUtcw=="
        botId="B8PBQSHWZ"
        paging={{
          after: "Vm90ZTpLNGI2cm90bDFuNERWLU1hajBrOHg",
        }}
        params={{
          optionId: "T3B0aW9uOm0xZzBlYXlCZVpKYjEzVjk4TXUtcw",
        }}
        blocks={[
          {
            type: "profile",
            userId: "f35d72e4-4220-4983-b815-4c6e06064e66",
            align: "left",
            avatarType: "round",
            size: "medium",
            bottomDescription: {
              content: "2 TOK",
              subType: "caption",
              color: "#aeb8bd",
            },
            botId: "B8PBQSHWZ",
          },
          {
            type: "shavedText",
            content: "투표합니다.\n투표해요.\n투표!",
            botId: "B8PBQSHWZ",
          },
          {
            type: "line",
            backgroundColor: "#e9edf0",
            fillColor: "#e9edf0",
            fillWidth: 100,
            height: 1,
            botId: "B8PBQSHWZ",
          },
          {
            type: "profile",
            userId: "8e0fff33-e66e-4672-bbb1-2a96190309bd",
            align: "left",
            avatarType: "round",
            size: "medium",
            bottomDescription: {
              content: "2 TOK",
              subType: "caption",
              color: "#aeb8bd",
            },
            botId: "B8PBQSHWZ",
          },
          {
            type: "shavedText",
            content: "test",
            botId: "B8PBQSHWZ",
          },
          {
            type: "line",
            backgroundColor: "#e9edf0",
            fillColor: "#e9edf0",
            fillWidth: 100,
            height: 1,
            botId: "B8PBQSHWZ",
          },
          {
            type: "profile",
            userId: "1f6bc1c6-754a-41c8-b9f1-8301064031b0",
            align: "left",
            avatarType: "round",
            size: "medium",
            bottomDescription: {
              content: "2 TOK",
              subType: "caption",
              color: "#aeb8bd",
            },
            botId: "B8PBQSHWZ",
          },
          {
            type: "shavedText",
            content: "ㅇ",
            botId: "B8PBQSHWZ",
          },
          {
            type: "line",
            backgroundColor: "#e9edf0",
            fillColor: "#e9edf0",
            fillWidth: 100,
            height: 1,
            botId: "B8PBQSHWZ",
          },
        ]}
      />
    </Wrapper>
  </div>
));
