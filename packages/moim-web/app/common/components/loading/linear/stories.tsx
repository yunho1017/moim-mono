import * as React from "react";
const { number: numberKnob } = require("@storybook/addon-knobs");
const { storiesOf } = require("@storybook/react");
import { STORYBOOK_PREFIX } from "common/constants/storybook";
import LinearLoading from "./";

function Wrapper(props: React.PropsWithChildren<{}>) {
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate3d(-50%, -50%, 0)",
        width: "100%",
        maxWidth: 375,
      }}
    >
      {props.children}
    </div>
  );
}

storiesOf(`${STORYBOOK_PREFIX.COMMON_COMPONENTS}/Loading/LinearLoading`, module)
  .add("Animation", () => (
    <Wrapper>
      <LinearLoading />
    </Wrapper>
  ))
  .add("Value", () => {
    const percentage = numberKnob("Linear loading percentage", 0.5, {
      range: true,
      min: 0,
      max: 1,
      step: 0.01,
    });
    return (
      <Wrapper>
        <LinearLoading percentage={percentage} />
      </Wrapper>
    );
  });
