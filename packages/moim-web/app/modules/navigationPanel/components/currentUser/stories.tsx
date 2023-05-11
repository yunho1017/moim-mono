// vendor
import * as React from "react";

const { storiesOf } = require("@storybook/react");

import { STORYBOOK_PREFIX } from "common/constants/storybook";
import CurrentUser from "./index";
import { RAW } from "app/__mocks__";

const USER = (RAW.GROUP_WITH_USER.user as unknown) as Moim.User.INormalizedUser;

storiesOf(`${STORYBOOK_PREFIX.COMMON_COMPONENTS}/CurrentUser`, module)
  .add("Default", () => <CurrentUser currentUser={USER} isOnline={false} />)
  .add("Online", () => <CurrentUser currentUser={USER} isOnline={true} />);
