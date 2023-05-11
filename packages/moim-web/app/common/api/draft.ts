import { CancelToken } from "axios";
import { MoimBaseAPI } from "common/api/base";

export default class DraftAPI extends MoimBaseAPI {
  public async saveDraft(params: {
    channelId: Moim.Id;
    content: Moim.Blockit.Blocks[];
    title?: string;
  }): Promise<Moim.ISingleItemResponse<Moim.Forum.IThread>> {
    const { channelId, ...rest } = params;
    return (
      await this.post(`/forums/${channelId}/threads/draft`, {
        threadDraft: {
          ...rest,
        },
      })
    ).data;
  }

  public async updateDraft(params: {
    channelId: Moim.Id;
    threadId: Moim.Id;
    content: Moim.Blockit.Blocks[];
    title?: string;
  }): Promise<Moim.ISingleItemResponse<Moim.Forum.IThread>> {
    const { channelId, threadId, ...rest } = params;
    return (
      await this.put(`/forums/${channelId}/threads/draft/${threadId}`, {
        threadDraft: {
          ...rest,
        },
      })
    ).data;
  }

  public async deleteDraft(params: {
    channelId: Moim.Id;
    threadId: Moim.Id;
  }): Promise<Moim.ISingleItemResponse<Moim.ISuccessResponse>> {
    const { channelId, threadId } = params;
    return (await this.delete(`/forums/${channelId}/threads/draft/${threadId}`))
      .data;
  }

  public async getDraftList(params: {
    cancelToken: CancelToken;
    paging?: Moim.IPaging;
  }): Promise<Moim.IPaginatedListResponse<Moim.Forum.IThread>> {
    return (
      await this.get(
        "/me/threads/draft",
        {
          ...params.paging,
        },
        {
          cancelToken: params.cancelToken,
        },
      )
    ).data;
  }

  public async getDraftData(params: {
    channelId: Moim.Id;
    threadId: Moim.Id;
    cancelToken?: CancelToken;
  }): Promise<Moim.ISingleItemResponse<Moim.Forum.IThread>> {
    return (
      await this.get(
        `/forums/${params.channelId}/threads/draft/${params.threadId}`,
        undefined,
        {
          cancelToken: params.cancelToken,
        },
      )
    ).data;
  }

  public async deleteAllDraft(): Promise<
    Moim.ISingleItemResponse<Moim.ISuccessResponse>
  > {
    return (await this.delete(`/me/threads/draft`)).data;
  }

  public async getAllDraftCount(): Promise<
    Moim.ISingleItemResponse<{ draft_amount: number }>
  > {
    return (await this.get("/me/threads/draft/amount")).data;
  }
}
