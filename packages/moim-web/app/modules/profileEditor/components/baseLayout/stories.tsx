import * as React from "react";
const { storiesOf } = require("@storybook/react");
const { action } = require("@storybook/addon-actions");

import { STORYBOOK_PREFIX } from "common/constants/storybook";
import ProfileEditorComponent from ".";
import { RAW } from "app/__mocks__";

storiesOf(
  `${STORYBOOK_PREFIX.MODULE_COMPONENTS}/Profile Editor/components`,
  module,
).add("Default", () => (
  <ProfileEditorComponent
    userData={RAW.MEMBER}
    isAvatarUpdating={false}
    onChange={action("> onChange")}
  />
));
