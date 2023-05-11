// vendor
import * as React from "react";

const { storiesOf } = require("@storybook/react");
import { STORYBOOK_PREFIX } from "common/constants/storybook";
import SideBar from "./";
import { Wrapper } from "../styled";
import useMedia from "common/hooks/useMedia";
import { MEDIA_QUERY } from "common/constants/responsive";

function SideBarWrapper() {
  const [isExpanded, setExpanded] = React.useState(false);
  const isMobile = useMedia([MEDIA_QUERY.ONLY_MOBILE], [true], false);
  const handleExpand = React.useCallback(() => {
    setExpanded(true);
  }, [setExpanded]);
  const handleCollapse = React.useCallback(() => {
    setExpanded(false);
  }, [setExpanded]);

  return (
    <Wrapper style={{ backgroundColor: "gray" }}>
      <SideBar
        isExpanded={isExpanded}
        showCollapseButton={true}
        onClickDim={handleCollapse}
        onClickCollapseButton={handleCollapse}
        onClickExpandedDim={handleExpand}
      >
        it's sidebar
      </SideBar>
      {isMobile && <button onClick={handleExpand}>SideBar Open</button>}
    </Wrapper>
  );
}

storiesOf(
  `${STORYBOOK_PREFIX.COMMON_COMPONENTS}/SideBar`,
  module,
).add("Default", () => <SideBarWrapper />);
