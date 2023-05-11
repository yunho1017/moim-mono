// hooks
import useIsMobile from "common/hooks/useIsMobile";
// type
import { IProps } from "../";
// helper
import { useActions, useStoreState } from "app/store";
import { selectIsExpand } from "app/selectors/sideNavigation";
import { IAppState } from "app/rootReducer";
import { ActionCreators as SideNavigationActionCreators } from "app/actions/sideNavigation";
import {
  useVisibleMobileTopTab,
  useVisibleSideNavigation,
} from "app/modules/layout/components/controller/hooks";

export type IHookProps = ReturnType<typeof useProps>;

export default function useProps(props: IProps) {
  const state = useStoreState((storeState: IAppState) => ({
    isExpandSideNavigation: selectIsExpand(storeState),
    nativeSecondaryViewOpenStatus:
      storeState.secondaryViewPage.nativeOpenStatus,
    pluginSecondaryViewOpenStatus:
      storeState.secondaryViewPage.pluginOpenStatus,
  }));
  const actions = useActions({
    expandSideNavigation: SideNavigationActionCreators.expandSideNavigation,
    collapseSideNavigation: SideNavigationActionCreators.collapseSideNavigation,
  });
  const isMobile = useIsMobile();

  const visibleSideNavigation = useVisibleSideNavigation();
  const visibleTopTabNavigation = useVisibleMobileTopTab();

  return {
    ...props,
    ...state,
    ...actions,
    isMobile,
    visibleSideNavigation,
    visibleTopTabNavigation,
  };
}
