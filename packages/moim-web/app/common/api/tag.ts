import { CancelToken } from "axios";
import { MoimBaseAPI } from "common/api/base";

export default class TagAPI extends MoimBaseAPI {
  public async getTags(params: {
    limit?: number;
    after?: string;
    cancelToken?: CancelToken;
  }): Promise<Moim.IPaginatedListResponse<Moim.Tag.ITag>> {
    const { limit = 30, cancelToken, after } = params;
    const groupId = this.getCurrentGroupId();
    return (
      await this.get(
        `/groups/${groupId}/tags`,
        { limit, after },
        { cancelToken },
      )
    ).data;
  }

  public async batchTags(
    params: Moim.Tag.IBatchTagsRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.Tag.IBatchTagsResponseBody> {
    const { tags } = params;
    return (await this.post(`/tags/_batch`, { tags }, { cancelToken })).data;
  }

  public async createTag(
    params: {
      name: string;
      isMenu: boolean;
      isAll: boolean;
    },
    cancelToken: CancelToken,
  ): Promise<Moim.ISingleItemResponse<Moim.Tag.ITag>> {
    const groupId = this.getCurrentGroupId();
    return (
      await this.post(
        `/groups/${groupId}/tags`,
        { tag: params },
        { cancelToken },
      )
    ).data;
  }

  public async updateTagData(
    params: {
      tagId: Moim.Id;
      topic?: string;
      purpose?: string;
      name?: string;
      priority?: number;
    },
    cancelToken: CancelToken,
  ): Promise<Moim.ISingleItemResponse<Moim.Tag.ITag>> {
    const { tagId, ...rest } = params;
    return (await this.put(`/tags/${tagId}`, { tag: rest }, { cancelToken }))
      .data;
  }

  public async registerSubGroupsToTag(
    params: { tagId: Moim.Id; subgroupIds: Moim.Id[] },
    cancelToken: CancelToken,
  ): Promise<Moim.ISuccessResponse> {
    const { tagId, subgroupIds } = params;
    return (
      await this.post(
        `/tags/${tagId}/subgroups/_batch`,
        { subgroups: subgroupIds },
        { cancelToken },
      )
    ).data;
  }

  public async unregisterSubGroupsToTag(
    params: { tagId: Moim.Id; subgroupIds: Moim.Id[] },
    cancelToken: CancelToken,
  ): Promise<Moim.ISuccessResponse> {
    const { tagId, subgroupIds } = params;
    return (
      await this.delete(`/tags/${tagId}/subgroups/_batch`, undefined, {
        cancelToken,
        data: { subgroups: subgroupIds },
      })
    ).data;
  }

  public async getChildGroupsFromTags(
    params: {
      tags?: Moim.Id[];
      paging?: Moim.IPaging;
      sort?: Moim.Group.SortOptionSortType;
      order?: Moim.Group.SortOptionOrderType;
    },
    cancelToken: CancelToken,
  ): Promise<Moim.IPaginatedListResponse<Moim.Id>> {
    const groupId = this.getCurrentGroupId();
    const { paging, ...rest } = params;

    return (
      await this.get(
        `/groups/${groupId}/subgroups`,
        { ...rest, ...paging, onlyIds: true },
        { cancelToken },
      )
    ).data;
  }
}
