import * as React from "react";
const { storiesOf } = require("@storybook/react");
import { STORYBOOK_PREFIX } from "common/constants/storybook";

import EmptyThread from ".";

storiesOf(
  `${STORYBOOK_PREFIX.MODULE_COMPONENTS}/Forum/Components/EmptyThread`,
  module,
).add("Default", () => (
  <div style={{ width: "100%", height: "100%" }}>
    <EmptyThread />
  </div>
));
