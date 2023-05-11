import { CancelToken } from "axios";
import { makeErrorFromCancelToken } from "common/helpers/mockingCancelToken";
import { RAW } from "app/__mocks__";

export default class PositionAPI {
  public async getTags(params: {
    limit: number;
    cancelToken: CancelToken;
    after?: string;
  }): Promise<Moim.IPaginatedListResponse<Moim.Tag.ITag>> {
    if (params.cancelToken.reason) {
      throw makeErrorFromCancelToken(params.cancelToken);
    }

    return RAW.TAGS;
  }

  public async createTag(
    _params: {
      name: string;
      isMenu: boolean;
      isAll: boolean;
    },
    cancelToken: CancelToken,
  ): Promise<Moim.ISingleItemResponse<Moim.Tag.ITag>> {
    if (cancelToken.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }

    return {
      data: RAW.TAGS.data[0],
    };
  }

  public async updateTagData(
    _params: {
      tagId: Moim.Id;
      topic?: string;
      purpose?: string;
      name?: string;
      priority?: number;
    },
    cancelToken: CancelToken,
  ): Promise<Moim.ISingleItemResponse<Moim.Tag.ITag>> {
    if (cancelToken.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }

    return {
      data: RAW.TAGS.data[0],
    };
  }

  public async registerSubGroupsToTag(
    _params: { tagId: Moim.Id; subgroupIds: Moim.Id[] },
    cancelToken: CancelToken,
  ): Promise<Moim.ISuccessResponse> {
    if (cancelToken.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }

    return {
      success: true,
    };
  }

  public async unregisterSubGroupsToTag(
    _params: { tagId: Moim.Id; subgroupIds: Moim.Id[] },
    cancelToken: CancelToken,
  ): Promise<Moim.ISuccessResponse> {
    if (cancelToken.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }

    return {
      success: true,
    };
  }
}
