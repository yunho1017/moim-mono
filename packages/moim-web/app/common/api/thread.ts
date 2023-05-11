import { CancelToken } from "axios";
import { MoimBaseAPI } from "common/api/base";

export default class ThreadAPI extends MoimBaseAPI {
  public async postThread(
    parentId: Moim.Id,
    threadId: Moim.Id,
    params: {
      type: Moim.Forum.THREAD_TYPE;
      meta?: Record<string, any>;
      title?: string;
      content: Moim.Blockit.Blocks[];
      rate?: number;
      id?: Moim.Id; // for, executionThread only
    },
    cancelToken: CancelToken,
  ): Promise<Moim.ISingleItemResponse<Moim.Forum.IThread>> {
    return (
      await this.post(
        `/forums/${parentId}/threads/${threadId}/replies`,
        {
          reply: params,
        },
        { cancelToken },
      )
    ).data;
  }

  /**
   * NOTE: 위 postThread의 Endpoint를 아래와 같이 변경해야하지만, QA일정으로 인해 신고기능에서만 아래 액션을 사용하도록 변경합니다.
   */
  public async postThreadForReport(
    threadId: Moim.Id,
    params: {
      type: Moim.Forum.THREAD_TYPE;
      meta?: Record<string, any>;
      title?: string;
      content: Moim.Blockit.Blocks[];
      rate?: number;
      id?: Moim.Id; // for, executionThread only
    },
    cancelToken: CancelToken,
  ): Promise<Moim.ISingleItemResponse<Moim.Forum.IThread>> {
    return (
      await this.post(
        `/threads`,
        {
          thread: {
            ...params,
            parentId: threadId,
          },
        },
        { cancelToken },
      )
    ).data;
  }

  public async getContentGroupData(
    id: Moim.Id,
    cancelToken?: CancelToken,
  ): Promise<Moim.ISingleItemResponse<Moim.ContentsGroup.IContentsGroupData>> {
    const groupId = this.getCurrentGroupId();
    return (
      await this.get(`/groups/${groupId}/contents_groups/${id}`, undefined, {
        cancelToken,
      })
    ).data;
  }

  public async getContentGroupThreads(
    id: Moim.Id,
    limit: number = 20,
    cancelToken?: CancelToken,
    paging?: { from?: string; after?: string },
  ): Promise<
    Moim.IPaginatedListResponse<Moim.ContentsGroup.IContentsGroupThread>
  > {
    const groupId = this.getCurrentGroupId();
    return (
      await this.post(
        `/groups/${groupId}/contents_groups/${id}/threads`,
        {
          contentsGroup: {
            limit,
            ...paging,
          },
        },
        { cancelToken },
      )
    ).data;
  }

  public async getContentGroupPreview(
    contentsGroup: {
      query: Moim.ContentsGroup.IQuery;
      limit: number;
    },
    cancelToken?: CancelToken,
  ): Promise<Moim.IPaginatedListResponse<Moim.Forum.IThread>> {
    const groupId = this.getCurrentGroupId();
    return (
      await this.post(
        `/groups/${groupId}/contents_groups/preview`,
        {
          contentsGroup,
        },
        { cancelToken },
      )
    ).data;
  }
}
