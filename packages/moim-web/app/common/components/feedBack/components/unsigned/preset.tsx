import * as React from "react";
import { FormattedMessage } from "react-intl";
import { UnsignedCommentInputFeedback } from "./input";

export function UnsignedFundingReplyInputFeedback() {
  return (
    <UnsignedCommentInputFeedback
      parentFeedbackMessage={
        <FormattedMessage id="non_logged_in_feedback_input_reply" />
      }
      childFeedbackMessage={
        <FormattedMessage id="sub_non_joined_feedback_input_reply" />
      }
    />
  );
}

export function UnsignedProductAnswerInputFeedback() {
  return (
    <UnsignedCommentInputFeedback
      parentFeedbackMessage={
        <FormattedMessage id="non_logged_in_feedback_input_answer" />
      }
      childFeedbackMessage={
        <FormattedMessage id="sub_non_joined_feedback_input_answer" />
      }
    />
  );
}

export function UnsignedProductReviewReplyInputFeedback() {
  return (
    <UnsignedCommentInputFeedback
      parentFeedbackMessage={
        <FormattedMessage id="non_logged_in_feedback_input_comment" />
      }
      childFeedbackMessage={
        <FormattedMessage id="sub_non_joined_feedback_input_comment" />
      }
    />
  );
}
