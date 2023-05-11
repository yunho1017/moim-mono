import { ActionUnion } from "app/actions/helpers";
import { ThunkPromiseResult } from "app/store";

import { errorParseData } from "common/helpers/APIErrorParser";
import { Actions as postActionsType } from "../presets/post/actions";
import { Actions as userActionsType } from "../presets/user/actions";

import { ActionCreators as SnackBarActionCreators } from "app/actions/snackbar";
import { CancelToken } from "axios";

export enum ActionTypes {
  START_REPORT = "GLOBAL_REPORT_DIALOG.START_REPORT",
  SUCCEED_REPORT = "GLOBAL_REPORT_DIALOG.SUCCEED_REPORT",
  FAILED_REPORT = "GLOBAL_REPORT_DIALOG.FAILED_REPORT",
}

function createAction<T extends { type: ActionTypes }>(d: T): T {
  return d;
}

export const ActionCreators = {
  startReport: () =>
    createAction({
      type: ActionTypes.START_REPORT,
    }),
  succeedReport: () =>
    createAction({
      type: ActionTypes.SUCCEED_REPORT,
    }),
  failedReport: () =>
    createAction({
      type: ActionTypes.FAILED_REPORT,
    }),
};

export type Actions =
  | ActionUnion<typeof ActionCreators>
  | postActionsType
  | userActionsType;

export function report(
  threadId: Moim.Id,
  params: {
    type: Moim.Forum.THREAD_TYPE;
    title?: string;
    content: Moim.Blockit.Blocks[];
  },
  cancelToken: CancelToken,
  message: {
    getSucceed: () => string;
    getFailed: (code?: string) => string;
  },
): ThunkPromiseResult<Moim.ISuccessResponse> {
  return async (dispatch, getState, { apiSelector }) => {
    try {
      dispatch(ActionCreators.startReport());
      await apiSelector(getState(), dispatch).thread.postThreadForReport(
        threadId,
        params,
        cancelToken,
      );
      dispatch(
        SnackBarActionCreators.openSnackbar({
          text: message.getSucceed(),
        }),
      );
      dispatch(ActionCreators.succeedReport());

      return { success: true };
    } catch (err) {
      if (err instanceof Error) {
        const parsedError = errorParseData(err);
        dispatch(
          SnackBarActionCreators.openSnackbar({
            text: message.getFailed(parsedError?.code),
          }),
        );
      }
      dispatch(ActionCreators.failedReport());
      return { success: false };
    }
  };
}
