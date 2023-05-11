import { useContext } from "react";
// hooks
import { useActions, useStoreState } from "app/store";
import useCancelToken from "common/hooks/useCancelToken";
import useIsMobile from "common/hooks/useIsMobile";
import useIsTablet from "common/hooks/useIsTablet";
import useCurrentUser from "common/hooks/useCurrentUser";
import useCurrentGroup from "common/hooks/useCurrentGroup";
import { useVisibleTopNavigation } from "app/modules/layout/components/controller/hooks";

// action
import { getJoinedSubMoims } from "app/actions/group";

import {
  joinedSubMoimListSelector,
  hubMoimSelector,
} from "app/selectors/tagAndSubgroup";
import NavigationPanelContext from "app/modules/navigationPanel/context";

export type IHookProps = ReturnType<typeof useProps>;

export default function useProps() {
  const state = useStoreState(storeState => ({
    subMoims: joinedSubMoimListSelector(storeState),
    hubMoim: hubMoimSelector(storeState),
    // isLoading: storeState.subgroupsData.joinedSubGroupsLoading,
    isLoading: false,
  }));
  const actions = useActions({
    dispatchGetJoinedSubMoims: getJoinedSubMoims,
  });

  const {
    joinedSubMoimsStatus: status,
    setJoinedSubMoimsStatus: setStatus,
  } = useContext(NavigationPanelContext);
  const isSimple = status !== "Expanded";
  const cancelToken = useCancelToken();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const currentUser = useCurrentUser();
  const currentGroup = useCurrentGroup();
  const visibleTopNavigation = useVisibleTopNavigation();

  return {
    ...state,
    ...actions,
    currentUser,
    currentGroup,
    isMobile,
    isTablet,
    isSimple,
    status,
    setStatus,
    cancelToken,
    visibleTopNavigation,
  };
}
