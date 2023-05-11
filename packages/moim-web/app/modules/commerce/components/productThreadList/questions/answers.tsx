import React from "react";

import { AnswerItem } from "./questionItem";
import ThreadReplies, { IRefHandler } from "../common/threadReplies";

export { IRefHandler };

interface IProps {
  question: Moim.Forum.IThread;
  onClickMoreButton(): void;
}

const showMoreTextKey = {
  before: "product_show_qna_button_comment_more_before",
  after: "product_show_qna_button_comment_more",
  unfolded: "product_show_qna_button_comment_more_unfolded",
};

const Answers = React.forwardRef<IRefHandler, IProps>(
  ({ question, onClickMoreButton }, ref) => {
    const renderReply = React.useCallback(
      (
        item: Moim.Forum.IThread<
          | Moim.Forum.IProductQuestionThreadMeta
          | Moim.Forum.IProductQuestionReplyThreadMeta
        >,
      ) => {
        return (
          <AnswerItem key={`answer_${item.id}`} type="answer" question={item} />
        );
      },
      [],
    );

    return (
      <ThreadReplies
        ref={ref}
        threadType="productQuestionReply"
        threadId={question.id}
        totalCount={question.replies_count ?? 0}
        showMoreTextKey={showMoreTextKey}
        onClickMoreButton={onClickMoreButton}
        renderReply={renderReply}
      />
    );
  },
);

export default Answers;
