import { CancelToken } from "axios";
import { makeErrorFromCancelToken } from "common/helpers/mockingCancelToken";
import { RAW } from "app/__mocks__";

export default class FileAPI {
  public async getFileUploadQueue(params: {
    title: string;
    name: string;
    cancelToken?: CancelToken;
  }) {
    if (params.cancelToken?.reason) {
      throw makeErrorFromCancelToken(params.cancelToken);
    }

    return RAW.FILE_UPLOAD_QUEUE;
  }

  public async getFileUploadingStatus(params: {
    placeId: Moim.Id;
    cancelToken?: CancelToken;
  }) {
    if (params.cancelToken?.reason) {
      throw makeErrorFromCancelToken(params.cancelToken);
    }

    if (params.placeId === "queue") {
      return RAW.FILE_UPLOAD_STATUS_QUEUED;
    }

    return RAW.FILE_UPLOAD_STATUS_AVAILABLE;
  }

  public async uploadFileAndGetId(params: {
    file: File;
    title: string;
    name: string;
    cancelToken?: CancelToken;
  }) {
    if (params.cancelToken?.reason) {
      throw makeErrorFromCancelToken(params.cancelToken);
    }

    return {
      fileId: RAW.FILE_UPLOAD_STATUS_QUEUED.data.id,
    };
  }

  public async getFileBatch(params: {
    files: string[];
    cancelToken?: CancelToken;
  }): Promise<Moim.IPaginatedListResponse<Moim.Upload.IFileInfo>> {
    if (params.cancelToken?.reason) {
      throw makeErrorFromCancelToken(params.cancelToken);
    }

    return RAW.FILE_BATCH;
  }
}
