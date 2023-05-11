import { ProductOptionInventoryDialogTypes } from "app/actions/types";
import { ActionUnion } from "app/actions/helpers";

function createAction<T extends { type: ProductOptionInventoryDialogTypes }>(
  d: T,
): T {
  return d;
}

export const ActionCreators = {
  open: (payload: { productId: string }) =>
    createAction({
      type: ProductOptionInventoryDialogTypes.OPEN,
      payload,
    }),

  close: () =>
    createAction({
      type: ProductOptionInventoryDialogTypes.CLOSE,
    }),
};

export type Actions = ActionUnion<typeof ActionCreators>;
