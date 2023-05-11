import * as React from "react";
import { useLocation } from "react-router";
import { useStoreState } from "app/store";
import {
  getProductCommentsSelector,
  getProductQuestionsSelector,
  getProductReviewsSelector,
} from "app/selectors/commerce";
import { MoimURL } from "common/helpers/url";

export default function useHighlightTab({
  productId,
  tabs,
  scrollToTab,
}: {
  productId: string;
  tabs: {
    title: React.ReactNode;
    content: React.ReactNode;
    id: string;
  }[];
  scrollToTab: (tabId: string) => void;
}) {
  const location = useLocation();
  const { hasComment, hasQuestion, hasReview } = useStoreState(state => ({
    hasComment: (getProductCommentsSelector(state, productId)?.total ?? 0) > 0,
    hasQuestion:
      (getProductQuestionsSelector(state, productId)?.total ?? 0) > 0,
    hasReview: (getProductReviewsSelector(state, productId)?.total ?? 0) > 0,
  }));

  React.useEffect(() => {
    if (hasComment) {
      if (
        Boolean(tabs.find(tab => tab.id === "comment")) &&
        (MoimURL.CommerceProductShowComment.isSame(location.pathname) ||
          MoimURL.CommerceProductShowCommentReply.isSame(location.pathname))
      ) {
        scrollToTab("comment");
      }
    }
  }, [hasComment, location.pathname]);
  React.useEffect(() => {
    if (hasQuestion) {
      if (
        Boolean(tabs.find(tab => tab.id === "qna")) &&
        (MoimURL.CommerceProductShowQnA.isSame(location.pathname) ||
          MoimURL.CommerceProductShowQnAReply.isSame(location.pathname))
      ) {
        scrollToTab("qna");
      }
    }
  }, [hasQuestion, location.pathname]);
  React.useEffect(() => {
    if (hasReview) {
      if (
        Boolean(tabs.find(tab => tab.id === "review")) &&
        (MoimURL.CommerceProductShowReview.isSame(location.pathname) ||
          MoimURL.CommerceProductShowReviewReply.isSame(location.pathname))
      ) {
        scrollToTab("review");
      }
    }
  }, [hasReview, location.pathname]);
}
