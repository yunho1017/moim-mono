import * as React from "react";
import { STORYBOOK_PREFIX } from "common/constants/storybook";
const { storiesOf } = require("@storybook/react");

import Component from ".";

storiesOf(`${STORYBOOK_PREFIX.DESIGN_SYSTEM}/TTTTT`, module).add(
  "Default",
  () => {
    return <Component channelId="C1234" channelType="forum" />;
  },
);
