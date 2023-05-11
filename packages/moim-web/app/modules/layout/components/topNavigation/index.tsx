import * as React from "react";

import MobileTopNavigation from "./mobile";
import DesktopTopNavigation from "./desktop";

import useIsMobile from "common/hooks/useIsMobile";
import { useActions, useStoreState } from "app/store";
import useCurrentHubGroup from "common/hooks/useCurrentHubGroup";

import { currentGroupSelector } from "app/selectors/app";
import TopNavigationContextProvider from "./context";
import { getParentGroup } from "app/actions/group";

const TopNavigation: React.FC = () => {
  const isMobile = useIsMobile();
  const parentGroup = useCurrentHubGroup();
  const { currentGroup } = useStoreState(storeState => ({
    currentGroup: currentGroupSelector(storeState),
  }));

  const { dispatchParentGroupChanged } = useActions({
    dispatchParentGroupChanged: getParentGroup,
  });

  const handleGetParentMoim = React.useCallback(async () => {
    if (currentGroup?.parent) {
      dispatchParentGroupChanged(currentGroup.parent);
    }
  }, [currentGroup, dispatchParentGroupChanged]);

  React.useEffect(() => {
    if (!parentGroup && currentGroup) {
      handleGetParentMoim();
    }
  }, [parentGroup, currentGroup]);

  const inner = React.useMemo(() => {
    if (isMobile) {
      return <MobileTopNavigation />;
    }

    return <DesktopTopNavigation />;
  }, [isMobile]);

  return <TopNavigationContextProvider>{inner}</TopNavigationContextProvider>;
};

export default TopNavigation;
