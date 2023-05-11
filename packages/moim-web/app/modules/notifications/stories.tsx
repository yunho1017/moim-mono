import * as React from "react";
import styled from "styled-components";
const { storiesOf } = require("@storybook/react");

import { STORYBOOK_PREFIX } from "common/constants/storybook";

import Notifications from "./";

export const Wrapper = styled.div`
  width: 600px;
  height: 500px;
`;

storiesOf(`${STORYBOOK_PREFIX.MODULE_COMPONENTS}/Notifications`, module).add(
  "default",
  () => (
    <Wrapper>
      <Notifications />
    </Wrapper>
  ),
);
