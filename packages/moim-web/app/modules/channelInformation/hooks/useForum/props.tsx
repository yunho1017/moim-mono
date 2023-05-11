import useCancelToken from "common/hooks/useCancelToken";
import { useActions, useStoreState } from "app/store";
// actions
import { getUsers } from "app/actions/user";
import {
  moimMembersSelector,
  getMemberLoadingLoadingSelector,
} from "app/selectors/moim";
import { channelByIdSelector } from "app/selectors/channel";

export type IHookProps = ReturnType<typeof useProps>;

export default function useProps(channelId: string) {
  const states = useStoreState(state => ({
    members: moimMembersSelector(state),
    isLoading: getMemberLoadingLoadingSelector(state),
    forum: channelByIdSelector(state, channelId),
  }));

  const actions = useActions({
    dispatchGetMembers: getUsers,
  });
  const cancelToken = useCancelToken();

  return {
    ...actions,
    ...states,
    forum: states.forum as Moim.Channel.IChannel,
    channelId,
    cancelToken,
  };
}
