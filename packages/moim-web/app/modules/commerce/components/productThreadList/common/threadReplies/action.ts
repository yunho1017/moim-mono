import { CancelToken } from "axios";
import { ActionCreators } from "app/actions/forum";
import { batchThreadData } from "common/helpers/batchService";
import { loadEntities } from "app/actions/entity";
import { ThunkPromiseResult } from "app/store";

export function getCommentListWithOne(
  threadId: string,
  replyId: string,
  cancelToken?: CancelToken,
): ThunkPromiseResult {
  return async dispatch => {
    dispatch(ActionCreators.startGetCommentList(threadId));

    try {
      const data = await batchThreadData([replyId], cancelToken);
      dispatch(loadEntities(data));

      dispatch(
        ActionCreators.succeedGetCommentList(
          threadId,
          {
            data: [replyId],
            paging: { after: replyId, before: replyId },
          },
          "replace",
        ),
      );
    } catch (e) {
      dispatch(ActionCreators.failedGetCommentList());
    }
  };
}
