import * as React from "react";
import styled from "styled-components";
import { STORYBOOK_PREFIX } from "common/constants/storybook";
import { Alert, Error, Normal, Success } from "./";
import { TextGeneralButton } from "../designSystem/buttons";
const { storiesOf } = require("@storybook/react");

const Wrapper = styled.div`
  position: relative;
  overflow: hidden;
  height: 300px;
`;

const Button = styled(TextGeneralButton)`
  color: ${props => props.theme.colorV2.colorSet.fog800};
  background-color: transparent;
`;

storiesOf(`${STORYBOOK_PREFIX.COMMON_COMPONENTS}/Snackbar_new`)
  .add("Alert", () => (
    <Wrapper>
      <Alert.Snackbar
        text="Snackbar message !"
        rightIcon={{
          component: <Button size="s">Button</Button>,
        }}
      />
    </Wrapper>
  ))
  .add("Error", () => (
    <Wrapper>
      <Error.Snackbar
        text="Snackbar message !"
        rightIcon={{
          component: <Button size="s">Button</Button>,
        }}
      />
    </Wrapper>
  ))
  .add("Normal", () => (
    <Wrapper>
      <Normal.Snackbar
        text="Snackbar message !"
        rightIcon={{
          component: <Button size="s">Button</Button>,
        }}
      />
    </Wrapper>
  ))
  .add("Success", () => (
    <Wrapper>
      <Success.Snackbar
        text="Snackbar message !"
        rightIcon={{
          component: <Button size="s">Button</Button>,
        }}
      />
    </Wrapper>
  ));
