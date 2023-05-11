import * as React from "react";
const { storiesOf } = require("@storybook/react");

import { STORYBOOK_PREFIX } from "common/constants/storybook";

import { Wrapper, MainTitle, Contents } from "./components/styled";
import MyGroup from "./components/myGroup";
import CreateGroup from "./components/createGroup";
import JoinGroup from "./components/joinGroup";
import { RAW } from "app/__mocks__";

storiesOf(`${STORYBOOK_PREFIX.MODULE_COMPONENTS}/JoinGroup`, module).add(
  "default",
  () => (
    <Wrapper>
      <MainTitle>Start</MainTitle>
      <Contents>
        <MyGroup myGroups={{ data: [RAW.GROUP_WITH_USER], paging: {} }} />
        <JoinGroup />
        <CreateGroup />
      </Contents>
    </Wrapper>
  ),
);
