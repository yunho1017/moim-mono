import * as React from "react";
import { STORYBOOK_PREFIX } from "common/constants/storybook";
import MessageLabel from "./index";

const { storiesOf } = require("@storybook/react");

storiesOf(`${STORYBOOK_PREFIX.COMMON_COMPONENTS}/Talk/Label`)
  .add("Normal", () => <MessageLabel title="October 30, 2019" />)
  .add("Only Status", () => <MessageLabel hasNew={true} />)
  .add("Title & Status", () => (
    <MessageLabel title="October 30, 2019" hasNew={true} />
  ));
