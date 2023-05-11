import * as React from "react";
import { VoteStatus } from "app/enums";
// hooks
import useHover from "common/hooks/useHover";
import useCancelToken from "common/hooks/useCancelToken";
import useCurrentUser from "common/hooks/useCurrentUser";
import { useActions, useStoreState } from "app/store";
import useOpenState from "common/hooks/useOpenState";
import { useHandleSignIn } from "common/hooks/useHandleSign";
import { useThreadItemMenu } from "../common/threadItem/useMenu";
import { useThreadItemGroupInput } from "../common/threadItem/useGroupInput";
// action
import { voteReply } from "app/actions/forum";
import { updateProductReview } from "app/actions/commerce";
import { checkUploadDone } from "../common/helper";
// components
import { HoverMenuItem, Review } from "common/components/threadV2";
import { IForwardRef } from "common/components/groupInput";
import Replies, { IRefHandler } from "./replies";

import Engage from "common/components/threadV2/components/engage";
import useGlobalPhonePrefixOption from "common/hooks/useGlobalPhonePrefix";
import {
  ReviewItemChildrenContainer,
  ReplyInputContainer,
  ReviewContainer,
} from "./styled";
import { MoreIcon } from "../common/styled";

import ProductThreadListContext from "../context";
import { AnalyticsClass } from "common/helpers/analytics/analytics";
import _ from "lodash";

interface IProps {
  type: "review" | "review-reply";
  review: Moim.Forum.IThread<Moim.Forum.IProductReviewThreadMeta>;
}

const ReviewItem: React.FC<IProps> = ({ review, type }) => {
  const { productId, sellerId, highlight } = React.useContext(
    ProductThreadListContext,
  );
  const currentUser = useCurrentUser();
  const refEditor = React.useRef<IForwardRef>(null);
  const refReplies = React.useRef<IRefHandler>(null);
  const [hoverRef, isHover] = useHover<HTMLDivElement>();
  const {
    close: closeEditMode,
    isOpen: isEditMode,
    open: openEditMode,
  } = useOpenState();
  const title = useStoreState(
    state => state.entities.users[review.author]?.name,
  );

  const dispatchSignIn = useHandleSignIn();
  const {
    dispatchVoteReply,
    dispatchUpdateProductReview,
    dispatchCheckUploadDone,
  } = useActions({
    dispatchVoteReply: voteReply,
    dispatchUpdateProductReview: updateProductReview,
    dispatchCheckUploadDone: checkUploadDone,
  });
  const cancelToken = useCancelToken();
  const {
    isOpen: isOpenReplyInput,
    open: handleOpenReplyInput,
    close: handleCloseReplyInput,
  } = useOpenState();
  const option = useGlobalPhonePrefixOption(review.meta);

  const handleCheckUploadDone = React.useCallback(() => {
    const ids = refEditor.current?.getUploadQueue();
    return dispatchCheckUploadDone(ids);
  }, [dispatchCheckUploadDone, refEditor]);

  const handleVoteComment = React.useCallback(
    (status: Moim.Enums.VoteStatus) => {
      if (review.vote?.type === status) {
        if (type === "review") {
          AnalyticsClass.getInstance().reviewShowReviewReactCancel({
            reviewId: review.id,
            productId: productId ?? "",
            type: review.vote?.type ?? "",
          });
        } else {
          AnalyticsClass.getInstance().reviewShowReplyReactCancel({
            reviewId: review.parent_id,
            replyId: review.id,
            type: review.vote?.type ?? "",
          });
        }
      } else {
        if (type === "review") {
          AnalyticsClass.getInstance().reviewShowReviewReact({
            reviewId: review.id,
            productId: productId ?? "",
            type: status ?? "",
          });
        } else {
          AnalyticsClass.getInstance().reviewShowReplyReact({
            reviewId: review.parent_id,
            replyId: review.id,
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
          replyId: review.id,
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
      review.id,
      sellerId,
      review.vote?.type,
    ],
  );

  const handleClickReply = React.useCallback(() => {
    if (isOpenReplyInput) {
      handleCloseReplyInput();
      refReplies.current?.close();
    } else {
      handleOpenReplyInput();
      refReplies.current?.open();
    }
  }, [handleCloseReplyInput, handleOpenReplyInput, isOpenReplyInput]);

  const {
    menuElement,
    refMoreMenu,
    responsiveMenuOpenState,
    uploadLoadingAlertOpenState,
  } = useThreadItemMenu({
    thread: review,
    onClickEditComment: openEditMode,
  });

  const groupInputElement = useThreadItemGroupInput({
    thread: review,
    type: "productReviewReply",
    visible: isOpenReplyInput,
    openUploadAlert: uploadLoadingAlertOpenState.open,
    onFocus: () => {
      AnalyticsClass.getInstance().reviewShowWriteReplySelect({
        reviewId: review.id,
        productId: productId ?? "",
      });
    },
    onSave: () => {
      AnalyticsClass.getInstance().reviewShowWriteReplyPublish({
        reviewId: review.id,
        productId: productId ?? "",
      });
    },
  });

  const mediasProps = React.useMemo(() => {
    const mediaFiles = review.content.filter(
      content => content.type === "file",
    ) as Moim.Blockit.IFileBlock[];

    return mediaFiles.length > 0
      ? mediaFiles.map(mf => ({
          fileId: mf.files[0].id,
          readonly: true,
          isSmallDeleteButton: true,
        }))
      : undefined;
  }, [review.content]);

  const engageProps = React.useMemo(() => {
    const props: React.ComponentProps<typeof Engage> = {
      type: "like",
      disableOpenVotedUserList: true,
      handleLike: handleVoteComment,
      channelId: type === "review" ? sellerId : productId,
      threadId: review.parent_id,
      replyId: review.id,
      likeCount: review.vote_score,
      liked: review.vote?.type === VoteStatus.POSITIVE,

      replyCount: review.replies_count ?? 0,
      onReplyClick: handleClickReply,
    };
    if (type === "review-reply") {
      delete props.replyCount;
      delete props.onReplyClick;
    }

    return props;
  }, [
    handleClickReply,
    handleVoteComment,
    sellerId,
    productId,
    review.id,
    review.parent_id,
    review.replies_count,
    review.vote,
    review.vote_score,
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
    (title: string | undefined, newContent: Moim.Blockit.Blocks[]) => {
      const allUploadDone = handleCheckUploadDone();
      if (!allUploadDone) {
        uploadLoadingAlertOpenState.open();
        return;
      }

      if (productId && sellerId) {
        dispatchUpdateProductReview({
          channelId: sellerId,
          threadId: productId,
          replyId: review.id,
          title,
          content: newContent,
        });
        refEditor.current?.groupInputClear();
      }
    },
    [
      handleCheckUploadDone,
      dispatchUpdateProductReview,
      uploadLoadingAlertOpenState.open,
      productId,
      review.id,
      sellerId,
    ],
  );

  const highlighted = React.useMemo(() => {
    switch (type) {
      case "review":
        return Boolean(!highlight.replyId && highlight.threadId === review.id);
      case "review-reply":
        return Boolean(highlight.replyId === review.id);
      default:
        return false;
    }
  }, [type, highlight.replyId, highlight.threadId, review.id]);

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
      <ReviewContainer highlighted={highlighted}>
        <Review
          key={`review_${review.id}`}
          type={type}
          ref={hoverRef}
          reviewId={review.id}
          userId={review.author}
          showAvatar={true}
          title={title}
          size={type === "review" ? "m" : "s"}
          editState={editState}
          contents={review.content}
          productOption={option}
          medias={mediasProps}
          createdAt={review.created_at}
          menus={menus}
          hover={isHover}
          engage={engageProps}
          onEditContent={handleEditContent}
        />
      </ReviewContainer>

      <ReviewItemChildrenContainer>
        <ReplyInputContainer visible={isOpenReplyInput}>
          {groupInputElement}
        </ReplyInputContainer>

        <Replies
          ref={refReplies}
          review={review}
          onClickMoreButton={() => {
            handleOpenReplyInput();
          }}
        />
      </ReviewItemChildrenContainer>
      {menuElement}
    </>
  );
};

export default React.memo(ReviewItem);
