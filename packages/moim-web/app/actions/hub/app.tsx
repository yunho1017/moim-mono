import { CancelToken } from "axios";
import { ThunkPromiseResult } from "app/store";
import { ActionCreators as EntityActionCreators } from "../entity";
import { fileUploaderForHub } from "common/helpers/fileUploader";

import { HubAppStateTypes } from "../types";
import { ActionUnion } from "../helpers";
import { moimListNormalizer } from "../../models";

function createAction<T extends { type: HubAppStateTypes }>(d: T): T {
  return d;
}

export const ActionCreators = {
  startFetchingMyGroup: () =>
    createAction({ type: HubAppStateTypes.START_FETCHING_MY_GROUP }),
  succeededFetchingMyGroup: (groups: Moim.IPaginatedListResponse<Moim.Id>) =>
    createAction({
      type: HubAppStateTypes.SUCCEEDED_FETCHING_MY_GROUP,
      payload: { groups },
    }),
  failedFetchingMyGroup: () =>
    createAction({ type: HubAppStateTypes.FAILED_FETCHING_MY_GROUP }),

  startJoinGroup: () =>
    createAction({ type: HubAppStateTypes.START_JOIN_GROUP }),
  succeededJoinGroup: () =>
    createAction({
      type: HubAppStateTypes.SUCCEEDED_JOIN_GROUP,
    }),
  failedJoinGroup: () =>
    createAction({ type: HubAppStateTypes.FAILED_JOIN_GROUP }),

  startFileUpload: () =>
    createAction({ type: HubAppStateTypes.START_FILE_UPLOAD }),
  succeededFileUpload: (icon: Moim.Group.IGroupImagePreview) =>
    createAction({
      type: HubAppStateTypes.SUCCEEDED_FILE_UPLOAD,
      payload: {
        icon,
      },
    }),
  failedFileUpload: () =>
    createAction({ type: HubAppStateTypes.FAILED_FILE_UPLOAD }),
};

export type Actions = ActionUnion<typeof ActionCreators>;

export function getMyGroups(
  authentication: Moim.IAuthentication,
  cancelToken?: CancelToken,
): ThunkPromiseResult {
  return async (dispatch, _getState, { defaultApi }) => {
    dispatch(ActionCreators.startFetchingMyGroup());
    try {
      const groups = await defaultApi.me.getJoinedGroups(
        "cryptobadge",
        authentication,
        cancelToken,
      );
      const normalizedData = moimListNormalizer(groups);
      dispatch(EntityActionCreators.addEntity(normalizedData.entities));
      dispatch(ActionCreators.succeededFetchingMyGroup(normalizedData.result));
    } catch {
      dispatch(ActionCreators.failedFetchingMyGroup());
    }
  };
}

export function joinGroup(): ThunkPromiseResult {
  return async dispatch => {
    dispatch(ActionCreators.startJoinGroup());

    try {
      dispatch(ActionCreators.succeededJoinGroup());
    } catch {
      dispatch(ActionCreators.failedJoinGroup());
    }
  };
}

export function fileUploadForHub(
  ...params: Parameters<typeof fileUploaderForHub>
): ThunkPromiseResult {
  return async dispatch => {
    dispatch(ActionCreators.startFileUpload());

    try {
      const response = await fileUploaderForHub(...params);
      dispatch(ActionCreators.succeededFileUpload(response));
    } catch {
      dispatch(ActionCreators.failedFileUpload());
    }
  };
}
