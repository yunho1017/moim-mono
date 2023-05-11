import { CancelToken } from "axios";
import { MoimBaseAPI } from "common/api/base";
const DEFAULT_THREAD_REQUEST_COUNT = 20;

export default class ForumAPI extends MoimBaseAPI {
  public async getThreadList(
    params: Moim.Forum.IGetThreadsRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.IPaginatedListResponse<Moim.Forum.IThread>> {
    const groupId = this.getCurrentGroupId();

    return (
      await this.post(
        `/search/threads`,
        {
          query: {
            groupId,
            limit: DEFAULT_THREAD_REQUEST_COUNT,
            ...params,
            order: params.order?.toLocaleLowerCase(),
          },
        },
        { cancelToken },
      )
    ).data;
  }

  public async getSearchThread(
    params: Moim.Forum.IGetSearchThreadsRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.IPaginatedListResponse<Moim.Forum.ISearchedThreadBody>> {
    const groupId = this.getCurrentGroupId();

    return (
      await this.post(
        `/search/threads`,
        {
          query: {
            groupId,
            limit: 30,
            // contentTypes: ["all"], <= default is all
            contentTypes: ["text"],
            ...params,
            order: params.order?.toLocaleLowerCase(),
          },
        },
        { cancelToken },
      )
    ).data;
  }

  public async getCommentList(
    { channelId, threadId, ...params }: Moim.Forum.IGetThreadRepliesRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.Forum.IGetThreadRepliesResponseBody> {
    return (
      await this.get(
        `/forums/${channelId}/threads/${threadId}/replies`,
        {
          ...params,
          order: params.order?.toLowerCase(),
        },
        { cancelToken },
      )
    ).data;
  }

  public async getThread(
    params: Moim.Forum.IGetThreadRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.ISingleItemResponse<Moim.Forum.IThread>> {
    const { parentId, threadId, viewerId } = params;

    return (
      await this.get(
        `/forums/${parentId}/threads/${threadId}`,
        {
          viewerId,
        },
        { cancelToken },
      )
    ).data;
  }

  public async postThread(params: {
    channelId: Moim.Id;
    content: Moim.Blockit.Blocks[];
    cancelToken: CancelToken;
    title?: string;
    draftId?: Moim.Id;
  }): Promise<Moim.ISingleItemResponse<Moim.Forum.IThread>> {
    const { channelId, cancelToken, draftId, ...rest } = params;

    return (
      await this.post(
        `/forums/${channelId}/threads`,
        {
          thread: {
            ...rest,
          },
          draft_id: draftId,
        },
        { cancelToken },
      )
    ).data;
  }

  // NOTE: this API use with commerce Review/Question and their re-replies.
  public async postReply(
    params: Moim.Forum.IPostCommentRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.Forum.IPostCommentResponseBody> {
    const { threadId, channelId, ...rest } = params;

    return (
      await this.post(
        `/forums/${channelId}/threads/${threadId}/replies`,
        {
          reply: {
            ...rest,
          },
        },
        { cancelToken },
      )
    ).data;
  }

  public async editComment(
    request: Moim.Forum.IEditCommentRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.Forum.IEditCommentResponseBody> {
    const { threadId, channelId, replyId, ...rest } = request;

    return (
      await this.put(
        `/forums/${channelId}/threads/${threadId}/replies/${replyId}`,
        {
          reply: {
            ...rest,
          },
        },
        { cancelToken },
      )
    ).data;
  }

  public async updateThread(params: {
    channelId: Moim.Id;
    threadId: Moim.Id;
    title: string;
    content: Moim.Blockit.Blocks[];
    cancelToken: CancelToken;
  }): Promise<Moim.ISingleItemResponse<Moim.Forum.IThread>> {
    const { threadId, channelId, cancelToken, ...rest } = params;

    return (
      await this.put(
        `/forums/${channelId}/threads/${threadId}`,
        {
          thread: {
            ...rest,
          },
        },
        { cancelToken },
      )
    ).data;
  }

  public async deleteThread(params: {
    forumId: Moim.Id;
    threadId: Moim.Id;
  }): Promise<Moim.ISingleItemResponse<Moim.ISuccessResponse>> {
    return (
      await this.delete(`/forums/${params.forumId}/threads/${params.threadId}`)
    ).data;
  }

  public async deleteReply(params: {
    forumId: Moim.Id;
    threadId: Moim.Id;
    replyId: Moim.Id;
  }): Promise<Moim.ISingleItemResponse<Moim.ISuccessResponse>> {
    return (
      await this.delete(
        `/forums/${params.forumId}/threads/${params.threadId}/replies/${params.replyId}`,
      )
    ).data;
  }

  public async voteThread(params: {
    channelId: Moim.Id;
    threadId: Moim.Id;
    type: Moim.Enums.VoteStatus;
    cancelToken: CancelToken;
  }): Promise<Moim.ISingleItemResponse<Moim.Forum.IThread>> {
    const { channelId, threadId, cancelToken, ...rest } = params;

    return (
      await this.put(
        `/forums/${channelId}/threads/${threadId}/votes`,
        { vote: { ...rest } },
        { cancelToken },
      )
    ).data;
  }

  public async voteReply(params: {
    channelId: Moim.Id;
    threadId: Moim.Id;
    replyId: Moim.Id;
    type: Moim.Enums.VoteStatus;
    cancelToken: CancelToken;
  }): Promise<Moim.ISingleItemResponse<Moim.Forum.IThread>> {
    const { channelId, threadId, replyId, cancelToken, ...rest } = params;

    return (
      await this.put(
        `/forums/${channelId}/threads/${threadId}/replies/${replyId}/votes`,
        { vote: { ...rest } },
        { cancelToken },
      )
    ).data;
  }

  public async getThreadVotes(
    request: Moim.Forum.IVotesRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.Forum.IVotesResponseBody> {
    const { channelId, threadId, ...params } = request;
    return (
      await this.get(`/forums/${channelId}/threads/${threadId}/votes`, params, {
        cancelToken,
      })
    ).data;
  }

  public async getComment(
    request: Moim.Forum.IGetReplyRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.Forum.IGetReplyResponseBody> {
    const { channelId, threadId, replyId } = request;
    return (
      await this.get(
        `/forums/${channelId}/threads/${threadId}/replies/${replyId}`,
        {},
        { cancelToken },
      )
    ).data;
  }

  public async getReplyVotes(
    request: Moim.Forum.IVotesRequest & { replyId: Moim.Id },
    cancelToken?: CancelToken,
  ): Promise<Moim.Forum.IVotesResponseBody> {
    const { channelId, threadId, replyId, ...params } = request;
    return (
      await this.get(
        `/forums/${channelId}/threads/${threadId}/replies/${replyId}/votes`,
        params,
        { cancelToken },
      )
    ).data;
  }

  public async getScrap(
    url: string,
    cancelToken: CancelToken,
  ): Promise<
    Moim.ISingleItemResponse<{
      content: Omit<Moim.Blockit.ILinkPreviewBlock, "type">;
      metadata: { cache: string; ttl: number; scraped_at: number };
    }>
  > {
    return (await this.post(`/scrap`, { request: { url } }, { cancelToken }))
      .data;
  }

  public async batchThread(
    request: { threads: Moim.Id[] },
    cancelToken?: CancelToken,
  ): Promise<Moim.IPaginatedListResponse<Moim.Forum.IThread>> {
    return (
      await this.post(
        "/threads/_batch",
        {
          ...request,
        },
        { cancelToken },
      )
    ).data;
  }

  public async postPostTemplate(
    request: Moim.Forum.IPostPostTemplateRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.Forum.IPostPostTemplateResponseBody> {
    const groupId = this.getCurrentGroupId();

    return (
      await this.post(
        `/groups/${groupId}/thread_templates`,
        {
          threadTemplate: {
            ...request,
          },
        },
        { cancelToken },
      )
    ).data;
  }

  public async getPostTemplate(
    cancelToken?: CancelToken,
  ): Promise<Moim.Forum.IGetPostTemplateListResponseBody> {
    const groupId = this.getCurrentGroupId();

    return (
      await this.get(`/groups/${groupId}/thread_templates`, {}, { cancelToken })
    ).data;
  }

  public async updatePostTemplate(
    request: Moim.Forum.IUpdatePostTemplateRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.Forum.IUpdatePostTemplateResponseBody> {
    const { templateId, ...rest } = request;
    const groupId = this.getCurrentGroupId();

    return (
      await this.put(
        `/groups/${groupId}/thread_templates/${templateId}`,
        {
          threadTemplate: {
            ...rest,
          },
        },
        { cancelToken },
      )
    ).data;
  }

  public async deletePostTemplate(
    request: Moim.Forum.IDeletePostTemplateRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.Forum.IDeletePostTemplateResponseBody> {
    const groupId = this.getCurrentGroupId();

    return (
      await this.delete(
        `/groups/${groupId}/thread_templates/${request.templateId}`,
        {},
        { cancelToken },
      )
    ).data;
  }

  public async batchThreadTemplates(
    request: { threadTemplates: Moim.Id[] },
    cancelToken?: CancelToken,
  ): Promise<Moim.IPaginatedListResponse<Moim.Forum.INormalizedPostTemplate>> {
    return (
      await this.post(
        "/thread_templates/_batch",
        {
          ...request,
        },
        { cancelToken },
      )
    ).data;
  }

  public async getThreadShow(
    threadId: Moim.Id,
    cancelToken?: CancelToken,
  ): Promise<Moim.ISingleItemResponse<Moim.Forum.IThread>> {
    return (await this.get(`/threads/${threadId}`, undefined, { cancelToken }))
      .data;
  }
}
