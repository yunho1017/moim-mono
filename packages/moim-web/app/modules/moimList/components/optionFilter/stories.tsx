import * as React from "react";
import { STORYBOOK_PREFIX } from "common/constants/storybook";
const { storiesOf } = require("@storybook/react");
const { action } = require("@storybook/addon-actions");

import Component from ".";

storiesOf(
  `${STORYBOOK_PREFIX.MODULE_COMPONENTS}/MoimList/Components/OptionFilter`,
  module,
).add("Default", () => {
  return (
    <Component
      options={[
        { sort: "sortKey", order: "desc" },
        { sort: "createdAt", order: "desc" },
        { sort: "createdAt", order: "asc" },
        { sort: "latestAt", order: "desc" },
      ]}
      onChangeOption={action("onChangeOption")}
    />
  );
});
