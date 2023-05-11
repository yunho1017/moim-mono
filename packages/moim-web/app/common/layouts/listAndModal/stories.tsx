import * as React from "react";
const { storiesOf } = require("@storybook/react");
import { GhostButton } from "common/components/designSystem/buttons";
import { STORYBOOK_PREFIX } from "common/constants/storybook";
import useIsMobile from "common/hooks/useIsMobile";

import ListAndModalLayout from ".";

storiesOf(`${STORYBOOK_PREFIX.LAYOUT_COMPONENTS}/List & Modal`, module).add(
  "Default",
  () => {
    const isMobile = useIsMobile();

    return (
      <ListAndModalLayout
        mainPanelUrls={[]}
        listElement={
          <div
            style={{ width: "100%", height: "100%", backgroundColor: "red" }}
          >
            {isMobile && <GhostButton size="m">Open Detail</GhostButton>}
            <div>LIST</div>
          </div>
        }
        detailElement={
          <div
            style={{ width: "100%", height: "100%", backgroundColor: "green" }}
          >
            {isMobile && <GhostButton size="m">Close Detail</GhostButton>}
            <div>SHOW HERE</div>
          </div>
        }
      />
    );
  },
);
