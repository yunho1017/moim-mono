import * as React from "react";
import styled from "styled-components";
const { storiesOf } = require("@storybook/react");
const { text, select } = require("@storybook/addon-knobs");
import BinaryTextBlock from ".";
import { STORY_BOOK_PATH } from "../..";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const SubTypeList = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  h7: "h7",
  body1: "body1",
  body2: "body2",
  body3: "body3",
  caption: "caption",
};

storiesOf(`${STORY_BOOK_PATH}/Components/BinaryTextItemCell`, module).add(
  "Default",
  () => {
    const ratio = select("Ratio", { "1:1": "1:1", "1:2": "1:2" }, "1:1");
    const leftText = text("left Text", "1111");
    const leftAlign = select(
      "left align",
      { left: "left", right: "right" },
      "left",
    );
    const leftType = select("left type", SubTypeList, "h3");

    const rightText = text("right Text", "2222");
    const rightAlign = select(
      "right align",
      { left: "left", right: "right" },
      "right",
    );
    const rightType = select("right type", SubTypeList, "h3");

    return (
      <Wrapper>
        <BinaryTextBlock
          ratio={ratio}
          left={{ content: leftText, align: leftAlign, subType: leftType }}
          right={{ content: rightText, align: rightAlign, subType: rightType }}
        />
      </Wrapper>
    );
  },
);
