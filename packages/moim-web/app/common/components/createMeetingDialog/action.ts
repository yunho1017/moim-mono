import { CreateMeetingDialogTypes } from "app/actions/types";
import { ActionUnion } from "app/actions/helpers";
import { ThunkResult } from "app/store";

function createAction<T extends { type: CreateMeetingDialogTypes }>(d: T): T {
  return d;
}

export const ActionCreators = {
  openCreateMeetingDialog: () =>
    createAction({
      type: CreateMeetingDialogTypes.OPEN_CREATE_MEETING_DIALOG,
    }),

  closeCreateMeetingDialog: () =>
    createAction({
      type: CreateMeetingDialogTypes.CLOSE_CREATE_MEETING_DIALOG,
    }),
};

export type Actions = ActionUnion<typeof ActionCreators>;

export const openCreateMeetingDialog = (): ThunkResult => dispatch => {
  dispatch(ActionCreators.openCreateMeetingDialog());
};

export const closeCreateMeetingDialog = (): ThunkResult => dispatch => {
  dispatch(ActionCreators.closeCreateMeetingDialog());
};
