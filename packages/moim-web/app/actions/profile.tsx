import * as React from "react";
import { CancelToken } from "axios";
import { ActionUnion } from "./helpers";
import { ProfileTypes } from "app/actions/types";
import { ThunkResult } from "app/store";
import { loadEntities } from "app/actions/entity";
import { batchUserData } from "common/helpers/batchService";

function createAction<T extends { type: ProfileTypes }>(d: T): T {
  return d;
}

export const ActionCreators = {
  startFetchingProfile: () =>
    createAction({
      type: ProfileTypes.START_FETCHING_PROFILE,
    }),
  succeedFetchingProfile: (userId: Moim.Id) =>
    createAction({
      type: ProfileTypes.SUCCEED_FETCHING_PROFILE,
      payload: {
        userId,
      },
    }),
  failedFetchingProfile: () =>
    createAction({
      type: ProfileTypes.FAILED_FETCHING_PROFILE,
    }),

  openProfileDialog: (
    userId: Moim.Id,
    anchorElement: null | React.RefObject<any>,
  ) =>
    createAction({
      type: ProfileTypes.OPEN_PROFILE_DIALOG,
      payload: {
        userId,
        anchorElement,
      },
    }),
  closeProfileDialog: () =>
    createAction({
      type: ProfileTypes.CLOSE_PROFILE_DIALOG,
    }),
};

export type Actions = ActionUnion<typeof ActionCreators>;

export function getProfile(param: {
  userId: Moim.Id;
  cancelToken: CancelToken;
}): ThunkResult {
  return async dispatch => {
    dispatch(ActionCreators.startFetchingProfile());
    try {
      dispatch(loadEntities(await batchUserData([param.userId])));
      dispatch(ActionCreators.succeedFetchingProfile(param.userId));
    } catch (err) {
      dispatch(ActionCreators.failedFetchingProfile());
    }
  };
}
