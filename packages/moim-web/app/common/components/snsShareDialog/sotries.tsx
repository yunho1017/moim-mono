import * as React from "react";
import styled from "styled-components";

const { storiesOf } = require("@storybook/react");

import { STORYBOOK_PREFIX } from "common/constants/storybook";
import SNSShare from "./index";

const Wrapper = styled.div`
  width: 400px;
`;

storiesOf(`${STORYBOOK_PREFIX.COMMON_COMPONENTS}/SNSShareDialog`, module).add(
  "default",
  () => (
    <Wrapper>
      <SNSShare />
    </Wrapper>
  ),
);
