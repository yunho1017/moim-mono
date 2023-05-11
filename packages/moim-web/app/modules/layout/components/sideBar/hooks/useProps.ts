import * as React from "react";
import { IProps } from "../";
import useIsMobile from "common/hooks/useIsMobile";
import {
  useVisibleSideNavigation,
  useVisibleTopNavigation,
} from "../../controller/hooks";

import NavigationPanelContext from "app/modules/navigationPanel/context";

export type IHookProps = ReturnType<typeof useProps>;

export function useProps(props: IProps) {
  const isMobile = useIsMobile();

  const { joinedSubMoimsStatus, setJoinedSubMoimsStatus } = React.useContext(
    NavigationPanelContext,
  );
  const isShowDim =
    (isMobile && props.isExpanded) || joinedSubMoimsStatus === "Expanded";
  const visibleTopNavigation = useVisibleTopNavigation();
  const visibleSideNavigation = useVisibleSideNavigation();

  return {
    ...props,
    isMobile,
    isShowDim,
    visibleTopNavigation,
    visibleSideNavigation,
    joinedSubMoimsStatus,
    setJoinedSubMoimsStatus,
  };
}
