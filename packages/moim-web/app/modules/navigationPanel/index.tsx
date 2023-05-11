// vendor
import * as React from "react";

// component
import NavigationContainer from "./container/navigation";
import JoinedSubMoims from "./container/joinedSubMoims";
import { Wrapper } from "./styled";
import useHover from "common/hooks/useHover";
import { useVisibleSideNavigation } from "../layout/components/controller/hooks";

function NavigationPanel() {
  const [hoverRef, hover] = useHover<HTMLDivElement>();
  const visibleSideNavigation = useVisibleSideNavigation();

  const navigationElement = React.useMemo(() => {
    if (visibleSideNavigation) {
      return <NavigationContainer />;
    }

    return null;
  }, [visibleSideNavigation]);

  return (
    <Wrapper ref={hoverRef}>
      <JoinedSubMoims hover={hover} />
      {navigationElement}
    </Wrapper>
  );
}

export default NavigationPanel;
