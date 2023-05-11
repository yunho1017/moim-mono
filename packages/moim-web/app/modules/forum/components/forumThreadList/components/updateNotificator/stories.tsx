import * as React from "react";
import { STORYBOOK_PREFIX } from "common/constants/storybook";
import UpdateNotificator from "./index";

const { storiesOf } = require("@storybook/react");
const { actions } = require("@storybook/addon-actions");

storiesOf(
  `${STORYBOOK_PREFIX.MODULE_COMPONENTS}/Forum/UpdateNotificator`,
  module,
).add("Default", () => (
  <div>
    <UpdateNotificator onClick={actions("onClick")} />
  </div>
));
