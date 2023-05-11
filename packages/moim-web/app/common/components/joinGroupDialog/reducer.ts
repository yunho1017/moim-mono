// helper
import { AllActions } from "app/actions";
import produce from "immer";
import { GroupTypes, UserTypes } from "app/actions/types";

export const INITIAL_STATE: Moim.Group.IJoinGroupDialogState = {
  open: false,
  type: null,
  isLoading: false,
  isGetParentMoimUserLoading: false,
  isGetParentGroupLoading: false,
  isPostPhoneNumberLoading: false,
  isCheckPhoneNumberLoading: false,
  initialStep: undefined,
  options: undefined,
};

export const reducer = (state = INITIAL_STATE, action: AllActions) =>
  produce(state, draft => {
    switch (action.type) {
      case GroupTypes.OPEN_JOIN_GROUP_DIALOG: {
        draft.open = true;
        draft.type = action.payload.type;
        draft.initialStep = action.payload.initialStep;
        draft.options = action.payload.options;
        break;
      }

      case GroupTypes.CLOSE_JOIN_GROUP_DIALOG: {
        draft.open = false;
        draft.type = null;
        draft.initialStep = undefined;
        draft.options = undefined;
        break;
      }

      case UserTypes.START_POST_USER: {
        draft.isLoading = true;
        break;
      }

      case UserTypes.SUCCEED_POST_USER:
      case UserTypes.FAILED_POST_USER: {
        draft.isLoading = false;
        break;
      }

      case UserTypes.START_GET_PARENT_MOIM_USER_DATA: {
        draft.isGetParentMoimUserLoading = true;
        break;
      }

      case UserTypes.SUCCEEDED_GET_PARENT_MOIM_USER_DATA:
      case UserTypes.FAILED_GET_PARENT_MOIM_USER_DATA: {
        draft.isGetParentMoimUserLoading = false;
        break;
      }
    }
  });
