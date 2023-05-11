import * as React from "react";
import styled from "styled-components";
import { useIntl } from "react-intl";
import { PermissionDeniedFallbackType } from "app/enums";
// hooks
import useCancelToken from "common/hooks/useCancelToken";
import useCurrentUser from "common/hooks/useCurrentUser";
import { useActions } from "app/store";
import { isiOS } from "common/helpers/browserDetect";
// action
import { postReply } from "app/actions/forum";
import { checkUploadDone } from "../helper";

// components
import UserProfileImage from "common/components/userProfileImage";
import GroupInput, { IForwardRef } from "common/components/groupInput";
import { IRefHandler } from "../threadReplies";
import PermissionChecker from "common/components/permissionChecker";
import {
  UnsignedProductReviewReplyInputFeedback,
  UnsignedProductAnswerInputFeedback,
  UnsignedFundingReplyInputFeedback,
} from "common/components/feedBack/components/unsigned/preset";

import { px2rem } from "common/helpers/rem";

import ProductThreadListContext from "../../context";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  gap: ${px2rem(16)};
`;

const ReplyInputWrapper = styled.div`
  width: 100%;
  flex: 1;
  min-width: 0;
`;

const StyledUnsignedProductReviewReplyInputFeedback = styled(
  UnsignedProductReviewReplyInputFeedback,
)`
  width: 100%;
`;
const StyledUnsignedProductAnswerInputFeedback = styled(
  UnsignedProductAnswerInputFeedback,
)`
  width: 100%;
`;
const StyledUnsignedFundingReplyInputFeedback = styled(
  UnsignedFundingReplyInputFeedback,
)`
  width: 100%;
`;

interface IProps {
  thread: Moim.Forum.IThread;
  type: Moim.Forum.THREAD_TYPE;
  visible: boolean;
  disableUserProfile?: boolean;
  openUploadAlert(): void;
  onFocus?: () => void;
  onSave?: () => void;
}

export const useThreadItemGroupInput = ({
  thread,
  type,
  visible,
  disableUserProfile,
  openUploadAlert,
  onFocus,
  onSave,
}: IProps) => {
  const currentUser = useCurrentUser();
  const { sellerId } = React.useContext(ProductThreadListContext);
  const refEditor = React.useRef<IForwardRef>(null);
  const refReplies = React.useRef<IRefHandler>(null);
  const inputRef = React.useRef<HTMLDivElement>(null);

  const { dispatchCreateReply, dispatchCheckUploadDone } = useActions({
    dispatchCreateReply: postReply,
    dispatchCheckUploadDone: checkUploadDone,
  });
  const intl = useIntl();
  const cancelToken = useCancelToken();

  const handleCheckUploadDone = React.useCallback(() => {
    const ids = refEditor.current?.getUploadQueue();
    return dispatchCheckUploadDone(ids);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatchCheckUploadDone, refEditor]);

  const handleReplyEnter = React.useCallback(
    (contents: Moim.Blockit.Blocks[]) => {
      const allUploadDone = handleCheckUploadDone();
      if (!allUploadDone) {
        openUploadAlert();
        return;
      }

      if (sellerId) {
        refReplies.current?.open();
        dispatchCreateReply(
          {
            type,
            channelId: sellerId,
            threadId: thread.id,
            content: contents,
          },
          cancelToken.current.token,
        );
        refEditor.current?.groupInputClear();
      }

      onSave?.();
    },
    [
      checkUploadDone,
      sellerId,
      openUploadAlert,
      dispatchCreateReply,
      type,
      thread.id,
      cancelToken,
    ],
  );

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const handleReplyCancel = React.useCallback(() => {}, []);

  const placeholder = React.useMemo(() => {
    switch (type) {
      case "productReviewReply":
        return intl.formatMessage({
          id: "product_show/review_comment_placeholder",
        });
      case "productQuestionReply":
        return intl.formatMessage({
          id: "product_show/qna_answer_placeholder",
        });
      case "productCommentReply":
        return intl.formatMessage({
          id: "funding_show/comments_write_reply_placeholder",
        });
    }
  }, [type]);

  const unsignedGuide = React.useMemo(() => {
    switch (type) {
      case "productReviewReply":
        return <StyledUnsignedProductReviewReplyInputFeedback />;
      case "productQuestionReply":
        return <StyledUnsignedProductAnswerInputFeedback />;
      case "productCommentReply":
        return <StyledUnsignedFundingReplyInputFeedback />;
    }
  }, [type]);

  const groupInputElement = React.useMemo(() => {
    return (
      <PermissionChecker
        fallbackType={PermissionDeniedFallbackType.CUSTOM}
        hasPermission={Boolean(currentUser)}
        isLoading={false}
        unsignedCustomElement={unsignedGuide}
      >
        <Wrapper>
          {!disableUserProfile && (
            <UserProfileImage
              size="s"
              shape="round"
              src={currentUser?.avatar_url || ""}
            />
          )}
          <ReplyInputWrapper ref={inputRef}>
            <GroupInput
              id={thread.id}
              value={[]}
              ref={refEditor}
              maxAttachmentCount={50}
              autoFocus={!isiOS()}
              useSaveButton={true}
              useImageFileAttachButton={true}
              disableMentionPortal={false}
              disableEditor={!visible}
              mentionPortalContainer={inputRef.current}
              placeholder={placeholder}
              onEnter={handleReplyEnter}
              onCancel={handleReplyCancel}
              onFocus={onFocus}
              disableCreateMeeting={true}
            />
          </ReplyInputWrapper>
        </Wrapper>
      </PermissionChecker>
    );
  }, [
    visible,
    currentUser,
    unsignedGuide,
    disableUserProfile,
    thread?.id,
    placeholder,
    handleReplyEnter,
    handleReplyCancel,
  ]);

  return groupInputElement;
};
