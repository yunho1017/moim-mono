import { PositionFormDialogTypes } from "./types";
import { ActionUnion } from "./helpers";

function createAction<T extends { type: PositionFormDialogTypes }>(d: T): T {
  return d;
}

export const ActionCreators = {
  openForCreate: () =>
    createAction({
      type: PositionFormDialogTypes.OPEN_FOR_CREATE,
    }),

  openForEdit: (positionId: Moim.Id) =>
    createAction({
      positionId,
      type: PositionFormDialogTypes.OPEN_FOR_EDIT,
    }),

  close: () =>
    createAction({
      type: PositionFormDialogTypes.CLOSE,
    }),
};

export type Actions = ActionUnion<typeof ActionCreators>;
