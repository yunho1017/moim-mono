import * as React from "react";
import { STORYBOOK_PREFIX } from "common/constants/storybook";
import MenuLayer from "./";

const { storiesOf } = require("@storybook/react");
const { action } = require("@storybook/addon-actions");

const DATA_LIST = [
  {
    text: "react",
    value: "react",
  },

  {
    text: "vue",
    value: "vue",
  },

  {
    text: "angular",
    value: "angular",
  },

  {
    text: "backbone",
    value: "backbone",
  },
];

storiesOf(
  `${STORYBOOK_PREFIX.COMMON_COMPONENTS}/MenuLayer`,
  module,
).add("Default", () => (
  <MenuLayer
    dataList={DATA_LIST}
    onClickItem={action("onClickItem")}
    isOpen={true}
    close={action("close")}
  />
));
