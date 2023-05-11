import { useActions, useStoreState } from "app/store";
import useCancelToken from "common/hooks/useCancelToken";

// actions
import { getMyGroups } from "app/actions/hub/app";

// helpers
import { getCryptoBadgeToken } from "common/helpers/cryptoBadgeHandlerWithInMemory";
import { selectMyMoimListForHub } from "app/selectors/moim";

export type IHookProps = ReturnType<typeof useProps>;

export default function useProps() {
  const states = useStoreState(state => ({
    currentGroupId: state.app.currentGroupId,
    myGroups: selectMyMoimListForHub(state),
    myGroupIds: state.hub.app.myGroups.data,
    isMyGroupsLoading: state.hubPage.isMyGroupLoading,
  }));

  const actions = useActions({
    dispatchGetMyGroups: getMyGroups,
  });

  const cancelToken = useCancelToken();
  const cryptoBadgeAccessToken = getCryptoBadgeToken();
  return {
    cryptoBadgeAccessToken,
    cancelToken,
    ...states,
    ...actions,
  };
}
