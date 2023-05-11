import { CancelToken } from "axios";
import { FileUploadTypes } from "app/actions/types";
import { ActionUnion } from "app/actions/helpers";
import { ThunkPromiseResult } from "app/store";
import { fileSingleItemNormalizer } from "app/models";
import { batchFileData } from "common/helpers/batchService";
import { loadEntities } from "../entity";

const POLLING_INTERVAL = 1000;
const POLLING_MAX_RETRIES = 1800; // almost 30min.

function createAction<T extends { type: FileUploadTypes }>(d: T): T {
  return d;
}

export const ActionCreators = {
  startFileUpload: () =>
    createAction({
      type: FileUploadTypes.START_FILE_UPLOAD,
    }),

  setFileUploadStatus: (entities: Partial<Moim.Entity.INormalizedData>) =>
    createAction({
      type: FileUploadTypes.SET_FILE_UPLOAD_STATUS,
      payload: entities,
    }),

  endFileUpload: () =>
    createAction({
      type: FileUploadTypes.END_FILE_UPLOAD,
    }),
  failedFileUpload: (fileId?: Moim.Id) =>
    createAction({
      type: FileUploadTypes.FAILED_FILE_UPLOAD,
      payload: {
        fileId,
      },
    }),
  deleteFile: (fileId: Moim.Id) =>
    createAction({
      type: FileUploadTypes.DELETE_FILE,
      payload: {
        fileId,
      },
    }),
};

export type Actions = ActionUnion<typeof ActionCreators>;

export function getFileBatch(ids: Moim.Id[]): ThunkPromiseResult {
  return async dispatch => {
    batchFileData(ids).then(response => {
      dispatch(loadEntities(response));
    });
  };
}

export function fileUpload(
  params: {
    title: string;
    name: string;
    cancelToken: CancelToken;
    file: File;
  },
  getFileIdListener?: (fileId: Moim.Id) => void,
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    const api = apiSelector(getState(), dispatch);
    dispatch(ActionCreators.startFileUpload());

    try {
      const { fileId } = await api.file.uploadFileAndGetId(params);
      getFileIdListener?.(fileId);
      dispatch(pollProcess(fileId, params.cancelToken));
    } catch (err) {
      dispatch(ActionCreators.failedFileUpload());
    } finally {
      dispatch(ActionCreators.endFileUpload());
    }

    return;
  };
}

export function pollProcess(
  fileId: Moim.Id,
  cancelToken: CancelToken,
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    let retries = 0;
    const api = apiSelector(getState(), dispatch);
    return new Promise((resolve, reject) => {
      const task = async () => {
        if (retries++ > POLLING_MAX_RETRIES) {
          dispatch(ActionCreators.failedFileUpload(fileId));
          return;
        }

        try {
          const response = await api.file.getFileUploadingStatus({
            fileId,
            cancelToken,
          });
          let timerId: NodeJS.Timeout | undefined;

          switch (response.data.status.name) {
            case "PROCESSING":
            case "QUEUED":
            case "TRANSFERING": {
              timerId = setTimeout(task, POLLING_INTERVAL);
              break;
            }

            case "WAITING_FOR_UPLOAD": {
              retries = 0;
              timerId = setTimeout(task, POLLING_INTERVAL);
              break;
            }
            case "AVAILABLE": {
              resolve();
              break;
            }
            case "FAILED":
            default: {
              dispatch(ActionCreators.failedFileUpload(fileId));
              reject();
              break;
            }
          }

          const fileStatus = fileSingleItemNormalizer({
            data: {
              ...response.data,
              uploadTimerId: timerId,
            },
          });
          dispatch(ActionCreators.setFileUploadStatus(fileStatus.entities));
        } catch (err) {
          dispatch(ActionCreators.failedFileUpload(fileId));
          reject(err);
        }
      };
      task();
    });
  };
}
