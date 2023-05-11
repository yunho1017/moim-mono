import * as React from "react";

import { useActions, useStoreState } from "app/store";
import useIsMobile from "common/hooks/useIsMobile";

import { ActionCreators as SideNavigationActionCreators } from "app/actions/sideNavigation";

export default function useSideNavigationPanel() {
  const { isExpanded } = useStoreState(state => ({
    isExpanded: state.sideNavigation.isExpand,
  }));
  const {
    dispatchCollapseSideNavigation,
    dispatchExpandSideNavigation,
  } = useActions({
    dispatchCollapseSideNavigation:
      SideNavigationActionCreators.collapseSideNavigation,
    dispatchExpandSideNavigation:
      SideNavigationActionCreators.expandSideNavigation,
  });
  const isMobile = useIsMobile();

  const collapseSideNavigation = React.useCallback(() => {
    if (isMobile) {
      dispatchCollapseSideNavigation();
    }
  }, [isMobile, dispatchCollapseSideNavigation]);

  const expandSideNavigation = React.useCallback(() => {
    if (isMobile) {
      dispatchExpandSideNavigation();
    }
  }, [isMobile, dispatchExpandSideNavigation]);

  const toggleSideNavigation = React.useCallback(() => {
    if (isExpanded) {
      collapseSideNavigation();
    } else {
      expandSideNavigation();
    }
  }, [isExpanded, expandSideNavigation, collapseSideNavigation]);

  return {
    isExpanded,
    toggleSideNavigation,
    collapseSideNavigation,
    expandSideNavigation,
  };
}
