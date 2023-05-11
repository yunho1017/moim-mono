import * as React from "react";
import styled from "styled-components";
const { storiesOf } = require("@storybook/react");
const { number: numberKnob } = require("@storybook/addon-knobs");
import { STORYBOOK_PREFIX } from "common/constants/storybook";
import AutoHeightInput from ".";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: grey;
`;

const Target = styled(AutoHeightInput)`
  width: 400px;
  height: 18px;
  font-size: 18px;
`;

storiesOf(`${STORYBOOK_PREFIX.COMMON_COMPONENTS}/AutoHeightInput`, module)
  .add("Default", () => (
    <Wrapper>
      <div>
        <Target placeholder="여기에 글을 입력하세요" />
      </div>
    </Wrapper>
  ))
  .add("AutoFocus on", () => (
    <Wrapper>
      <div>
        <Target autoFocus={true} placeholder="여기에 글을 입력하세요" />
      </div>
    </Wrapper>
  ))
  .add("MaxLength on", () => {
    const [value, setValue] = React.useState("");
    const handleAlert = React.useCallback(() => {
      alert("MaxLength!!");
    }, []);

    return (
      <Wrapper>
        <div>
          <Target
            autoFocus={true}
            placeholder="여기에 글을 입력하세요"
            value={value}
            onChange={setValue}
            maxLength={numberKnob("Max length", 10)}
            onMaxLength={handleAlert}
          />
        </div>
      </Wrapper>
    );
  });
