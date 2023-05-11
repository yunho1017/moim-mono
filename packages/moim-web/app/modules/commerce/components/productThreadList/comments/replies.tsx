import * as React from "react";
import CommentReplyItem from "./commentItem";
import { ReplyItemContainer } from "./styled";
import ThreadReplies, { IRefHandler } from "../common/threadReplies";

export { IRefHandler };

interface IProps {
  comment: Moim.Forum.IThread;
  onClickMoreButton(): void;
}

const showMoreTextKey = {
  after: "product_show_comments_button_replies_more",
  before: "product_show_comments_button_replies_more_before",
  unfolded: "button_more_n_replies",
};

const Replies = React.forwardRef<IRefHandler, IProps>(
  ({ comment, onClickMoreButton }, ref) => {
    const renderReply = React.useCallback((item: Moim.Forum.IThread) => {
      return (
        <ReplyItemContainer key={`comment_${item.id}`}>
          <CommentReplyItem type="comment-reply" comment={item} />
        </ReplyItemContainer>
      );
    }, []);

    return (
      <ThreadReplies
        ref={ref}
        threadType="productCommentReply"
        threadId={comment.id}
        totalCount={comment.replies_count ?? 0}
        showMoreTextKey={showMoreTextKey}
        onClickMoreButton={onClickMoreButton}
        renderReply={renderReply}
      />
    );
  },
);

export default Replies;
