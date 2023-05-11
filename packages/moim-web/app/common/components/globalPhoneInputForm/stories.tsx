import * as React from "react";
import { STORYBOOK_PREFIX } from "common/constants/storybook";
const { storiesOf } = require("@storybook/react");
const { action } = require("@storybook/addon-actions");

import GlobalPhoneInputForm from ".";

storiesOf(
  `${STORYBOOK_PREFIX.COMMON_COMPONENTS}/Global PhoneInput`,
  module,
).add("Default", () => {
  return <GlobalPhoneInputForm onChange={action("onChange")} />;
});
