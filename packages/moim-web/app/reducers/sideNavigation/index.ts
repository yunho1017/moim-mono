import produce from "immer";
import { AllActions } from "app/actions";
import { SideNavigationTypes } from "app/actions/types";

export interface ISideNavigationState {
  isExpand: boolean;
}

export const INITIAL_STATE: ISideNavigationState = {
  isExpand: false,
};

export function reducer(state = INITIAL_STATE, action: AllActions) {
  return produce(state, draft => {
    switch (action.type) {
      case SideNavigationTypes.EXPAND_SIDE_NAVIGATION: {
        draft.isExpand = true;
        break;
      }

      case SideNavigationTypes.COLLAPSE_SIDE_NAVIGATION: {
        draft.isExpand = false;
        break;
      }

      default: {
        break;
      }
    }
  });
}
