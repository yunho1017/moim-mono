import * as React from "react";
// type
import { IProps } from "../";
// helper
import { useActions, useStoreState } from "app/store";
import {
  useVisibleBottomFooter,
  useVisibleTopNavigation,
  useVisibleTopSubNavigation,
  useVisibleMobileTopTab,
} from ".";
import useCurrentUser from "common/hooks/useCurrentUser";
import useCurrentGroup from "common/hooks/useCurrentGroup";
import useIsMobile from "common/hooks/useIsMobile";

import { ActionCreators as SideNavigationActionCreators } from "app/actions/sideNavigation";
import { selectIsExpand } from "app/selectors/sideNavigation";
import { IAppState } from "app/rootReducer";
import { TopBannerContext } from "common/components/topBanner/context";

export type IHookProps = ReturnType<typeof useProps>;

export default function useProps(props: IProps) {
  const state = useStoreState((storeState: IAppState) => ({
    isExpandSideNavigation: selectIsExpand(storeState),
  }));
  const actions = useActions({
    expandSideNavigation: SideNavigationActionCreators.expandSideNavigation,
    collapseSideNavigation: SideNavigationActionCreators.collapseSideNavigation,
  });
  const [topNaviHeight, setTopNaviHeight] = React.useState<number>(0);
  const [topBannerContext] = React.useContext(TopBannerContext);
  const [
    groupJoinBannerDirection,
    setGroupJoinBannerDirection,
  ] = React.useState<"up" | "down">("up");
  const visibleTopNavigation = useVisibleTopNavigation();
  const visibleTopSubNavigation = useVisibleTopSubNavigation();
  const visibleTopTabNavigation = useVisibleMobileTopTab();
  const visibleBottomFooter = useVisibleBottomFooter();
  const isMobile = useIsMobile();
  const currentUser = useCurrentUser();
  const currentGroup = useCurrentGroup();

  return {
    ...props,
    ...state,
    ...actions,
    topBannerContext,
    groupJoinBannerDirection,
    setGroupJoinBannerDirection,
    visibleTopNavigation,
    visibleTopSubNavigation,
    visibleTopTabNavigation,
    visibleBottomFooter,
    isMobile,
    currentUser,
    currentGroup,
    topNaviHeight,
    setTopNaviHeight,
  };
}
