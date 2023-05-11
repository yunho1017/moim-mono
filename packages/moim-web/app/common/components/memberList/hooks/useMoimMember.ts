import * as React from "react";

import useCancelToken from "common/hooks/useCancelToken";
import { useActions, useStoreState } from "app/store";

import {
  moimMembersSelector,
  getMemberLoadingLoadingSelector,
} from "app/selectors/moim";

import { getUsers } from "app/actions/user";

export default function useHooks() {
  const states = useStoreState(state => ({
    members: moimMembersSelector(state),
    getMemberLoading: getMemberLoadingLoadingSelector(state),
  }));

  const { dispatchGetMembers } = useActions({
    dispatchGetMembers: getUsers,
  });
  const cancelToken = useCancelToken();

  const handleGetMembers = React.useCallback(
    (paging?: Moim.IPaging) => {
      dispatchGetMembers({ ...paging }, cancelToken.current.token);
    },
    [dispatchGetMembers, cancelToken],
  );

  return {
    ...states,
    handleGetMembers,
  };
}
