/* eslint-disable no-underscore-dangle */
import ITracker from "./ITracker";
import * as EnvChecker from "../envChecker";
import GoogleTracker from "./trackers/googleTracker";
import AmplitudeTracker from "./trackers/amplitudeTracker";
import GoogleTagTracker from "./trackers/googleTagTracker";
import GoogleTagManagerTracker from "./trackers/googleTagManagerTracker";
import {
  FIREBASE_PROD_TRACKING_ID,
  FIREBASE_STAGE_TRACKING_ID,
} from "../firebase";
import Cookies from "js-cookie";
import MoimTracker from "./trackers/moimTracker";

class Analytics {
  private static instance: Analytics;
  private trackerList: ITracker[] = [];

  public static getInstance() {
    return this.instance ?? (this.instance = new Analytics());
  }

  public init(
    analyticsIds: { google?: string; amplitude?: string; tagManager?: string },
    group: { id: string; name: string },
    userId?: string,
  ) {
    this.trackerList = [new MoimTracker(group, userId)];

    if (analyticsIds.tagManager) {
      this.trackerList.push(
        new GoogleTagManagerTracker(analyticsIds.tagManager, group, userId),
      );
    }

    const googleTagIds = [
      EnvChecker.isProd()
        ? FIREBASE_PROD_TRACKING_ID
        : FIREBASE_STAGE_TRACKING_ID,
    ];

    if (analyticsIds.google) {
      if (analyticsIds.google.startsWith("G-")) {
        googleTagIds.push(analyticsIds.google);
      }

      if (analyticsIds.google.startsWith("UA-")) {
        this.trackerList.push(
          new GoogleTracker(analyticsIds.google, group, userId),
        );
      }
    }

    this.trackerList.push(new GoogleTagTracker(googleTagIds, group, userId));

    if (analyticsIds.amplitude) {
      this.trackerList.push(
        new AmplitudeTracker(analyticsIds.amplitude, group, userId),
      );
    }
  }

  public screenView(screenName: string, path: string) {
    this.trackerList.forEach(tracker => {
      tracker.screenView(screenName, path);
    });
  }

  public setUser(userId: string) {
    this.trackerList.forEach(tracker => {
      tracker.identifyUser(userId);
    });
  }

  public signUpUser(userId: string) {
    this.trackerList.forEach(tracker => {
      tracker.signUpUser(userId);
      tracker.identifyUser(userId);
    });
  }

  public joinGroup(groupId: string, userId: string) {
    this.trackerList.forEach(tracker => {
      tracker.joinGroup(groupId, userId);
      tracker.identifyUser(userId);
    });
  }

  public purchase(params: {
    transactionId: string;
    items: any;
    currency: any;
    value: any;
  }) {
    this.trackerList.forEach(tracker => {
      tracker.purchase(params);
    });
  }

  public decorateLink(url: string) {
    try {
      let decoratedUrl = url;

      for (const tracker of this.trackerList) {
        decoratedUrl = tracker.decorateLink(decoratedUrl);
      }

      const gaDefault = Cookies.get("_ga");
      const parsed = new URL(decoratedUrl);

      if (gaDefault) {
        parsed.searchParams.set("_ga", gaDefault);
      }

      return parsed.toString();

      // eslint-disable-next-line no-empty
    } catch {}

    return url;
  }

  public channelListMemberSelect() {
    this.event({
      category: "channel_list",
      action: "channel_list_members_select",
    });
  }

  public channelListParentLogoSelect() {
    this.event({
      category: "channel_list",
      action: "channel_list_parent_logo_select",
    });
  }

  public channelListMyMoimSelect(params: { targetGroupId: string }) {
    this.event({
      category: "channel_list",
      action: "channel_list_my_moim_select",
      name: params.targetGroupId,
    });
  }

  public channelListChannelSelect(params: { targetChannelId: string }) {
    this.event({
      category: "channel_list",
      action: "channel_list_channel_select",
      name: params.targetChannelId,
    });
  }

  public formListView(params: { forumId: string }) {
    this.event({
      category: "forum_list",
      action: "forum_list_view",
      name: params.forumId,
    });
  }

  public formListPostSelect(params: { forumId: string; postId: string }) {
    this.event({
      category: "forum_list",
      action: "forum_list_post_select",
      name: `${params.forumId}|${params.postId}`,
    });
  }

  public forumListWritePostSelect(params: { forumId: string }) {
    this.event({
      category: "forum_list",
      action: "forum_list_write_post_select",
      name: params.forumId,
    });
  }

  public forumListWritePostSave(params: { forumId: string }) {
    this.event({
      category: "forum_list",
      action: "forum_list_write_post_save",
      name: params.forumId,
    });
  }

  public forumListWritePostPublish(params: { forumId: string }) {
    this.event({
      category: "forum_list",
      action: "forum_list_write_post_publish",
      name: params.forumId,
    });
  }

  public forumPostView(params: {
    forumId: string;
    forumName: string;
    postId: string;
    postTitle: string;
  }) {
    this.event({
      category: "forum_post",
      action: "forum_post_view",
      name: params.postId,
      additionalParams: {
        forum_name: params.forumName,
        post_title: params.postTitle,
      },
    });
  }

  public forumPostReact(params: {
    forumId: string;
    postId: string;
    reactType: "like" | "upvote" | "downvote";
  }) {
    this.event({
      category: "forum_post",
      action: "forum_post_react",
      name: `${params.reactType}|${params.postId}`,
    });
  }

  public forumPostReactCancel(params: {
    forumId: string;
    postId: string;
    reactType: "like" | "upvote" | "downvote";
  }) {
    this.event({
      category: "forum_post",
      action: "forum_post_react_cancel",
      name: `${params.reactType}|${params.postId}`,
    });
  }

  public forumPostCommentWriteSelect(params: {
    forumId: string;
    postId: string;
  }) {
    this.event({
      category: "forum_post_comment",
      action: "forum_post_comment_write_select",
      name: `${params.forumId}|${params.postId}`,
    });
  }

  public forumPostCommentWritePublish(params: {
    forumId: string;
    postId: string;
  }) {
    this.event({
      category: "forum_post_comment",
      action: "forum_post_comment_write_publish",
      name: `${params.forumId}|${params.postId}`,
    });
  }

  public forumPostCommentReact(params: {
    commentId: string;
    reactType: "like" | "upvote" | "downvote";
  }) {
    this.event({
      category: "forum_post_comment",
      action: "forum_post_comment_react",
      name: `${params.reactType}|${params.commentId}`,
    });
  }

  public forumPostCommentReactCancel(params: {
    commentId: string;
    reactType: "like" | "upvote" | "downvote";
  }) {
    this.event({
      category: "forum_post_comment",
      action: "forum_post_comment_react_cancel",
      name: `${params.reactType}|${params.commentId}`,
    });
  }

  public chatShowView(params: { chatId: string }) {
    this.event({
      category: "chat",
      action: "chat_show_view",
      name: params.chatId,
    });
  }

  public chatWriteMessageSelect(params: { chatId: string }) {
    this.event({
      category: "chat",
      action: "chat_write_message_select",
      name: params.chatId,
    });
  }

  public chatWriteMessagePublish(params: { chatId: string }) {
    this.event({
      category: "chat",
      action: "chat_write_message_publish",
      name: params.chatId,
    });
  }

  public blockCarouselSelect(params: { link: string }) {
    this.event({
      category: "block",
      action: "block_carousel_select",
      name: params.link,
    });
  }

  public blockCategoryNavigationSelect(params: { categoryId: string }) {
    this.event({
      category: "block",
      action: "block_category_navigation_select",
      name: params.categoryId,
    });
  }

  public blockProductListPreviewSellerSelect(params: {
    productId: string;
    sellerId: string;
  }) {
    this.event({
      category: "block",
      action: "block_product_list_preview_seller_select",
      name: `${params.sellerId}|${params.productId}`,
    });
  }

  public blockProductListPreviewProductSelect(params: { productId: string }) {
    this.event({
      category: "block",
      action: "block_product_list_preview_product_select",
      name: params.productId,
    });
  }

  public blockProductListPreviewProductReact(params: { productId: string }) {
    this.event({
      category: "block",
      action: "block_product_list_preview_product_react",
      name: params.productId,
    });
  }

  public blockProductListPreviewProductReactCancel(params: {
    productId: string;
  }) {
    this.event({
      category: "block",
      action: "block_product_list_preview_product_react_cancel",
      name: params.productId,
    });
  }

  public blockProductListPreviewProductBuyNow(params: { productId: string }) {
    this.event({
      category: "block",
      action: "block_product_list_preview_product_buy_now",
      name: params.productId,
    });
  }

  public blockProductListPreviewProductAddToCart(params: {
    productId: string;
  }) {
    this.event({
      category: "block",
      action: "block_product_list_preview_product_add_to_cart",
      name: params.productId,
    });
  }

  public blockProductListSellerSelect(params: {
    productId: string;
    sellerId: string;
  }) {
    this.event({
      category: "block",
      action: "block_product_list_seller_select",
      name: `${params.sellerId}|${params.productId}`,
    });
  }

  public blockProductListProductSelect(params: { productId: string }) {
    this.event({
      category: "block",
      action: "block_product_list_preview_product_select",
      name: params.productId,
    });
  }

  public blockProductListProductReact(params: { productId: string }) {
    this.event({
      category: "block",
      action: "block_product_list_product_react",
      name: params.productId,
    });
  }

  public blockProductListProductReactCancel(params: { productId: string }) {
    this.event({
      category: "block",
      action: "block_product_list_product_react_cancel",
      name: params.productId,
    });
  }

  public blockProductListProductBuyNow(params: { productId: string }) {
    this.event({
      category: "block",
      action: "block_product_list_product_buy_now",
      name: params.productId,
    });
  }

  public blockProductListProductAddToCart(params: { productId: string }) {
    this.event({
      category: "block",
      action: "block_product_list_product_add_to_cart",
      name: params.productId,
    });
  }

  public productBuyDialogCartSelect(params: { productId: string }) {
    this.event({
      category: "product",
      action: "product_buy_dialog_cart_select",
      name: params.productId,
    });
  }

  public productBuyDialogBuySelect(params: { productId: string }) {
    this.event({
      category: "product",
      action: "product_buy_dialog_buy_select",
      name: params.productId,
    });
  }

  public productShowView(params: { productId: string }) {
    this.event({
      category: "product",
      action: "product_show_view",
      name: params.productId,
    });
  }

  public productShowProductLike(params: { productId: string }) {
    this.event({
      category: "product",
      action: "product_show_like",
      name: params.productId,
    });
  }

  public productShowProductLikeCancel(params: { productId: string }) {
    this.event({
      category: "product",
      action: "product_show_like_cancel",
      name: params.productId,
    });
  }

  public productShowSellerSelect(params: {
    sellerId: string;
    productId: string;
  }) {
    this.event({
      category: "product",
      action: "product_show_seller_select",
      name: `${params.sellerId}|${params.productId}`,
    });
  }

  public productShowRelatedProductSelect(params: {
    productId: string;
    relatedProductId: string;
  }) {
    this.event({
      category: "product",
      action: "product_show_related_product_select",
      name: `${params.relatedProductId}|${params.productId}`,
    });
  }

  public productShowRelatedProductSellerSelect(params: {
    productId: string;
    sellerId: string;
    relatedProductId: string;
  }) {
    this.event({
      category: "product",
      action: "product_show_related_product_seller_select",
      name: `${params.sellerId}|${params.relatedProductId}|${params.productId}`,
    });
  }

  public productShowRelatedProductAddToCartSelect(params: {
    productId: string;
    relatedProductId: string;
  }) {
    this.event({
      category: "product",
      action: "product_show_related_product_add_to_cart_select",
      name: `${params.relatedProductId}|${params.productId}`,
    });
  }

  public productShowRelatedProductBuyNowSelect(params: {
    productId: string;
    relatedProductId: string;
  }) {
    this.event({
      category: "product",
      action: "product_show_related_product_buy_now_select",
      name: `${params.relatedProductId}|${params.productId}`,
    });
  }

  public reviewShowView(params: {
    reviewId: string;
    productId: string;
    type: string;
  }) {
    this.event({
      category: "review",
      action: "review_show_view",
      name: `${params.productId}|${params.reviewId}`,
    });
  }

  public reviewShowReviewReact(params: {
    reviewId: string;
    productId: string;
    type: string;
  }) {
    this.event({
      category: "review",
      action: "review_show_review_react",
      name: `${params.type}|${params.productId}|${params.reviewId}`,
    });
  }

  public reviewShowReviewReactCancel(params: {
    reviewId: string;
    productId: string;
    type: string;
  }) {
    this.event({
      category: "review",
      action: "review_show_review_react_cancel",
      name: `${params.type}|${params.productId}|${params.reviewId}`,
    });
  }

  public reviewShowWriteReplySelect(params: {
    reviewId: string;
    productId: string;
  }) {
    this.event({
      category: "review",
      action: "review_show_write_reply_select",
      name: `${params.productId}|${params.reviewId}`,
    });
  }

  public reviewShowWriteReplyPublish(params: {
    reviewId: string;
    productId: string;
  }) {
    this.event({
      category: "review",
      action: "review_show_write_reply_publish",
      name: `${params.productId}|${params.reviewId}`,
    });
  }

  public reviewShowReplyReact(params: {
    reviewId: string;
    replyId: string;
    type: string;
  }) {
    this.event({
      category: "review",
      action: "review_show_reply_react",
      name: `${params.type}|${params.reviewId}|${params.replyId}`,
    });
  }

  public reviewShowReplyReactCancel(params: {
    reviewId: string;
    replyId: string;
    type: string;
  }) {
    this.event({
      category: "review",
      action: "review_show_reply_react_cancel",
      name: `${params.type}|${params.reviewId}|${params.replyId}`,
    });
  }

  /**
   *
   * @param params Question
   */
  public questionShowQuestionSelect(params: {
    questionId: string;
    productId: string;
  }) {
    this.event({
      category: "question",
      action: "question_show_question_select",
      name: `${params.productId}|${params.questionId}`,
    });
  }

  public questionShowQuestionReact(params: {
    questionId: string;
    productId: string;
    type: string;
  }) {
    this.event({
      category: "question",
      action: "question_show_question_react",
      name: `${params.type}|${params.productId}|${params.questionId}`,
    });
  }

  public questionShowQuestionReactCancel(params: {
    questionId: string;
    productId: string;
    type: string;
  }) {
    this.event({
      category: "question",
      action: "question_show_question_react_cancel",
      name: `${params.type}|${params.productId}|${params.questionId}`,
    });
  }

  public questionShowWriteQuestionSelect(params: { productId: string }) {
    this.event({
      category: "question",
      action: "question_show_write_question_select",
      name: params.productId,
    });
  }

  public questionShowWriteQuestionPublish(params: { productId: string }) {
    this.event({
      category: "question",
      action: "question_show_write_question_publish",
      name: params.productId,
    });
  }

  public questionShowWriteReplySelect(params: {
    questionId: string;
    productId: string;
  }) {
    this.event({
      category: "question",
      action: "question_show_write_reply_select",
      name: `${params.productId}|${params.questionId}`,
    });
  }

  public questionShowWriteReplyPublish(params: {
    questionId: string;
    productId: string;
  }) {
    this.event({
      category: "question",
      action: "question_show_write_reply_publish",
      name: `${params.productId}|${params.questionId}`,
    });
  }

  public questionShowReplyReact(params: {
    questionId: string;
    replyId: string;
    type: string;
  }) {
    this.event({
      category: "question",
      action: "question_show_reply_react",
      name: `${params.type}|${params.questionId}|${params.replyId}`,
    });
  }

  public questionShowReplyReactCancel(params: {
    questionId: string;
    replyId: string;
    type: string;
  }) {
    this.event({
      category: "question",
      action: "question_show_reply_react_cancel",
      name: `${params.type}|${params.questionId}|${params.replyId}`,
    });
  }

  public shareUrl(params: { url: string; destination: string }) {
    this.event({
      category: "share",
      action: `share_${params.destination}`,
      name: params.url,
    });
  }

  public event(params: {
    category: string;
    action: string;
    name?: string;
    value?: number;
    additionalParams?: Record<string, string>;
  }) {
    const { category, action, name, value, additionalParams } = params;
    this.trackerList.forEach(tracker => {
      tracker.event(category, action, name, value, additionalParams);
    });
  }
}

export { Analytics as AnalyticsClass };
