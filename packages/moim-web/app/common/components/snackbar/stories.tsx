import * as React from "react";
import styled from "styled-components";
import { STORYBOOK_PREFIX } from "common/constants/storybook";
import Snackbar from "common/components/snackbar";

const { storiesOf } = require("@storybook/react");
const { text: textKnob, boolean: boolKnob } = require("@storybook/addon-knobs");
const { action } = require("@storybook/addon-actions");

const Wrapper = styled.div`
  position: relative;
  overflow: hidden;
  height: 300px;
`;

storiesOf(`${STORYBOOK_PREFIX.COMMON_COMPONENTS}/Snackbar`).add(
  "Default",
  () => (
    <Wrapper>
      <Snackbar
        isOpen={boolKnob("isOpen", true)}
        transitionDirection="bottom"
        content={textKnob("content", "Hello")}
        rightAction={<button>Action</button>}
        onClickSnackbar={action("onClickSnackbar")}
        onClickRightAction={action("onClickRightAction")}
      />
    </Wrapper>
  ),
);
