import * as React from "react";
import styled from "styled-components";
const { storiesOf } = require("@storybook/react");
const {
  select: selectKnob,
  date: dateKnob,
} = require("@storybook/addon-knobs");

import Timer from ".";
import { STORY_BOOK_PATH } from "../..";

const Wrapper = styled.div`
  width: 37.5rem;
  margin: 1rem;
`;
const StyleObject = {
  Default: "default",
  Brand: "brand-colored",
  Image: "image",
};

storiesOf(`${STORY_BOOK_PATH}/Components/Timer`, module).add("Default", () => {
  const styleType = selectKnob("Style", StyleObject, "default");
  return (
    <div>
      <Wrapper>
        <h1>Before</h1>
        <hr />
        <Timer
          styleType={styleType}
          beforeStart={{
            content: "Coming soon!",
          }}
          startDateTime={new Date(
            dateKnob("Start date", new Date(Date.now() + 86400000), "Before"),
          ).toISOString()}
          endDateTime={new Date(
            dateKnob("End date", new Date(Date.now() + 172800000), "Before"),
          ).toISOString()}
        />
      </Wrapper>

      <Wrapper>
        <h1>Running</h1>
        <hr />
        <Timer
          styleType={styleType}
          onGoing={{
            scope: "seconds",
          }}
          startDateTime={new Date(
            dateKnob("Start date", new Date(Date.now()), "Running"),
          ).toISOString()}
          endDateTime={new Date(
            dateKnob("End date", new Date(Date.now() + 172800000), "Running"),
          ).toISOString()}
        />
      </Wrapper>

      <Wrapper>
        <h1>After</h1>
        <hr />
        <Timer
          styleType={styleType}
          afterEnd={{
            content: "It's Over!",
          }}
          startDateTime={new Date(
            dateKnob("Start date", new Date("2020-08-01 01:00:00"), "After"),
          ).toISOString()}
          endDateTime={new Date(
            dateKnob("End date", new Date(), "After"),
          ).toISOString()}
        />
      </Wrapper>
    </div>
  );
});
