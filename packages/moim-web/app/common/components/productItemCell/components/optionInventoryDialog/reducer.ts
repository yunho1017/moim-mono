import produce from "immer";
import { AllActions } from "app/actions";
import { ProductOptionInventoryDialogTypes } from "app/actions/types";

export interface IProductOptionInventoryDialogState {
  open: boolean;
  productId: string | null;
}

export const INITIAL_STATE: IProductOptionInventoryDialogState = {
  open: false,
  productId: null,
};

export function reducer(state = INITIAL_STATE, action: AllActions) {
  return produce(state, draft => {
    switch (action.type) {
      case ProductOptionInventoryDialogTypes.OPEN: {
        draft.open = true;
        draft.productId = action.payload.productId;
        break;
      }

      case ProductOptionInventoryDialogTypes.CLOSE: {
        draft.open = false;
        draft.productId = null;
        break;
      }
    }
  });
}
