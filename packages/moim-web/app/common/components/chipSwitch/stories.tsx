import * as React from "react";
import { STORYBOOK_PREFIX } from "common/constants/storybook";
const { storiesOf } = require("@storybook/react");
const { action } = require("@storybook/addon-actions");

import ChipSwitch from ".";

storiesOf(`${STORYBOOK_PREFIX.COMMON_COMPONENTS}/chipSwitch`, module).add(
  "Default",
  () => {
    return (
      <div style={{ width: "300px", height: "100%", backgroundColor: "white" }}>
        <ChipSwitch
          menus={[
            { key: "1", text: "사용가능" },
            { key: "2", text: "사용완료/만료" },
            { key: "3", text: "발급취소" },
          ]}
          onClickChip={action("onClickChip")}
        />
      </div>
    );
  },
);
