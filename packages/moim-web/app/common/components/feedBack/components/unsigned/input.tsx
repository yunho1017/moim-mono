import * as React from "react";

import { UnsignedInputWrapper, UnsignedInputText } from "./styled";
import useCurrentGroup from "common/hooks/useCurrentGroup";
import useGroupTexts from "common/hooks/useGroupTexts";
import { useHandleSignIn } from "common/hooks/useHandleSign";

interface IProps {
  feedbackType?: "parent" | "child";
  className?: string;
  parentFeedbackMessage?: React.ReactNode;
  childFeedbackMessage?: React.ReactNode;
  onClick?: () => void;
}

export function UnsignedChatInputFeedback({
  feedbackType,
  className,
  parentFeedbackMessage,
  childFeedbackMessage,
  onClick,
}: IProps) {
  const currentGroup = useCurrentGroup();
  const signIn = useHandleSignIn();
  const childTitle = useGroupTexts("non_joined_child_feedback_input_chat");
  const parentTitle = useGroupTexts("non_signed_up_parent_feedback_input_chat");
  const title = React.useMemo(() => {
    if (feedbackType ? feedbackType === "parent" : currentGroup?.is_hub) {
      return parentFeedbackMessage ?? parentTitle?.singular;
    }

    return childFeedbackMessage ?? childTitle?.singular;
  }, [
    feedbackType,
    childFeedbackMessage,
    parentTitle,
    childTitle,
    currentGroup,
    parentFeedbackMessage,
  ]);

  return (
    <UnsignedInputWrapper className={className}>
      <UnsignedInputText onClick={onClick ?? signIn}>{title}</UnsignedInputText>
    </UnsignedInputWrapper>
  );
}

export function UnsignedCommentInputFeedback({
  feedbackType,
  className,
  parentFeedbackMessage,
  childFeedbackMessage,
  onClick,
}: IProps) {
  const currentGroup = useCurrentGroup();
  const signIn = useHandleSignIn();
  const childTitle = useGroupTexts("non_joined_child_feedback_input_comment");
  const parentTitle = useGroupTexts(
    "non_signed_up_parent_feedback_input_comment",
  );
  const title = React.useMemo(() => {
    if (feedbackType ? feedbackType === "parent" : currentGroup?.is_hub) {
      return parentFeedbackMessage ?? parentTitle?.singular;
    }

    return childFeedbackMessage ?? childTitle?.singular;
  }, [
    feedbackType,
    childFeedbackMessage,
    parentTitle,
    childTitle,
    currentGroup,
    parentFeedbackMessage,
  ]);

  return (
    <UnsignedInputWrapper className={className}>
      <UnsignedInputText onClick={onClick ?? signIn}>{title}</UnsignedInputText>
    </UnsignedInputWrapper>
  );
}
