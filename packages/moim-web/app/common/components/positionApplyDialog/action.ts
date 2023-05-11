import { PositionApplyDialogTypes } from "app/actions/types";
import { ActionUnion } from "app/actions/helpers";

function createAction<T extends { type: PositionApplyDialogTypes }>(d: T): T {
  return d;
}

export const ActionCreators = {
  open: ({ position }: { position?: Moim.Id }) =>
    createAction({
      type: PositionApplyDialogTypes.OPEN,
      payload: { position },
    }),

  close: () =>
    createAction({
      type: PositionApplyDialogTypes.CLOSE,
    }),
};

export type Actions = ActionUnion<typeof ActionCreators>;
