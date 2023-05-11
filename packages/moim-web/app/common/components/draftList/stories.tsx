import * as React from "react";
import styled from "styled-components";
import { STORYBOOK_PREFIX } from "common/constants/storybook";
const { storiesOf } = require("@storybook/react");
const {} = require("@storybook/addon-knobs");

import Component from "./component";

const Wrapper = styled.div`
  width: 32rem;
  height: 60rem;
`;

storiesOf(`${STORYBOOK_PREFIX.COMMON_COMPONENTS}/DraftList`, module).add(
  "Inner component",
  () => {
    return (
      <Wrapper>
        <Component enableDeleteMode={false} />
      </Wrapper>
    );
  },
);
