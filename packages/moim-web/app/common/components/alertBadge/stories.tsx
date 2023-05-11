import * as React from "react";
import { STORYBOOK_PREFIX } from "common/constants/storybook";
import { AlertBadge, CommonBadge } from "common/components/alertBadge/index";

const { storiesOf } = require("@storybook/react");

storiesOf(`${STORYBOOK_PREFIX.COMMON_COMPONENTS}/AlertBadge`)
  .add("CommonBadge", () => (
    <div>
      <CommonBadge>1</CommonBadge>
      <CommonBadge>30</CommonBadge>
      <CommonBadge>13개의 새로운 메시지</CommonBadge>
    </div>
  ))
  .add("Default", () => (
    <div>
      <AlertBadge>3</AlertBadge>
      <AlertBadge>79</AlertBadge>
    </div>
  ));
