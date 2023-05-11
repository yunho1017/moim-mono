import * as React from "react";
import { STORYBOOK_PREFIX } from "common/constants/storybook";
const { storiesOf } = require("@storybook/react");
const { action } = require("@storybook/addon-actions");
const { number: numberKnob } = require("@storybook/addon-knobs");

import PageIndex from ".";

storiesOf(`${STORYBOOK_PREFIX.COMMON_COMPONENTS}/PageIndex`, module).add(
  "Default",
  () => {
    return (
      <PageIndex
        pageSize={numberKnob("Page Size", 5)}
        totalItemSize={numberKnob("totalItemSize", 100)}
        onChangeIndex={action("onChangeIndex")}
      />
    );
  },
);
