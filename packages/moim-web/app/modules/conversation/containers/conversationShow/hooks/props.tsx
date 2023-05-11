import { useRef, useState } from "react";
import { useIntl } from "react-intl";
// hooks
import useCancelToken from "common/hooks/useCancelToken";
import { useActions, useStoreState } from "app/store";
import useIsMobile from "common/hooks/useIsMobile";
import useMessages from "app/modules/conversation/hooks/useMessages";
import { useResourcePermission } from "common/components/permissionChecker";
// helpers
import { conversationSelector } from "app/selectors/conversation";
// actions
import {
  getConversation,
  ActionCreators as ConversationActionCreators,
} from "app/actions/conversation";
import { getPermission } from "app/actions/permission";

import { IProps } from "../";
import { IForwardRef } from "common/components/groupInput";

export type IHookProps = ReturnType<typeof useProps>;

export default function useProps(props: IProps) {
  const states = useStoreState(state => ({
    currentConversation: conversationSelector(
      state,
      state.conversation.currentConversationId,
    ),
    permissionLoading: state.permission.permissionLoading,
    hideInput:
      state.conversationPage.messageEditState?.channelId ===
      state.conversation.currentConversationId,
  }));

  const actions = useActions({
    dispatchGetConversation: getConversation,
    dispatchClearMessageEditState:
      ConversationActionCreators.clearMessageEditState,
    dispatchGetPermission: getPermission,
  });
  const [initialScrollToBottom, setInitialScrollToBottom] = useState(true);
  const cancelToken = useCancelToken();
  const intl = useIntl();
  const isMobile = useIsMobile();
  const refThis = useRef<HTMLDivElement>(null);
  const inputRef = useRef<IForwardRef>(null);
  const inputWrapperRef = useRef<HTMLDivElement>(null);
  const [mobileHeight, setMobileHeight] = useState(0);
  const { handleGetConversationMessage } = useMessages(props.channelId);
  const {
    hasPermission: hasReadPermission,
    isLoading: isPermissionLoading,
  } = useResourcePermission("READ_MESSAGE", props.channelId);
  const { hasPermission: hasSendPermission } = useResourcePermission(
    "SEND_MESSAGE",
    props.channelId,
  );

  return {
    ...props,
    ...actions,
    ...states,
    refThis,
    inputRef,
    inputWrapperRef,
    isMobile,
    intl,
    cancelToken,
    hasReadPermission,
    hasSendPermission,
    isPermissionLoading,
    handleGetConversationMessage,
    mobileHeight,
    setMobileHeight,
    initialScrollToBottom,
    setInitialScrollToBottom,
  };
}
