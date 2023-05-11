import * as React from "react";
import styled from "styled-components";
import { VoteStatus } from "app/enums";
// hooks
import { useActions, useStoreState } from "app/store";
import useHover from "common/hooks/useHover";
import useCancelToken from "common/hooks/useCancelToken";
import useCurrentUser from "common/hooks/useCurrentUser";
import useOpenState from "common/hooks/useOpenState";
import { useHandleSignIn } from "common/hooks/useHandleSign";
import { useThreadItemGroupInput } from "../common/threadItem/useGroupInput";
import { useThreadItemMenu } from "../common/threadItem/useMenu";
// action
import { voteReply } from "app/actions/forum";
import { updateProductQuestion } from "app/actions/commerce";
import { checkUploadDone } from "../common/helper";
// components
import { HoverMenuItem, Question } from "common/components/threadV2";
import Engage from "common/components/threadV2/components/engage";
import { IForwardRef } from "common/components/groupInput";
import Answers, { IRefHandler } from "./answers";
import {
  ReplyInputContainer,
  QuestionItemChildrenContainer,
  QuestionContainer,
} from "./styled";
import { MoreIcon } from "../common/styled";

import ProductThreadListContext from "../context";
import { AnalyticsClass } from "common/helpers/analytics/analytics";

interface IProps {
  type: "question" | "answer";
  question: Moim.Forum.IThread<
    | Moim.Forum.IProductQuestionThreadMeta
    | Moim.Forum.IProductQuestionReplyThreadMeta
  >;
  className?: string;
}

export const QuestionItem: React.FC<IProps> = React.memo(
  ({ type, question, className }) => {
    const { productId, sellerId, highlight } = React.useContext(
      ProductThreadListContext,
    );
    const currentUser = useCurrentUser();
    const refEditor = React.useRef<IForwardRef>(null);
    const refAnswers = React.useRef<IRefHandler>(null);
    const [hoverRef, isHover] = useHover<HTMLDivElement>();
    const {
      close: closeEditMode,
      isOpen: isEditMode,
      open: openEditMode,
    } = useOpenState();

    const title = useStoreState(
      state => state.entities.users[question.author]?.name,
    );

    const {
      dispatchVoteReply,
      dispatchUpdateProductQuestion,
      dispatchCheckUploadDone,
    } = useActions({
      dispatchVoteReply: voteReply,
      dispatchUpdateProductQuestion: updateProductQuestion,
      dispatchCheckUploadDone: checkUploadDone,
    });
    const dispatchSignIn = useHandleSignIn();
    const cancelToken = useCancelToken();
    const {
      isOpen: isOpenReplyInput,
      open: handleOpenReplyInput,
      close: handleCloseReplyInput,
    } = useOpenState();

    const handleCheckUploadDone = React.useCallback(() => {
      const ids = refEditor.current?.getUploadQueue();
      return dispatchCheckUploadDone(ids);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatchCheckUploadDone, refEditor]);

    const handleVoteComment = React.useCallback(
      (status: Moim.Enums.VoteStatus) => {
        if (question.vote?.type === status) {
          if (type === "question") {
            AnalyticsClass.getInstance().questionShowQuestionReactCancel({
              questionId: question.id,
              productId: productId ?? "",
              type: question.vote?.type ?? "",
            });
          } else {
            AnalyticsClass.getInstance().questionShowReplyReactCancel({
              questionId: question.parent_id,
              replyId: question.id,
              type: question.vote?.type ?? "",
            });
          }
        } else {
          if (type === "question") {
            AnalyticsClass.getInstance().questionShowQuestionReact({
              questionId: question.id,
              productId: productId ?? "",
              type: status ?? "",
            });
          } else {
            AnalyticsClass.getInstance().questionShowReplyReact({
              questionId: question.parent_id,
              replyId: question.id,
              type: status ?? "",
            });
          }
        }

        if (!currentUser) {
          dispatchSignIn();
          return;
        }
        if (productId && sellerId && currentUser) {
          dispatchVoteReply({
            channelId: sellerId,
            threadId: productId,
            replyId: question.id,
            type: status,
            cancelToken: cancelToken.current.token,
          });
        }
      },
      [
        cancelToken,
        currentUser,
        dispatchSignIn,
        dispatchVoteReply,
        productId,
        question.id,
        sellerId,
      ],
    );

    const handleClickReply = React.useCallback(() => {
      if (isOpenReplyInput) {
        handleCloseReplyInput();
        refAnswers.current?.close();
      } else {
        handleOpenReplyInput();
        refAnswers.current?.open();
      }
    }, [handleCloseReplyInput, handleOpenReplyInput, isOpenReplyInput]);

    const {
      menuElement,
      refMoreMenu,
      responsiveMenuOpenState,
      uploadLoadingAlertOpenState,
    } = useThreadItemMenu({
      thread: question,
      onClickEditComment: openEditMode,
    });

    const groupInputElement = useThreadItemGroupInput({
      thread: question,
      type: "productQuestionReply",
      visible: isOpenReplyInput,
      disableUserProfile: true,
      openUploadAlert: uploadLoadingAlertOpenState.open,
      onFocus: () => {
        AnalyticsClass.getInstance().questionShowWriteReplySelect({
          questionId: question.id,
          productId: productId ?? "",
        });
      },
      onSave: () => {
        AnalyticsClass.getInstance().questionShowWriteReplyPublish({
          questionId: question.id,
          productId: productId ?? "",
        });
      },
    });

    const mediaProps = React.useMemo(() => {
      const mediaFiles = question.content.filter(
        content => content.type === "file",
      ) as Moim.Blockit.IFileBlock[];
      return mediaFiles.length > 0
        ? {
            fileId: mediaFiles[0].files[0].id,
            readonly: true,
            isSmallDeleteButton: true,
          }
        : undefined;
    }, [question.content]);

    const engageProps = React.useMemo(() => {
      const props: React.ComponentProps<typeof Engage> = {
        type: "updown",
        disableOpenVotedUserList: true,
        handler: handleVoteComment,
        channelId: type === "question" ? sellerId : productId,
        threadId: question.parent_id,
        replyId: question.id,
        upCount: question.up_vote_score,
        downCount: question.down_vote_score,
        status: question.vote?.type ?? VoteStatus.NONE,

        replyCount: question.replies_count ?? 0,
        onReplyClick: handleClickReply,
      };

      if (type === "answer") {
        delete props.replyCount;
        delete props.onReplyClick;
      }
      return props;
    }, [
      handleClickReply,
      handleVoteComment,
      productId,
      question.down_vote_score,
      question.id,
      question.parent_id,
      question.replies_count,
      question.up_vote_score,
      question.vote,
      sellerId,
      type,
    ]);

    const menus = React.useMemo(
      () => [
        <HoverMenuItem ref={refMoreMenu} onClick={responsiveMenuOpenState.open}>
          <MoreIcon />
        </HoverMenuItem>,
      ],
      [responsiveMenuOpenState.open],
    );

    const handleEditContent = React.useCallback(
      (newContent: Moim.Blockit.Blocks[]) => {
        const allUploadDone = handleCheckUploadDone();
        if (!allUploadDone) {
          uploadLoadingAlertOpenState.open();
          return;
        }

        if (productId && sellerId) {
          dispatchUpdateProductQuestion({
            channelId: sellerId,
            threadId: productId,
            replyId: question.id,
            content: newContent,
            meta: {
              productId,
            },
          });
          refEditor.current?.groupInputClear();
        }
      },
      [
        handleCheckUploadDone,
        dispatchUpdateProductQuestion,
        uploadLoadingAlertOpenState.open,
        productId,
        question.id,
        sellerId,
      ],
    );

    const highlighted = React.useMemo(() => {
      switch (type) {
        case "question":
          return Boolean(
            !highlight.replyId && highlight.threadId === question.id,
          );
        case "answer":
          return Boolean(highlight.replyId);
        default:
          return false;
      }
    }, [type, highlight.replyId, highlight.threadId, question.id]);

    const editState = React.useMemo(
      () => ({
        isEditMode,
        onEnter: closeEditMode,
        onCancel: closeEditMode,
      }),
      [isEditMode, closeEditMode],
    );

    return (
      <>
        <QuestionContainer highlighted={highlighted} className={className}>
          <Question
            type={type}
            ref={hoverRef}
            key={`${type}_${question.id}`}
            questionId={question.id}
            userId={question.author}
            showAvatar={false}
            editState={editState}
            title={title}
            contents={question.content}
            media={mediaProps}
            createdAt={question.created_at}
            menus={menus}
            hover={isHover}
            disableHoverStyle={true}
            engage={engageProps}
            onEditContent={handleEditContent}
          />
        </QuestionContainer>

        {type === "question" && (
          <QuestionItemChildrenContainer>
            <ReplyInputContainer visible={isOpenReplyInput}>
              {groupInputElement}
            </ReplyInputContainer>

            <Answers
              ref={refAnswers}
              question={question}
              onClickMoreButton={handleOpenReplyInput}
            />
          </QuestionItemChildrenContainer>
        )}
        {menuElement}
      </>
    );
  },
);

export const AnswerItem = styled(QuestionItem)`
  background-color: ${props => props.theme.colorV2.colorSet.grey10};
`;
