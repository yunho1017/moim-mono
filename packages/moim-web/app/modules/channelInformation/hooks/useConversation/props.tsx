import useCancelToken from "common/hooks/useCancelToken";
import { useActions, useStoreState } from "app/store";

// actions
import { getUsers } from "app/actions/user";
import { channelByIdSelector } from "app/selectors/channel";
import {
  moimMembersSelector,
  getMemberLoadingLoadingSelector,
} from "app/selectors/moim";

export type IHookProps = ReturnType<typeof useProps>;

export default function useProps(channelId: string) {
  const states = useStoreState(state => ({
    // ToDo: conversation member Api 수정후 변경
    // members: conversationMembersSelector(state, channelId),
    // isLoading: conversationMembersLoadingSelector(state),
    conversation: channelByIdSelector(state, channelId),
    members: moimMembersSelector(state),
    isLoading: getMemberLoadingLoadingSelector(state),
  }));

  const actions = useActions({
    dispatchGetConversationMembers: getUsers,
  });
  const cancelToken = useCancelToken();

  return {
    ...actions,
    ...states,
    conversation: states.conversation as Moim.Channel.IChannel,
    channelId,
    cancelToken,
  };
}
