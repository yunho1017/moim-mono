import { CancelToken } from "axios";
import { RAW } from "app/__mocks__";
import { makeErrorFromCancelToken } from "common/helpers/mockingCancelToken";

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class ForumAPI {
  public async getForums(
    _data: {
      limit?: number; // default: 30
      after?: string;
    },
    cancelToken?: CancelToken,
  ) {
    if (cancelToken?.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }

    return {
      data: [RAW.NORMALIZED_CHANNEL],
      paging: {
        after: null,
        before: null,
      },
    };
  }

  public async createForum(
    data: { name: string; priority: number },
    cancelToken?: CancelToken,
  ) {
    const { name, priority } = data;

    if (cancelToken?.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }

    return {
      data: {
        ...RAW.FORUM,
        name,
        priority,
      },
    };
  }

  public async getThreadList(data: {
    channelId: Moim.Id;
    sort: Moim.Forum.ForumSortingOptionSort;
    cancelToken: CancelToken;
    viewerId?: Moim.Id;
    after?: Moim.PagingValue;
    before?: Moim.PagingValue;
    count?: number;
  }): Promise<Moim.IPaginatedListResponse<Moim.Forum.IThread>> {
    const { channelId } = data;

    if (channelId === "forceError") {
      throw new Error("forceError");
    }

    return {
      data: [RAW.THREAD],
      paging: {
        after: null,
        before: null,
      },
    };
  }

  public async getCommentList(data: {
    channelId: Moim.Id;
    threadId: Moim.Id;
    sort: Moim.Forum.ForumSortingOptionSort;
    cancelToken: CancelToken;
    viewerId?: Moim.Id;
    after?: Moim.PagingValue;
    before?: Moim.PagingValue;
    count?: number;
  }): Promise<Moim.IPaginatedListResponse<Moim.Forum.IThread>> {
    const { threadId } = data;

    if (threadId === "forceError") {
      throw new Error("forceError");
    }

    return {
      data: [RAW.THREAD],
      paging: {
        after: null,
        before: null,
      },
    };
  }

  public async getThread(data: {
    parentId: Moim.Id;
    threadId: Moim.Id;
    viewerId?: Moim.Id;
    cancelToken: CancelToken;
  }): Promise<Moim.ISingleItemResponse<Moim.Forum.IThread>> {
    const { parentId } = data;

    if (parentId === "forceError") {
      throw new Error("forceError");
    }

    return {
      data: RAW.THREAD,
    };
  }

  public async postThread(params: {
    channelId: Moim.Id;
    content: Moim.Blockit.Blocks[];
    cancelToken: CancelToken;
    title?: string;
    draftId?: Moim.Id;
  }): Promise<Moim.ISingleItemResponse<Moim.ISuccessResponse>> {
    if (params.channelId === "forceError") {
      throw new Error("forceError");
    } else if (params.channelId === "manualFail") {
      return {
        data: {
          success: false,
        },
      };
    }

    return {
      data: {
        success: true,
      },
    };
  }

  public async postReply(params: {
    channelId: Moim.Id;
    threadId: Moim.Id;
    content: Moim.Blockit.Blocks[];
    cancelToken: CancelToken;
    title?: string;
  }): Promise<Moim.ISingleItemResponse<Moim.ISuccessResponse>> {
    if (params.threadId === "forceError") {
      throw new Error("forceError");
    } else if (params.threadId === "manualFail") {
      return {
        data: {
          success: false,
        },
      };
    }

    return {
      data: {
        success: true,
      },
    };
  }

  public async deleteThread(params: {
    channelId: Moim.Id;
    threadId: Moim.Id;
  }): Promise<Moim.ISingleItemResponse<Moim.ISuccessResponse>> {
    if (params.threadId === "forceError") {
      throw new Error("forceError");
    }

    return {
      data: {
        success: true,
      },
    };
  }

  public async deleteReply(params: {
    channelId: Moim.Id;
    threadId: Moim.Id;
    replyId: Moim.Id;
  }): Promise<Moim.ISingleItemResponse<Moim.ISuccessResponse>> {
    if (params.threadId === "forceError") {
      throw new Error("forceError");
    }

    return {
      data: {
        success: true,
      },
    };
  }

  public async voteThread(params: {
    channelId: Moim.Id;
    threadId: Moim.Id;
    type: Moim.Enums.VoteStatus;
    cancelToken: CancelToken;
  }) {
    if (params.threadId === "forceError") {
      throw new Error("forceError");
    }

    return {
      data: {
        success: true,
      },
    };
  }

  public async voteReply(params: {
    channelId: Moim.Id;
    threadId: Moim.Id;
    replyId: Moim.Id;
    type: Moim.Enums.VoteStatus;
    cancelToken: CancelToken;
  }) {
    if (params.replyId === "forceError") {
      throw new Error("forceError");
    }

    return {
      data: {
        success: true,
      },
    };
  }

  public async getThreadVotes(
    _request: Moim.Forum.IVotesRequest,
    cancelToken?: CancelToken,
  ) {
    if (cancelToken?.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }
    return {
      data: [RAW.THREAD_VOTE],
      paging: {},
    };
  }

  public async editForumName(params: {
    forumId: Moim.Id;
    name: string;
    cancelToken?: CancelToken;
  }): Promise<Moim.ISingleItemResponse<Moim.Forum.INormalizedForum>> {
    const { cancelToken } = params;

    if (cancelToken?.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }

    return {
      data: RAW.NORMALIZED_CHANNEL,
    };
  }

  public async editForumTopic(params: {
    forumId: Moim.Id;
    topic: string;
    cancelToken?: CancelToken;
  }): Promise<Moim.ISingleItemResponse<Moim.Forum.INormalizedForum>> {
    const { cancelToken } = params;

    if (cancelToken?.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }

    return {
      data: RAW.NORMALIZED_CHANNEL,
    };
  }

  public async editForumPurpose(params: {
    forumId: Moim.Id;
    purpose: string;
    cancelToken?: CancelToken;
  }): Promise<Moim.ISingleItemResponse<Moim.Forum.INormalizedForum>> {
    const { cancelToken } = params;

    if (cancelToken?.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }

    return {
      data: RAW.NORMALIZED_CHANNEL,
    };
  }

  public async getScrap(
    _: string,
    cancelToken: CancelToken,
  ): Promise<
    Moim.ISingleItemResponse<{
      content: Omit<Moim.Blockit.ILinkPreviewBlock, "type">;
      metadata: { cache: string; ttl: number; scraped_at: number };
    }>
  > {
    if (cancelToken.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }

    return {
      data: {
        content: RAW.LINK_PREVIEW_BLOCKIT,
        metadata: { cache: "miss", ttl: 604800000, scraped_at: 1614840578547 },
      },
    };
  }

  public async batchThread(
    _request: { threads: Moim.Id[] },
    cancelToken?: CancelToken,
  ): Promise<Moim.IPaginatedListResponse<Moim.Forum.IThread>> {
    if (cancelToken?.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }

    return {
      data: [RAW.THREAD],
      paging: {},
    };
  }
}

export default ForumAPI;
