import * as React from "react";

import useCancelToken from "common/hooks/useCancelToken";
import { useActions } from "app/store";

// actions
import { createConversationMessage } from "app/actions/conversation";

import MediaUploadInput from "app/modules/mediaUpload/input";

export type IHookProps = ReturnType<typeof useProps>;

export default function useProps(channelId: string) {
  const actions = useActions({
    dispatchCreateConversationMessage: createConversationMessage,
  });
  const cancelToken = useCancelToken();

  const mediaUploadInputRef: React.RefObject<MediaUploadInput> = React.useRef(
    null,
  );

  return {
    ...actions,
    channelId,
    cancelToken,
    mediaUploadInputRef,
  };
}
