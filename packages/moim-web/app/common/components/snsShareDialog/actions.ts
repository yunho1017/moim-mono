import { SNSShareDialogTypes } from "app/actions/types";
import { ActionUnion } from "app/actions/helpers";

function createAction<T extends { type: SNSShareDialogTypes }>(d: T): T {
  return d;
}

export const ActionCreators = {
  open: (payload: { shareUrl: string }) =>
    createAction({
      type: SNSShareDialogTypes.OPEN,
      payload,
    }),

  close: () =>
    createAction({
      type: SNSShareDialogTypes.CLOSE,
    }),
};

export type Actions = ActionUnion<typeof ActionCreators>;
