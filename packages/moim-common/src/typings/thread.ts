export type ListDirectionType = "row" | "column";
export type ListAlginType = "top" | "bottom";
export type PositionType = "top" | "bottom" | "left" | "right";
export type ThumbnailScaleType = "xs" | "sm" | "md" | "lg" | "xl";
export interface IThreadItemBaseProps {
  threadId: string;
  config: Partial<IThreadItemConfig>;

  className?: string;
  stat?: IThreadItemStatProps;
  disableAnonymousSuffix?: boolean;
}

export interface IThreadItemStatProps {
  isUnread?: boolean;
  count?: number;
}

export type THREAD_TYPE =
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

export type THREAD_VIEW_TYPE =
  | "post" // default
  | "compact-conversation"
  | "magazine" // TBD
  | "comment" // TBD
  | "message-bubble"; // TBD

export interface IThread<T = Record<string, any>> {
  type: THREAD_TYPE;
  id: string;
  author: string;
  title: string;
  content: Moim.Blockit.Blocks[];
  vote_score: number;
  up_vote_score: number;
  down_vote_score: number;
  root_id?: string;
  parent_id: string;
  parent_name?: string; // NOTE: draft post only
  edited_at: number;
  deleted: boolean;
  replies_count: number;
  created_at: number;
  updated_at: number;
  vote: Moim.Forum.IVote | null;
  read_at?: string;
  latest: string;
  view_count?: number;
  view_count_member?: number;
  rate?: number;
  stat?: Moim.Channel.IChannelStat;
  preview?: {
    title: string;
    description: string;
    thumbnail?: Moim.Forum.IThumbnail;
    isVideo?: boolean;
  };
  previewBottom?: Moim.Blockit.Blocks[];
  previewRight?: Moim.Blockit.Blocks[];
  reply_sorting_options?: Moim.Forum.IForumSortingOption[];
  is_bookmarked: boolean;

  meta?: T;
}

export interface IDenormalizedThread<T = any> extends IThread<T> {
  user: Moim.User.IUser;
  meta?: T;
}

export interface IDenormalizedThreadWithReplies<T = any>
  extends IDenormalizedThread<T> {
  // replies: Moim.IPaginatedListResponse<IDenormalizedThread>;
}

export interface IProductReviewThreadMeta {
  purchaseItem?: {
    id: string;
    userId: string;
  };
  purchaseItemSnap?: {
    productId: string;
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

export interface IProductQuestionThreadMeta {
  productId: string;
}

export interface IProductQuestionReplyThreadMeta {
  productId: string;
}

export interface IThreadItemConfig extends Moim.Blockit.IPostListShowConfig {}
