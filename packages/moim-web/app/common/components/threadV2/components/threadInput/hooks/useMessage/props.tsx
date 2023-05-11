import * as React from "react";

import useCancelToken from "common/hooks/useCancelToken";
import { useActions, useStoreState } from "app/store";

// actions
import {
  createConversationMessage,
  editConversationMessage,
} from "app/actions/conversation";

import MediaUploadInput from "app/modules/mediaUpload/input";

export type IHookProps = ReturnType<typeof useProps>;

export default function useProps() {
  const states = useStoreState(state => ({
    conversationId: state.conversation.currentConversationId,
    messageEditState: state.conversationPage.messageEditState,
  }));

  const actions = useActions({
    dispatchCreateConversationMessage: createConversationMessage,
    dispatchEditConversationMessage: editConversationMessage,
  });
  const cancelToken = useCancelToken();

  const mediaUploadInputRef: React.RefObject<MediaUploadInput> = React.useRef(
    null,
  );

  return {
    ...actions,
    ...states,
    cancelToken,
    mediaUploadInputRef,
  };
}
