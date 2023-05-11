import * as React from "react";
const { storiesOf } = require("@storybook/react");
import { STORYBOOK_PREFIX } from "common/constants/storybook";

import { SmallModalLayout, FixedHeightSmallModalLayout } from ".";

storiesOf(`${STORYBOOK_PREFIX.COMMON_COMPONENTS}/ModalLayout/Small`, module)
  .add("Fixed Height", () => (
    <FixedHeightSmallModalLayout></FixedHeightSmallModalLayout>
  ))
  .add("Default", () => <SmallModalLayout></SmallModalLayout>)
  .add("long", () => (
    <SmallModalLayout>
      <div style={{ width: "100%", height: "1000px" }}></div>
    </SmallModalLayout>
  ));
