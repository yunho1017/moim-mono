import * as React from "react";
import styled from "styled-components";
const { storiesOf } = require("@storybook/react");
const {
  number: numberKnob,
  boolean: booleanKnob,
} = require("@storybook/addon-knobs");

import Carousel from ".";
import { STORY_BOOK_PATH } from "../..";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

storiesOf(`${STORY_BOOK_PATH}/Components/Carousel`, module).add(
  "Default",
  () => {
    return (
      <Wrapper>
        <Carousel
          images={[
            {
              src:
                "https://files.vingle.network/files/G0033S6TH/FIY0NAXT4/500x500.jpg",
              width: 500,
              height: 500,
            },
            {
              src:
                "https://files.vingle.network/files/G0033S6TH/FIY0NAXT4/500x500.jpg",
              width: 500,
              height: 500,
            },
            {
              src:
                "https://files.vingle.network/files/G0033S6TH/FJ8NRW7XA/800x300.jpg",
              width: 800,
              height: 300,
            },
            {
              src:
                "https://files.vingle.network/files/G0033S6TH/FRKD3BTLP/800x600.jpg",
              width: 800,
              height: 600,
            },
          ]}
          images_web={[
            {
              src:
                "https://files.vingle.network/files/G0033S6TH/FRKD3BTLP/800x600.jpg",
              width: 800,
              height: 600,
            },
            {
              src:
                "https://files.vingle.network/files/G0033S6TH/FRKD3BTLP/800x600.jpg",
              width: 800,
              height: 600,
            },
            {
              src:
                "https://files.vingle.network/files/G0033S6TH/FJ8NRW7XA/800x300.jpg",
              width: 800,
              height: 300,
            },
            {
              src:
                "https://files.vingle.network/files/G0033S6TH/FIY0NAXT4/500x500.jpg",
              width: 500,
              height: 500,
            },
            {
              src:
                "https://files.vingle.network/files/G0033S6TH/FJ8NRW7XA/800x300.jpg",
              width: 800,
              height: 300,
            },
            {
              src:
                "https://files.vingle.network/files/G0033S6TH/FIY0NAXT4/500x500.jpg",
              width: 500,
              height: 500,
            },
          ]}
          style_web={{
            width: numberKnob("Width", 800, {}, "Desktop Config"),
            height: numberKnob("Height", 600, {}, "Desktop Config"),
            showBottomIndicate: booleanKnob(
              "Show bottom indicator",
              true,
              "Desktop Config",
            ),
            showSideArrowButton: booleanKnob(
              "Show side arrow button",
              true,
              "Desktop Config",
            ),
          }}
          interval_web={5000}
          style={{
            width: numberKnob("Width", 500, {}, "MobilWeb Config"),
            height: numberKnob("Height", 500, {}, "MobilWeb Config"),
            showBottomIndicate: booleanKnob(
              "Show bottom indicator",
              true,
              "MobilWeb Config",
            ),
            showSideArrowButton: booleanKnob(
              "Show side arrow button",
              true,
              "MobilWeb Config",
            ),
          }}
          interval={5000}
        />
      </Wrapper>
    );
  },
);
