import * as React from "react";
import styled from "styled-components";
const { storiesOf } = require("@storybook/react");
const { number: numberKnob } = require("@storybook/addon-knobs");

import Grid from ".";
import { STORY_BOOK_PATH } from "../..";

const Wrapper = styled.div``;

storiesOf(`${STORY_BOOK_PATH}/Components/Grid`, module).add("Default", () => {
  return (
    <div>
      <Wrapper>
        <Grid
          blocks={[
            {
              type: "image",
              src:
                "https://files.moim.co/files/G0QQ9R57QL/F38XHX03J/top_banner_shine.jpg",
              botId: "B8PBQSHAA",
            },
            {
              botId: "B8PBQSHAA",
              type: "grid",
              maxColumn: 1,
              backgroundColor: "#aacc9f",
              blocks: [
                {
                  subType: "h3",
                  botId: "B8PBQSHAA",
                  type: "text",
                  content: "별빛방 청년 보증금 후원",
                },
                {
                  subType: "body3",
                  botId: "B8PBQSHAA",
                  type: "text",
                  color: "#010505A8",
                  content: "청년들의 빛이 되어줄 거주지 보증금을 지원합니다.",
                },
                {
                  subType: "h2",
                  botId: "B8PBQSHAA",
                  type: "text",
                  content: "50,000 원",
                },
                {
                  type: "single-line-horizontal-block",
                  blocks: [
                    {
                      size: "small",
                      color: "#1469bf",
                      subType: "h5",
                      style: "round",
                      botId: "B8PBQSHAA",
                      type: "chip",
                      content: "on_sale",
                    },
                  ],
                  botId: "B8PBQSHAA",
                },
              ],
              minColumn: 1,
            },
            {
              botId: "B8PBQSHAA",
              type: "grid",
              maxColumn: 1,
              backgroundColor: "#FF00FF",
              blocks: [
                {
                  subType: "h3",
                  botId: "B8PBQSHAA",
                  type: "text",
                  content: "별빛방 청년 보증금 후원",
                },
                {
                  subType: "body3",
                  botId: "B8PBQSHAA",
                  type: "text",
                  color: "#010505A8",
                  content: "청년들의 빛이 되어줄 거주지 보증금을 지원합니다.",
                },
                {
                  subType: "h2",
                  botId: "B8PBQSHAA",
                  type: "text",
                  content: "50,000 원",
                },
                {
                  type: "single-line-horizontal-block",
                  blocks: [
                    {
                      size: "small",
                      color: "#1469bf",
                      subType: "h5",
                      style: "round",
                      botId: "B8PBQSHAA",
                      type: "chip",
                      content: "on_sale",
                    },
                  ],
                  botId: "B8PBQSHAA",
                },
              ],
              minColumn: 1,
            },
          ]}
          minColumn={numberKnob("minColumn", 2)}
          maxColumn={numberKnob("maxColumn", 2)}
        />
      </Wrapper>
    </div>
  );
});
