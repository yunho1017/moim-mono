import { produce } from "immer";
import { AllActions } from "app/actions";
import { EntityTypes, FileUploadTypes } from "app/actions/types";

export const INITIAL_STATE: Moim.Upload.INormalizedFileInfoData = {};

export function reducer(state = INITIAL_STATE, action: AllActions) {
  return produce(state, draft => {
    switch (action.type) {
      case FileUploadTypes.SET_FILE_UPLOAD_STATUS:
      case EntityTypes.ADD_ENTITY: {
        if (action.payload.files) {
          Object.entries(action.payload.files).forEach(([key, value]) => {
            draft[key] = value;
          });
        }
        break;
      }

      case FileUploadTypes.DELETE_FILE: {
        const targetItem = draft[action.payload.fileId];
        if (targetItem && targetItem.uploadTimerId) {
          clearTimeout(targetItem.uploadTimerId);
        }
        delete draft[action.payload.fileId];

        break;
      }

      case FileUploadTypes.FAILED_FILE_UPLOAD: {
        if (action.payload.fileId) {
          draft[action.payload.fileId].status.name = "FAILED";
        }
        break;
      }

      default: {
        break;
      }
    }
  });
}
