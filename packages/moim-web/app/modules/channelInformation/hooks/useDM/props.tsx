import useCancelToken from "common/hooks/useCancelToken";
import { useActions, useStoreState } from "app/store";

// actions
import { getConversationMembers } from "app/actions/conversation";

import {
  conversationMembersSelector,
  conversationMembersLoadingSelector,
  conversationSelector,
} from "app/selectors/conversation";

export type IHookProps = ReturnType<typeof useProps>;

export default function useProps(channelId: string) {
  const states = useStoreState(state => ({
    members: conversationMembersSelector(state, channelId),
    conversation: conversationSelector(state, channelId),
    isLoading: conversationMembersLoadingSelector(state),
  }));

  const actions = useActions({
    dispatchGetConversationMembers: getConversationMembers,
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
