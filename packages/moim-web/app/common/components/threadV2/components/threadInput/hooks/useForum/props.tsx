import * as React from "react";

import useCancelToken from "common/hooks/useCancelToken";
import { useActions, useStoreState } from "app/store";

// actions
import { postComment, editComment } from "app/actions/forum";

import MediaUploadInput from "app/modules/mediaUpload/input";

export type IHookProps = ReturnType<typeof useProps>;

export default function useProps() {
  const states = useStoreState(state => ({
    commentEditState: state.forumCommentListPage.commentEditState,
  }));

  const actions = useActions({
    dispatchPostComment: postComment,
    dispatchEditComment: editComment,
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
