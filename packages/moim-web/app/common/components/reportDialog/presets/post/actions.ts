import { ActionUnion } from "app/actions/helpers";

export enum ActionTypes {
  OPEN = "GLOBAL_REPORT_DIALOG.POST.OPEN",
  CLOSE = "GLOBAL_REPORT_DIALOG.POST.CLOSE",
}

function createAction<T extends { type: ActionTypes }>(d: T): T {
  return d;
}

export const ActionCreators = {
  open: (payload: { threadId: string; parentId: string }) =>
    createAction({
      type: ActionTypes.OPEN,
      payload,
    }),

  close: () =>
    createAction({
      type: ActionTypes.CLOSE,
    }),
};

export type Actions = ActionUnion<typeof ActionCreators>;
