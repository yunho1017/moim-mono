import * as React from "react";
import styled from "styled-components";
const { storiesOf } = require("@storybook/react");
const { text } = require("@storybook/addon-knobs");

import Image from ".";
import { STORY_BOOK_PATH } from "../..";

const Wrapper = styled.div`
  width: 36rem;
  height: 12rem;
  margin: 1rem;
`;

storiesOf(`${STORY_BOOK_PATH}/Components/Image`, module)
  .add("Default", () => {
    return (
      <div>
        <Wrapper>
          <Image
            src={text(
              "SRC",
              "https://images.pexels.com/photos/884788/pexels-photo-884788.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
            )}
            width={1260}
            height={720}
          />
        </Wrapper>
      </div>
    );
  })
  .add("with Ratio", () => {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <Wrapper>
          <Image
            src={text(
              "SRC",
              "https://images.pexels.com/photos/884788/pexels-photo-884788.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
            )}
            width={1260}
            height={720}
            ratio={text("Ratio", "1:1")}
          />
        </Wrapper>
      </div>
    );
  });
