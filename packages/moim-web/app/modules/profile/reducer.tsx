import produce from "immer";
import { AllActions } from "app/actions";
import { ProfileTypes, CryptoBadgeTypes } from "app/actions/types";

export interface IProfilePageState {
  isLoading: boolean;
  isFailed: boolean;
  isCryptoBadgeLoading: Record<string, boolean>;
}

export const INITIAL_STATE: IProfilePageState = {
  isLoading: false,
  isFailed: false,
  isCryptoBadgeLoading: {},
};

export const reducer = (
  state: IProfilePageState = INITIAL_STATE,
  action: AllActions,
) =>
  produce(state, draft => {
    switch (action.type) {
      case ProfileTypes.START_FETCHING_PROFILE: {
        draft.isLoading = true;
        draft.isFailed = false;
        break;
      }

      case ProfileTypes.SUCCEED_FETCHING_PROFILE: {
        draft.isLoading = false;
        break;
      }

      case ProfileTypes.FAILED_FETCHING_PROFILE: {
        draft.isLoading = false;
        draft.isFailed = true;
        break;
      }

      case CryptoBadgeTypes.START_FETCHING_CERTIFICATIONS: {
        draft.isCryptoBadgeLoading[action.payload.userId] = true;
        break;
      }

      case CryptoBadgeTypes.FAILED_FETCHING_CERTIFICATIONS:
      case CryptoBadgeTypes.SUCCEED_FETCHING_CERTIFICATIONS: {
        draft.isCryptoBadgeLoading[action.payload.userId] = false;
        break;
      }

      default: {
        return state;
      }
    }
  });
