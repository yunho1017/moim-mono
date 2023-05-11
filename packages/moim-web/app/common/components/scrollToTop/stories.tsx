import * as React from "react";
import { STORYBOOK_PREFIX } from "common/constants/storybook";
const { storiesOf } = require("@storybook/react");
const {} = require("@storybook/addon-knobs");

import ScrollToTop from ".";

storiesOf(`${STORYBOOK_PREFIX.COMMON_COMPONENTS}/ScrollToTop`, module).add(
  "Default",
  () => {
    return (
      <>
        <div
          style={{ width: "100%", height: "2700px", backgroundColor: "cyan" }}
        >
          - MOCK DATA -
        </div>
        <ScrollToTop useWindowScroll={true} />
      </>
    );
  },
);
