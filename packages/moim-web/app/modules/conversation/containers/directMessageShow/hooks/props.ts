import * as React from "react";
import { useIntl } from "react-intl";
// hooks
import { useActions, useStoreState } from "app/store";
import useIsMobile from "common/hooks/useIsMobile";

import { ActionCreators as ConversationActionCreators } from "app/actions/conversation";
import { getDirectMessage as getDirectMessageAction } from "app/actions/directMessage";

import { IForwardRef } from "common/components/groupInput";
import { IProps } from "../";
import { directMessageSelector } from "app/selectors/directMessage";
import getDirectMessageTargetUser from "common/helpers/getDirectMessageTargetUser";
import useMessages from "app/modules/conversation/hooks/useMessages";
import useCurrentUser from "common/hooks/useCurrentUser";
import { blockedUserSelector } from "app/selectors/app";

export type IHookProps = ReturnType<typeof useProps>;

export default function useProps(props: IProps) {
  const intl = useIntl();
  const isMobile = useIsMobile();
  const { handleGetConversationMessage } = useMessages(props.channelId);
  const [isLoading, setLoadStatus] = React.useState(true);
  const [isFetched, setFetchedStatus] = React.useState(false);
  const currentUser = useCurrentUser();
  const refThis = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<IForwardRef>(null);
  const inputWrapperRef = React.useRef<HTMLDivElement>(null);
  const [mobileHeight, setMobileHeight] = React.useState(0);

  const states = useStoreState(state => {
    const directMessageEntity = directMessageSelector(state, props.channelId);
    const targetUser = getDirectMessageTargetUser(
      currentUser || undefined,
      directMessageEntity?.members,
    );

    return {
      directMessageEntity,
      targetUser,
      directMessageLoading: state.directMessage.getDirectMessagesLoading,
      hideInput:
        state.conversationPage.messageEditState?.channelId ===
        state.conversation.currentConversationId,
      isBlockedUser: Boolean(directMessageEntity?.blocked),
      blockedUser: targetUser
        ? blockedUserSelector(state, targetUser.id)
        : false,
    };
  });
  const actions = useActions({
    dispatchClearMessageEditState:
      ConversationActionCreators.clearMessageEditState,
    getDirectMessage: getDirectMessageAction,
  });

  return {
    ...props,
    ...states,
    ...actions,
    isLoading,
    setLoadStatus,
    isFetched,
    setFetchedStatus,
    refThis,
    inputWrapperRef,
    currentUser,
    isMobile,
    intl,
    inputRef,
    mobileHeight,
    setMobileHeight,
    handleGetConversationMessage,
  };
}
