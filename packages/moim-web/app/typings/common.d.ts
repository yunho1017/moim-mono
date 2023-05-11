type Writeable<T> = { -readonly [P in keyof T]-?: T[P] };
type SubPartial<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
type PickValue<T, K> = T extends { [key: string]: any }
  ? K extends keyof T
    ? T[K]
    : never
  : never;

declare namespace Moim {
  type Id = string;

  type ImageScaleType = "xs" | "sm" | "md" | "lg" | "xl";

  interface ISuccessResponse {
    success: boolean;
  }

  interface ISingleItemResponse<T> {
    data: T;
  }

  interface IListResponse<T> {
    data: T[];
  }

  interface IIndexedPagingList<T> {
    items: T[];
    currentIndex: number;
    total: number;
  }

  type PagingValue = string | null;
  type IPaging = Readonly<{
    before?: PagingValue;
    after?: PagingValue;
    total?: number;
    limit?: number;
  }>;

  interface IPaginatedListResponse<T> extends IListResponse<T> {
    paging: IPaging;
  }

  interface IPlainPagingListResponse<T> extends IListResponse<T>, IPaging {}

  type BetweenListResponse<
    T,
    V = T extends { data: (infer D)[] } ? D : unknown
  > = T extends { paging: IPaging }
    ? IPaginatedListResponse<V>
    : IListResponse<V>;

  interface IErrorResponse {
    code: string;
    id?: string;
    message?: string;
    metadata?: { [key: string]: any };
  }

  type INormalizedEntities<T> = Record<Moim.Id, T>;

  interface IImageIcon {
    type: "image";
    data: {
      url: string;
    };
  }

  interface ITextIcon {
    type: "text";
    data: {
      text: string; // Single character, Emoji can be used too
      color: string; // hexadecimal text color with alpha (e.g. #AABBCCFF)
      bg_color: string; // hexadecimal background color with alpha (e.g. #AABBCCFF)
    };
  }

  type IIcon = IImageIcon | ITextIcon;

  interface IColorBanner {
    type: "color";
    data: {
      color: string;
    };
  }

  interface IImageBanner {
    type: "image";
    data: {
      url: string;
    };
  }

  type IBanner = IColorBanner | IImageBanner;

  interface IFavicon {
    size: number;
    rel: string;
    url: string;
  }

  interface ICustomPostMessage<T = any> {
    type: string;
    data: T;
  }

  interface IMoimOAuthResponse {
    success: boolean;
    close: boolean;
    data: IMoimOAuthResponseData;
  }

  interface IMoimOAuthResponseData {
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token: string;
    scope?: string;
  }

  type AuthenticationProvider = "cryptobadge" | "moim";

  interface IAuthentication {
    provider?: AuthenticationProvider;
    group: Moim.Id;
    token: string;
    refreshToken?: string;
  }

  interface ITokenAndUserResponse {
    token: string;
    user: User.IOriginalUserDatum;
    isParentFallback: boolean;
  }

  interface IClientIdResponse {
    client_id: string;
  }

  type MatchParamKeys =
    | "sectionId"
    | "categoryIndex"
    | "cardId"
    | "questionId"
    | "collection"
    | "answerId"
    | "commentId"
    | "replyId"
    | "messageId"
    | "lang"
    | "signType"
    | "username"
    | "interest"
    | "tab"
    | "action"
    | "talkId"
    | "label"
    | "deskMenu"
    | "id"
    | "section"
    | "deskCouncilMenu"
    | "electionId"
    | "certificationId"
    | "badgeId"
    | "generation"
    | "applicationId"
    | "market_channel"
    | "threadId"
    | "categoryId"
    | "channelId"
    | "forumId"
    | "panelRouteUrl"
    | "userId"
    | "forumId"
    | "threadId"
    | "conversationId"
    | "positionId"
    | "tag"
    | "directMessageId"
    | "focusedId"
    | "hash"
    | "query"
    | "viewId"
    | "meetingId"
    | "postTemplateId"
    | "campaignId"
    | "executionId"
    | "replyId"
    | "postId"
    | "nftItemId"
    | "contractId"
    | "scheduleId"
    | "treasuryId"
    | "coinId"
    | "communityId"
    | "certificateId"
    | "groupId"
    | "badgeId"
    | "tokenId";

  type IMatchParams = Partial<Record<MatchParamKeys, string>>;

  type IHistoryState = Partial<{
    modal: boolean;
    fromInterest: string;
    answer: true;
    index: number;
  }>;

  interface CommonActionState {
    loading: boolean;
    id?: Moim.Id;
    error?: Moim.IErrorResponse;
  }

  type MetaTag = Partial<{
    name: string;
    property: string;
    content: string;
  }>;

  type NotificationStatusType = "enable" | "mute" | "nothing";

  interface NotificationEnabled {
    web: boolean;
    mobile: boolean;
    email: boolean;
  }

  interface INotificationDetailSetting<T> {
    appointment: T;
    commentFollowingPost: T;
    commentPost: T;
    directMessage: T;
    likeComment: T;
    likePost: T;
    mention: T;
    newMessage: T;
    newPost: T;

    // commerce only
    like1DepthProductThread: T;
    new2DepthThread: T;
    like2DepthProductThread: T;
    new2DepthThreadOnFollowing: T;
    mentionOn1DepthThread: T;
    mentionOn2DepthThread: T;
  }

  interface INotificationItem<T> {
    allowed: T;
    detailed: INotificationDetailSetting<T>;
  }

  type OrderType = "asc" | "desc";

  interface IMoimStatusConfig {
    type: "withPeriod" | "withoutPeriod" | "none";
    hideTimer?: boolean;
  }

  interface IImage {
    url: string;
    fileId?: Id;
    width?: number;
    height?: number;
    srcSet?: string;
    blurhash?: string;
    blur_hash?: string;
    fallbackSrc?: string;
  }

  interface INextAction {
    when: "write-post";
    todo: {
      type: "go-to";
      payload: {
        url: string;
        withAlert: boolean;
      };
    };
  }
}
