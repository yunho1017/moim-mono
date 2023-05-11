import produce from "immer";
import { AllActions } from "app/actions";
import { ImageBrochureTypes } from "app/actions/types";
import { LOCATION_CHANGE } from "connected-react-router";

export interface IImageBrochureState {
  isOpen: boolean;
  currentAssetOwnerId: Moim.Id;
  initialSrc: string;
}

export const INITIAL_STATE: IImageBrochureState = {
  isOpen: false,
  currentAssetOwnerId: "",
  initialSrc: "",
};

export function reducer(state = INITIAL_STATE, action: AllActions) {
  return produce(state, draft => {
    switch (action.type) {
      case ImageBrochureTypes.OPEN_IMAGE_BROCHURE_DIALOG: {
        draft.isOpen = true;
        draft.currentAssetOwnerId = action.payload.ownerId;
        draft.initialSrc = "";
        break;
      }

      case ImageBrochureTypes.OPEN_SRC_IMAGE_BROCHURE_DIALOG: {
        draft.isOpen = true;
        draft.currentAssetOwnerId = "";
        draft.initialSrc = action.payload.src;
        break;
      }

      case ImageBrochureTypes.CLOSE_IMAGE_BROCHURE_DIALOG: {
        draft.isOpen = false;
        draft.currentAssetOwnerId = "";
        draft.initialSrc = "";
        break;
      }

      case LOCATION_CHANGE: {
        return INITIAL_STATE;
      }
    }
  });
}
