import * as React from "react";
import styled from "styled-components";
const { storiesOf } = require("@storybook/react");
import { STORYBOOK_PREFIX } from "common/constants/storybook";
import { RAW } from "app/__mocks__";

import CreditHistory from ".";

const Wrapper = styled.div`
  width: 375px;
  height: 64px;
  background-color: white;
`;

storiesOf(
  `${STORYBOOK_PREFIX.MODULE_COMPONENTS}/Commerce/Components/BenefitsComponent/Components/CreditHistoryItem`,
  module,
).add("Default", () => (
  <Wrapper>
    <CreditHistory {...RAW.COMMERCE.myCreditHistories.data[0]} />
  </Wrapper>
));
