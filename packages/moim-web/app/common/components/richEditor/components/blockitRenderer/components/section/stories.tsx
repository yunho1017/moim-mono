import * as React from "react";
import styled from "styled-components";
const { storiesOf } = require("@storybook/react");
const { number: numberKnob } = require("@storybook/addon-knobs");
import { STORY_BOOK_PATH } from "../..";

import SectionBlock from ".";
import { H1 } from "../texts";
import Buttons from "../buttons";

const Wrapper = styled.div`
  margin: 1rem;
`;

storiesOf(`${STORY_BOOK_PATH}/Components/Section`, module).add(
  "Default",
  () => {
    return (
      <div>
        <Wrapper>
          <SectionBlock
            columnCount={numberKnob("ColumnCount", 1)}
            blocks={[
              <H1>HELLO WORLD!</H1>,
              <Buttons
                actionId="form"
                element={{
                  content: "CLICK ME1",
                  type: "flat",
                  style: "primary",
                  size: "medium",
                }}
              />,
              <Buttons
                actionId="form"
                element={{
                  content: "CLICK ME2",
                  type: "ghost",
                  style: "primary",
                  size: "medium",
                }}
              />,
              <Buttons
                actionId="form"
                element={{
                  content: "CLICK ME3",
                  type: "flat",
                  style: "primary",
                  size: "medium",
                }}
              />,
              <Buttons
                actionId="form"
                element={{
                  content: "CLICK ME4",
                  type: "flat",
                  style: "primary",
                  size: "medium",
                }}
              />,
            ]}
          />
        </Wrapper>
      </div>
    );
  },
);
