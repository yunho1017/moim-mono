import * as React from "react";
const { storiesOf } = require("@storybook/react");

import { STORYBOOK_PREFIX } from "common/constants/storybook";
import Modal from ".";

storiesOf(
  `${STORYBOOK_PREFIX.LAYOUT_COMPONENTS}/List & Modal/modal`,
  module,
).add("Default", () => {
  return <Modal open={true} appBar={null} />;
});
