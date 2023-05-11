import * as React from "react";
import { useActions, useStoreState } from "app/store";
import useCancelToken from "./useCancelToken";

import { getUsers } from "app/actions/user";
import { moimMembersSelector } from "app/selectors/moim";

function useMoimMembers() {
  const { members, isLoading } = useStoreState(state => ({
    members: moimMembersSelector(state),
    isLoading: state.group.getMembersLoading,
  }));

  const { dispatchGetMembers } = useActions({
    dispatchGetMembers: getUsers,
  });
  const cancelToken = useCancelToken();

  const orderedMembers = React.useMemo(
    () => ({
      ...members,
      data: members.data?.sort(
        (member1, member2) => member2.created_at - member1.created_at,
      ),
    }),
    [members],
  );
  const handleGetMembers = React.useCallback(
    (paging?: Moim.IPaging) => {
      dispatchGetMembers({ ...paging }, cancelToken.current.token);
    },
    [dispatchGetMembers, cancelToken],
  );
  return {
    members,
    orderedMembers,
    isLoading,
    dispatchGetMembers,
    handleGetMembers,
  };
}

export default useMoimMembers;
