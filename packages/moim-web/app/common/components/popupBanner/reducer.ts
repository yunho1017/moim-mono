import produce from "immer";
import { AllActions } from "app/actions";
import { PopupBannerTypes } from "app/actions/types";

export interface IPopupBannerState {
  open: boolean;
  banner: Moim.Promote.IPopupBanner | null;
}

export const INITIAL_STATE: IPopupBannerState = {
  open: false,
  banner: null,
};

export function reducer(state = INITIAL_STATE, action: AllActions) {
  return produce(state, draft => {
    switch (action.type) {
      case PopupBannerTypes.OPEN: {
        draft.open = true;
        draft.banner = action.payload.banner;
        break;
      }

      case PopupBannerTypes.CLOSE: {
        draft.open = false;
        break;
      }

      case PopupBannerTypes.CLEAR: {
        draft.banner = null;
        break;
      }
    }
  });
}
