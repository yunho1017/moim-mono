import * as React from "react";
const { number: numberKnob } = require("@storybook/addon-knobs");
const { storiesOf } = require("@storybook/react");
import { STORYBOOK_PREFIX } from "common/constants/storybook";
import CircularLoading from "./";

function Wrapper(props: React.PropsWithChildren<{}>) {
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate3d(-50%, -50%, 0)",
      }}
    >
      {props.children}
    </div>
  );
}

storiesOf(
  `${STORYBOOK_PREFIX.COMMON_COMPONENTS}/Loading/CircularLoading`,
  module,
)
  .add("Animation (L)", () => (
    <Wrapper>
      <CircularLoading size="l" grayscale={true} />
      <CircularLoading size="l" />
    </Wrapper>
  ))
  .add("Animation (S)", () => (
    <Wrapper>
      <CircularLoading size="s" grayscale={true} />
      <CircularLoading size="s" />
    </Wrapper>
  ))
  .add("Value (L)", () => {
    const percentage = numberKnob("Linear loading percentage", 0.5, {
      range: true,
      min: 0,
      max: 1,
      step: 0.01,
    });
    return (
      <Wrapper>
        <CircularLoading size="l" percentage={percentage} grayscale={true} />
        <CircularLoading size="l" percentage={percentage} />
      </Wrapper>
    );
  })

  .add("Value (S)", () => {
    const percentage = numberKnob("Linear loading percentage", 0.5, {
      range: true,
      min: 0,
      max: 1,
      step: 0.01,
    });
    return (
      <Wrapper>
        <CircularLoading size="s" percentage={percentage} grayscale={true} />
        <CircularLoading size="s" percentage={percentage} />
      </Wrapper>
    );
  });
