import * as React from "react";
const { storiesOf } = require("@storybook/react");
const { select, boolean: booleanKnob } = require("@storybook/addon-knobs");
import { GhostButton } from "common/components/designSystem/buttons";
import { STORYBOOK_PREFIX } from "common/constants/storybook";
import useIsMobile from "common/hooks/useIsMobile";

import ListAndDetailLayout from ".";

storiesOf(`${STORYBOOK_PREFIX.LAYOUT_COMPONENTS}/List & Detail`, module).add(
  "Default",
  () => {
    const isMobile = useIsMobile();

    return (
      <ListAndDetailLayout
        mainPanelUrls={[]}
        listWrapperWidth={select(
          "List wrapper width",
          { "320px": 320, "230px": 230 },
          320,
        )}
        disableListWrapperRightBorder={booleanKnob(
          "Disable right border",
          false,
        )}
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
