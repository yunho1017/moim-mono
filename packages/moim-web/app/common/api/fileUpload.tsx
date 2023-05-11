import axios, { CancelToken } from "axios";
import { MoimBaseAPI } from "common/api/base";

export default class FileAPI extends MoimBaseAPI {
  public async getFileUploadQueue(params: {
    title: string;
    name: string;
    cancelToken?: CancelToken;
  }): Promise<Moim.ISingleItemResponse<Moim.Upload.IQueueInfo>> {
    const { cancelToken, ...rest } = params;
    const groupId = this.getCurrentGroupId();

    return (
      await this.post(
        `/groups/${groupId}/files`,
        { file: rest },
        { cancelToken },
      )
    ).data;
  }

  public async getFileUploadingStatus(params: {
    fileId: Moim.Id;
    cancelToken?: CancelToken;
  }): Promise<
    Moim.ISingleItemResponse<
      Moim.Upload.IUploadStatusInfo | Moim.Upload.IFileInfo
    >
  > {
    const { fileId, cancelToken } = params;

    return (await this.get(`/files/${fileId}`, {}, { cancelToken })).data;
  }

  public async uploadFileAndGetId(params: {
    file: File;
    title: string;
    name: string;
    cancelToken?: CancelToken;
  }): Promise<{ fileId: Moim.Id }> {
    const { file, ...rest } = params;
    const response = (await this.getFileUploadQueue(rest)).data;

    const formData = new FormData();
    const url = response.upload.url;
    const fields = response.upload.fields;
    for (const key in fields) {
      if (fields.hasOwnProperty(key)) {
        formData.append(key, fields[key]);
      }
    }
    formData.append("file", file);
    axios.post(url, formData, { cancelToken: params.cancelToken });

    return {
      fileId: response.id,
    };
  }

  public async getFileBatch(params: {
    files: string[];
    cancelToken?: CancelToken;
  }): Promise<Moim.IPaginatedListResponse<Moim.Upload.IFileInfo>> {
    const { files, cancelToken } = params;

    return (await this.post("/files/_batch", { files }, { cancelToken })).data;
  }
}
