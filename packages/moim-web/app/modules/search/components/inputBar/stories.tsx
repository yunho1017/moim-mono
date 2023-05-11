import * as React from "react";
import { STORYBOOK_PREFIX } from "common/constants/storybook";
const { storiesOf } = require("@storybook/react");

import DesktopSearchBar from "./desktop";

storiesOf(
  `${STORYBOOK_PREFIX.MODULE_COMPONENTS}/Search/components/inputBar`,
  module,
).add("Desktop", () => {
  const [value, setValue] = React.useState("");
  return <DesktopSearchBar value={value} onChange={setValue} />;
});
