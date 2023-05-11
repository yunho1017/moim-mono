import { useActions, useStoreState } from "app/store";

import useCancelToken from "common/hooks/useCancelToken";
import useCurrentGroup from "common/hooks/useCurrentGroup";
import useGroupTexts from "common/hooks/useGroupTexts";

import { getAuthentication } from "common/helpers/authentication/actions";
import { ActionCreators as GroupActionCreators } from "app/actions/group";
import { currentGroupSelector } from "app/selectors/app";
import { useMemo } from "react";
import selectHubMoimId from "common/helpers/selectHubMoimId";
import { useStoreSecondaryView } from "common/hooks/useSecondaryView";

export type IHookProps = ReturnType<typeof useProps>;

export function useProps() {
  const storeSecondaryViewHandler = useStoreSecondaryView();
  const actions = useActions({
    dispatchGetAuthentication: getAuthentication,
    openJoinGroupDialog: GroupActionCreators.openJoinGroupDialog,
  });

  const { parentUser, ...state } = useStoreState(storeState => ({
    currentGroup: currentGroupSelector(storeState),
    parentUser: storeState.app.parentMoimUser,
    hubGroupId: selectHubMoimId(storeState),
  }));

  const cancelToken = useCancelToken();
  const currentGroup = useCurrentGroup();
  const joinButtonText = useGroupTexts("join_button");

  const joinDialogType: Moim.Group.JoinGroupDialogType = useMemo(() => {
    if (state.currentGroup?.is_hub && !parentUser) {
      return "parent";
    }
    return "current";
  }, [parentUser, state.currentGroup]);

  return {
    ...actions,
    ...state,
    storeSecondaryViewHandler,
    joinButtonText,
    cancelToken,
    currentGroup,
    joinDialogType,
  };
}
