import produce from "immer";
import { AllActions } from "app/actions";
import { MeTypes } from "app/actions/types";

export interface IProfileEditorState {
  open: boolean;
  isUpdateLoading: boolean;
  isUpdateFailed: boolean;
  isAvatarUploading: boolean;
  isAvatarUploadFailed: boolean;
}

export const INITIAL_STATE: IProfileEditorState = {
  open: false,
  isUpdateLoading: false,
  isUpdateFailed: false,
  isAvatarUploading: false,
  isAvatarUploadFailed: false,
};

export function reducer(state = INITIAL_STATE, action: AllActions) {
  return produce(state, draft => {
    switch (action.type) {
      case MeTypes.OPEN_EDIT_MY_PROFILE: {
        draft.open = true;
        break;
      }

      case MeTypes.CLOSE_EDIT_MY_PROFILE: {
        return INITIAL_STATE;
      }

      case MeTypes.START_CHANGE_MY_PROFILE: {
        draft.isUpdateLoading = true;
        draft.isUpdateFailed = false;
        break;
      }

      case MeTypes.SUCCEEDED_CHANGE_MY_PROFILE: {
        draft.isUpdateLoading = false;
        draft.isUpdateFailed = false;
        break;
      }

      case MeTypes.FAILED_CHANGE_MY_PROFILE: {
        draft.isUpdateLoading = false;
        draft.isUpdateFailed = true;
        break;
      }

      case MeTypes.START_UPDATE_AVATAR: {
        draft.isAvatarUploading = true;
        draft.isAvatarUploadFailed = false;
        break;
      }

      case MeTypes.SUCCEEDED_UPDATE_AVATAR: {
        draft.isAvatarUploading = false;
        draft.isAvatarUploadFailed = false;
        break;
      }

      case MeTypes.FAILED_UPDATE_AVATAR: {
        draft.isAvatarUploading = false;
        draft.isAvatarUploadFailed = true;
        break;
      }
    }
  });
}
