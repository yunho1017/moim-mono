import * as React from "react";
import { STORYBOOK_PREFIX } from "common/constants/storybook";
const { storiesOf } = require("@storybook/react");

const {} = require("@storybook/addon-knobs");

import Component from ".";

storiesOf(`${STORYBOOK_PREFIX.COMMON_COMPONENTS}/Top Banners`, module).add(
  "Default",
  () => {
    return <Component />;
  },
);
