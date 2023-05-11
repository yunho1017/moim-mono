import produce from "immer";
import { AllActions } from "app/actions";
import { ProfileTypes } from "app/actions/types";

export interface IProfileDialogState {
  targetUserId: Moim.Id;
  isOpen: boolean;
  isLoading: boolean;
  isFailed: boolean;
  anchorElement: React.RefObject<any> | null;
}

export const INITIAL_STATE: IProfileDialogState = {
  targetUserId: "",
  isOpen: false,
  isLoading: true,
  isFailed: false,
  anchorElement: null,
};

export function reducer(state = INITIAL_STATE, action: AllActions) {
  return produce(state, draft => {
    switch (action.type) {
      case ProfileTypes.OPEN_PROFILE_DIALOG: {
        draft.isOpen = true;
        draft.targetUserId = action.payload.userId;
        draft.anchorElement = action.payload.anchorElement;
        break;
      }

      case ProfileTypes.CLOSE_PROFILE_DIALOG: {
        draft.isOpen = false;
        draft.targetUserId = "";
        draft.anchorElement = null;
        break;
      }

      case ProfileTypes.START_FETCHING_PROFILE: {
        draft.isLoading = true;
        draft.isFailed = false;
        break;
      }

      case ProfileTypes.FAILED_FETCHING_PROFILE: {
        draft.isLoading = false;
        draft.isFailed = true;
        break;
      }

      case ProfileTypes.SUCCEED_FETCHING_PROFILE: {
        draft.isLoading = false;
        draft.isFailed = false;
        break;
      }

      default: {
        return state;
      }
    }
  });
}
