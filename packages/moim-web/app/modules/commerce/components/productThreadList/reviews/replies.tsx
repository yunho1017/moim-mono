import * as React from "react";
import ReviewReplyItem from "./reviewItem";
import { ReplyItemContainer } from "./styled";
import ThreadReplies, { IRefHandler } from "../common/threadReplies";

export { IRefHandler };

interface IProps {
  review: Moim.Forum.IThread;
  onClickMoreButton(): void;
}

const showMoreTextKey = {
  before: "product_show_reviews_button_comment_more_before",
  after: "product_show_reviews_button_comment_more",
  unfolded: "product_show_reviews_button_comment_more_unfolded",
};

const Replies = React.forwardRef<IRefHandler, IProps>(
  ({ review, onClickMoreButton }, ref) => {
    const renderReply = React.useCallback((item: Moim.Forum.IThread) => {
      return (
        <ReplyItemContainer key={`reply_${item.id}`}>
          <ReviewReplyItem type="review-reply" review={item} />
        </ReplyItemContainer>
      );
    }, []);

    return (
      <ThreadReplies
        ref={ref}
        threadType="productReviewReply"
        threadId={review.id}
        totalCount={review.replies_count ?? 0}
        showMoreTextKey={showMoreTextKey}
        onClickMoreButton={onClickMoreButton}
        renderReply={renderReply}
      />
    );
  },
);

export default Replies;
