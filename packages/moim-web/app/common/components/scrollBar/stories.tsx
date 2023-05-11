import * as React from "react";
import { STORYBOOK_PREFIX } from "common/constants/storybook";
const { storiesOf } = require("@storybook/react");
import ScrollBar from ".";

storiesOf(`${STORYBOOK_PREFIX.COMMON_COMPONENTS}/Custom ScrollBar`, module).add(
  "Default",
  () => (
    <div
      style={{
        width: "300px",
        height: "500px",
        backgroundColor: "blue",
        padding: "10px",
      }}
    >
      <ScrollBar>
        <div
          style={{ width: "100%", height: "3000px", backgroundColor: "green" }}
        ></div>
      </ScrollBar>
    </div>
  ),
);
