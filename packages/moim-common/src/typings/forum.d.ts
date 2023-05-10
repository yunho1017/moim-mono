declare namespace Moim {
  declare namespace Forum {
    type THREAD_TYPE =
      | "post"
      | "reply"
      | "nestedReply"
      | "product"
      | "productQuestion"
      | "productQuestionReply"
      | "productReview"
      | "productReviewReply"
      | "productComment"
      | "productCommentReply"
      | "campaign"
      | "campaignExecution"
      | "campaignExecutionVote"
      | "report";

    interface INormalizedForum extends Channel.INormalizedCommonChannel {
      type: "forum";
      list_config: IForumListConfig;
    }

    type INormalizedForumData = INormalizedEntities<INormalizedForum>;

    interface IForum extends Omit<INormalizedForum, "group" | "creator"> {
      group: Group.IGroup;
      creator: User.IUser;
    }

    interface IThumbnail {
      title: string;
      id: Id;
      url: string;
      src_set: string;
      url_lg: string;
      url_md: string;
      url_sm: string;
      url_xl: string;
      url_xs: string;
    }

    interface IAnonymousData {
      authorSuffix: {
        ko: string;
        en: string;
      };
      isMine?: boolean;
    }

    interface IThread<T = Record<string, any>> {
      type: THREAD_TYPE;
      id: Id;
      author: Id;
      anonymous_data?: IAnonymousData;
      title: string;
      content: Blockit.Blocks[];
      vote_score: number;
      up_vote_score: number;
      down_vote_score: number;
      root_id?: Id;
      groupId?: Id;
      parent_id: Id;
      parent_name?: string; // NOTE: draft post only
      edited_at: number;
      deleted: boolean;
      replies_count: number;
      created_at: number;
      updated_at: number;
      vote: IVote | null;
      read_at?: string;
      latest: Id;
      view_count?: number;
      view_count_member?: number;
      rate?: number;
      stat?: Channel.IChannelStat;
      preview?: {
        title: string;
        description: string; // 기존 방식
        descriptionPlain?: string; // 백엔드 파싱 방식
        thumbnail?: IThumbnail;
        isVideo?: boolean;
      };
      previewBottom?: Blockit.Blocks[];
      previewRight?: Blockit.Blocks[];
      reply_sorting_options?: IForumSortingOption[];
      is_bookmarked: boolean;

      meta?: T;
    }

    interface IProductReviewThreadMeta {
      purchaseItem?: {
        id: Id;
        userId: Id;
      };
      purchaseItemSnap?: {
        productId: Id;
        productName: string;
        quantity: number; // 구매한 수량
        checkoutPrice: number; // 내 결제 금액
        optionsLabel?: Record<string, Record<string, string>>; // 유저가 선택한 옵션,
        productImage?: {
          web: string;
          mobile: string;
        };
      };
    }

    interface IProductQuestionThreadMeta {
      productId: Id;
    }

    interface IProductQuestionReplyThreadMeta {
      productId: Id;
    }

    type PostReactionType = "up" | "updown";

    interface IForumListConfig {
      column_count: number;
      mobile_column_count: number;
      convertible_column_count: number[];
      mobile_convertible_column_count: number[];
      show_author: boolean;
      show_author_avatar: boolean;
      show_comment_count: boolean;
      show_date: boolean;
      show_reaction: boolean;
      reaction_type: PostReactionType;
      show_thumbnail: boolean;
      show_title: boolean;
      show_text: boolean;
      text_alignment: ForumListConfigTextAlignment;
      thumbnail_config: IForumThumbnailConfig;
      tag_sets: Moim.Id[];
      tag_set_filter_type: ForumListConfigTagSetFilterType;
      view_type?:
        | "post" // default
        | "compact-conversation"
        | "magazine" // TBD
        | "comment" // TBD
        | "message-bubble"; // TBD
    }

    interface IForumShowConfig {
      reaction_type: PostReactionType;
      show_type: Enums.PostShowType;
      show_author: boolean;
      author_config: IForumShowAuthorConfig;
      show_comment_area: boolean;
      show_reaction: boolean;
      show_comment_reaction: boolean;
      comment_reaction_type: PostReactionType;
      show_bookmark: boolean;
      show_date: boolean;
    }
    type ForumShowAuthorConfigPositionType = "bottom" | "top";

    type ForumListConfigTagSetFilterType = "ICON" | "NAVIGATION";
    type ForumListConfigTextAlignment = "CENTER" | "LEFT" | "RIGHT";
    type ForumThumbnailConfigPosition = "left" | "right" | "top" | "bottom";
    interface IForumThumbnailConfig {
      type: "ratio";
      value: string;
      position: "left" | "right" | "top" | "bottom";
    }
    interface IForumShowAuthorConfig {
      position: ForumShowAuthorConfigPositionType;
    }

    type CommentListSortType = "top" | "recent";
    type ForumSortingOptionOrder = "DESC" | "ASC";
    type ForumSortingOptionSort = "createdAt" | "voteScore" | "editedAt";

    interface IForumSortingOption {
      order: ForumSortingOptionOrder;
      sort: ForumSortingOptionSort;
    }
    // add user type
    interface IDenormalizedThread<T = any> extends IThread<T> {
      user: User.IUser;
      meta?: T;
    }

    type INormalizedThreadContent =
      | Blockit.NormalizedBlocks
      | INormalizedThreadPreviewContent;

    interface INormalizedThreadPreviewContent {
      type: "preview";
      files: Id[];
    }

    interface IThreadListFilterOption {
      tagSets?: {
        query: { [key: string]: string[] };
        selectedTags: Moim.Id[];
      };
      searchDateRange?: {
        start: string;
        end: string;
      };
      order?: OrderType;
    }

    interface IVotedUserListDialogState {
      open: boolean;
      threadId: Id;
      channelId?: Id;
      replyId?: Id;
      useTab?: boolean;
      defaultTab?: VotedUserListDialogTabType;
    }
    type VotedUserListDialogTabType = "like" | "dislike";

    interface IForumData {
      currentForumId: Id;
      isLoadingForumList: boolean;
      isLoadingForumShow: Record<Id, boolean>;
      isLoadingToLike: boolean;
      postedCommentIds: Record<Id, Id[]>;
      currentThreadId: string;
      threadVotes: Record<Id, Record<Enums.VoteStatus, IVotesResponseBody>>;
      threadVotesLoading: Record<Id, boolean>;
      votedUserListDialog: IVotedUserListDialogState;
      newPostSnackbar: {
        open: boolean;
        newPostId?: Moim.Id;
      };
      newCommentSnackbar: {
        open: boolean;
        newCommentId?: Moim.Id;
        direction?: "top" | "bottom";
      };
      pinnedPostList: Record<Moim.Id, Moim.Id[]>;
    }

    type INormalizedData = INormalizedEntities<IThread>;

    interface ISimpleVote {
      type: Enums.VoteStatus;
      updated_at: number;
    }

    interface IVote {
      thread_id: Id;
      user_id: Id;
      type: Enums.VoteStatus;
      createdAt: number;
    }

    interface IDenormalizedVote extends IVote {
      user: User.IUser;
    }

    interface IVotesRequestPath {
      channelId: string;
      threadId: string;
    }

    interface IVotesRequestQuery extends IPaging {
      limit?: number; // default: 10
      type: Enums.VoteStatus;
    }

    type IVotesRequest = IVotesRequestPath & IVotesRequestQuery;

    type IVotesResponseBody = IPaginatedListResponse<IVote>;

    interface IGetReplyRequestPath {
      channelId: string;
      threadId: string;
      replyId: string;
    }

    type IGetReplyRequest = IGetReplyRequestPath;

    type IGetReplyResponseBody = ISingleItemResponse<IThread>;

    // GET: /api/forums/{forum_id}/threads/{thread_id}/replies
    interface IGetThreadRepliesRequestPath extends IPaging {
      channelId: Moim.Id;
      threadId: Moim.Id;
      order?: ForumSortingOptionOrder;
      sort?: ForumSortingOptionSort;
      type?: string;
      viewerId?: string;
      inclusive?: boolean;
      limit?: number;
      from?: number;
    }

    type IGetThreadRepliesRequest = IGetThreadRepliesRequestPath;

    type IGetThreadRepliesResponseBody = Moim.IPaginatedListResponse<
      Moim.Forum.IThread
    >;

    // GET: /api/forums/{forum_id}/threads/
    interface IGetThreadsRequestPath {
      channelId: Moim.Id;
    }

    interface IGetThreadsRequestBody extends IPaging {
      sort?: Forum.ForumSortingOptionSort;
      order?: Forum.ForumSortingOptionOrder;
      limit?: number;
      inclusive?: boolean;
      tagSets?: { [key: string]: string[] };
    }

    interface IGetSearchThreadRequest extends IPaging {
      channelId?: Moim.Id;
      type?: THREAD_TYPE[];
      contentType?: SearchContentType[]; // default ["all"]
      filter?: ISearchFilterOption;
      query?: string;
      tagSets?: { [key: string]: string[] };
      sort?: Forum.ForumSortingOptionSort;
      order?: Forum.ForumSortingOptionOrder;
    }

    type IGetThreadsRequest = IGetThreadsRequestPath & IGetThreadsRequestBody;
    type IGetSearchThreadsRequest = IGetSearchThreadRequest;

    type IGetThreadsResponseBody = Moim.IPaginatedListResponse<
      Moim.Forum.IThread
    >;

    // GET: /api/forums/{forum_id}/threads/
    interface IGetThreadRequestPath {
      parentId: string;
      threadId: string;
      viewerId?: string;
    }

    type IGetThreadRequest = IGetThreadRequestPath;

    type IGetThreadsResponseBody = Moim.ISingleItemResponse<Moim.Forum.IThread>;

    // Post: /api/forums/{forum_id}/threads/
    interface IPostCommentRequestPath {
      channelId: string;
      threadId: string;
    }

    interface IPostCommentRequestBody {
      id?: Moim.Id;
      content: Moim.Blockit.Blocks[];
      title?: string;
      restore?: boolean;
      type: THREAD_TYPE;
      rate?: number;
      title?: string;
      meta?: Record<string, any>;
    }

    type IPostCommentRequest = IPostCommentRequestPath &
      IPostCommentRequestBody;

    type IPostCommentResponseBody = ISingleItemResponse<Moim.Forum.IThread>;

    // Put: /api/forums/{forum_id}/threads/
    interface IEditCommentRequestPath {
      channelId: string;
      threadId: string;
      replyId: string;
    }

    interface IEditCommentRequestBody {
      content: Moim.Blockit.Blocks[];
      title?: string;
      restore?: boolean;
      type?: THREAD_TYPE;
      meta?: Record<string, any>;
    }

    type IEditCommentRequest = IEditCommentRequestPath &
      IEditCommentRequestBody;

    type IEditCommentResponseBody = ISingleItemResponse<Moim.Forum.IThread>;

    interface ISearchedThreadContent {
      id: Id;
      title?: string;
      body: {
        texts?: string[]; // 텍스트 블럭에 해당하는 검색어가 있을 경우 반환
        files?: Blockit.IFileBlock[]; // 파일 title에 해당하는 검색어가 있을 경우 반환
      };
      voteScore?: number; // forum channel 설정에 따라 optional. 있으면 값을 뿌려주시면 됩니다
      upVoteScore?: number; // forum channel 설정에 따라 optional. 있으면 값을 뿌려주시면 됩니다
      downVoteScore?: number; // forum channel 설정에 따라 optional. 있으면 값을 뿌려주시면 됩니다
      replies?: number;
      thumbnails?: IThumbnail;
      createdAt: number;
      creator: {
        id: string;
        avatar: string;
        username: string;
        anonymousSuffix?: { ko: string; en: string };
      };
    }

    interface ISearchedThreadBody {
      moimName: string;
      channelName: string;
      channelId: Id;
      content: ISearchedThreadContent;
      url: string; // 해당 자원의 url
      voteScore?: number;
      upVoteScore?: number;
      downVoteScore?: number;
      userVoteType?: Enums.VoteStatus | null;
      parentContent?: ISearchedThreadContent; // 위에 기술된 content와 형식이 같습니다. reply일 경우에만 반환됩니다.
    }

    interface INormalizedPostTemplate {
      id: string;
      groupId: string;
      creatorId: string;
      lastEditorId: string;
      title: string;
      content: Blockit.Blocks[];
      createdAt: number;
      updatedAt: number;
      deletedAt: number;
      channelIds?: Moim.Id[];
    }

    interface IPostTemplate extends INormalizedPostTemplate {
      lastEditor: User.IUser;
      channels: Moim.Channel.SimpleChannelWithoutCategoryType[];
    }

    type IIPostTemplateNormalizedData = INormalizedEntities<
      INormalizedPostTemplate
    >;

    // Post: /api/groups/:group_id/thread_templates
    interface IPostPostTemplateRequestBody {
      title: string;
      channelIds?: Moim.Id[];
      content: Moim.Blockit.Blocks[];
    }

    type IPostPostTemplateRequest = IPostPostTemplateRequestBody;

    type IPostPostTemplateResponseBody = ISingleItemResponse<
      INormalizedPostTemplate
    >;
    // GET: /api/groups/:group_id/thread_templates
    type IGetPostTemplateListResponseBody = Moim.IPaginatedListResponse<
      INormalizedPostTemplate
    >;

    // PUT /api/groups/:group_id/thread_templates/:template_id
    interface IUpdatePostTemplateRequestPath {
      templateId: Id;
    }

    interface IUpdatePostTemplateRequestBody {
      title?: string;
      channelIds?: Moim.Id[];
      content?: Moim.Blockit.Blocks[];
    }

    type IUpdatePostTemplateRequest = IUpdatePostTemplateRequestPath &
      IUpdatePostTemplateRequestBody;

    type IUpdatePostTemplateResponseBody = ISingleItemResponse<
      INormalizedPostTemplate
    >;

    // DELETE /api/groups/:group_id/thread_templates/:template_id
    interface IDeletePostTemplateRequestPath {
      templateId: Id;
    }

    type IDeletePostTemplateRequest = IDeletePostTemplateRequestPath;

    type IDeletePostTemplateResponseBody = ISingleItemResponse<
      ISuccessResponse
    >;
  }
}
