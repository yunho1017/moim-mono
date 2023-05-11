import * as React from "react";
import { VoteStatus } from "app/enums";
// hooks
import useHover from "common/hooks/useHover";
import useCancelToken from "common/hooks/useCancelToken";
import useCurrentUser from "common/hooks/useCurrentUser";
import { useActions, useStoreState } from "app/store";
import useOpenState from "common/hooks/useOpenState";
import { useCurrentUserLocale } from "common/hooks/useGroupTexts";
import { useHandleSignIn } from "common/hooks/useHandleSign";
import { useThreadItemGroupInput } from "../common/threadItem/useGroupInput";
import { useThreadItemMenu } from "../common/threadItem/useMenu";

// action
import { voteReply } from "app/actions/forum";
import { updateFundComment } from "app/actions/commerce";
import { checkUploadDone } from "../common/helper";
// components
import { HoverMenuItem, ProductComment } from "common/components/threadV2";
import { IForwardRef } from "common/components/groupInput";
import Replies, { IRefHandler } from "./replies";
import Engage from "common/components/threadV2/components/engage";
import {
  ReviewItemChildrenContainer,
  ReplyInputContainer,
  CommentContainer,
} from "./styled";
import { MoreIcon } from "../common/styled";

import ProductThreadListContext from "../context";

interface IProps {
  type: "comment" | "comment-reply";
  comment: Moim.Forum.IThread<Moim.Forum.IProductReviewThreadMeta>;
  enableOptionDisplay?: boolean;
}

const CommentItem: React.FC<IProps> = ({
  type,
  comment,
  enableOptionDisplay,
}) => {
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
    state => state.entities.users[comment.author]?.name,
  );

  const dispatchSignIn = useHandleSignIn();
  const {
    dispatchVoteReply,
    dispatchUpdateFundComment,
    dispatchCheckUploadDone,
  } = useActions({
    dispatchVoteReply: voteReply,
    dispatchUpdateFundComment: updateFundComment,
    dispatchCheckUploadDone: checkUploadDone,
  });
  const locale = useCurrentUserLocale();
  const cancelToken = useCancelToken();
  const {
    isOpen: isOpenReplyInput,
    open: handleOpenReplyInput,
    close: handleCloseReplyInput,
  } = useOpenState();

  const handleCheckUploadDone = React.useCallback(async () => {
    const ids = refEditor.current?.getUploadQueue();
    return dispatchCheckUploadDone(ids);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatchCheckUploadDone, refEditor]);

  const handleVoteComment = React.useCallback(
    (status: Moim.Enums.VoteStatus) => {
      if (!currentUser) {
        dispatchSignIn();
        return;
      }
      if (productId && sellerId && currentUser) {
        dispatchVoteReply({
          channelId: sellerId,
          threadId: productId,
          replyId: comment.id,
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
      comment.id,
      sellerId,
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
    thread: comment,
    onClickEditComment: openEditMode,
  });

  const groupInputElement = useThreadItemGroupInput({
    thread: comment,
    type: "productCommentReply",
    visible: isOpenReplyInput,
    openUploadAlert: uploadLoadingAlertOpenState.open,
  });

  const mediaProps = React.useMemo(() => {
    const mediaFiles = comment.content.filter(
      content => content.type === "file",
    ) as Moim.Blockit.IFileBlock[];
    return mediaFiles.length > 0
      ? {
          fileId: mediaFiles[0].files[0].id,
          readonly: true,
          isSmallDeleteButton: true,
        }
      : undefined;
  }, [comment.content]);

  const engageProps = React.useMemo(() => {
    const props: React.ComponentProps<typeof Engage> = {
      type: "like",
      disableOpenVotedUserList: true,
      handleLike: handleVoteComment,
      channelId: type === "comment" ? sellerId : productId,
      threadId: comment.parent_id,
      replyId: comment.id,
      likeCount: comment.vote_score,
      liked: comment.vote?.type === VoteStatus.POSITIVE,

      replyCount: comment.replies_count ?? 0,
      onReplyClick: handleClickReply,
    };
    if (type === "comment-reply") {
      delete props.replyCount;
      delete props.onReplyClick;
    }

    return props;
  }, [
    handleClickReply,
    handleVoteComment,
    sellerId,
    productId,
    comment.id,
    comment.parent_id,
    comment.replies_count,
    comment.vote,
    comment.vote_score,
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

  const option = React.useMemo(() => {
    if (!enableOptionDisplay) {
      return undefined;
    }

    const optionLocaleKeys =
      Object.keys(comment.meta?.purchaseItemSnap?.optionsLabel ?? {}) ?? [];
    if (
      !comment.meta ||
      !comment.meta.purchaseItemSnap ||
      !comment.meta.purchaseItemSnap.optionsLabel ||
      optionLocaleKeys.length === 0
    ) {
      return undefined;
    }

    const res =
      comment.meta.purchaseItemSnap.optionsLabel[locale as any] ??
      optionLocaleKeys.length > 0
        ? comment.meta.purchaseItemSnap.optionsLabel[optionLocaleKeys[0] as any]
        : comment.meta.purchaseItemSnap.optionsLabel["en" as any];

    return Object.entries(res)
      .map(([key, value]) => `${key}:${value}`)
      .join(" · ");
  }, [enableOptionDisplay, locale, comment.meta]);

  const handleEditContent = React.useCallback(
    (title: string | undefined, newContent: Moim.Blockit.Blocks[]) => {
      const allUploadDone = handleCheckUploadDone();
      if (!allUploadDone) {
        uploadLoadingAlertOpenState.open();
        return;
      }

      if (productId && sellerId) {
        dispatchUpdateFundComment({
          channelId: sellerId,
          threadId: productId,
          replyId: comment.id,
          title,
          content: newContent,
        });
        refEditor.current?.groupInputClear();
      }
    },
    [
      handleCheckUploadDone,
      dispatchUpdateFundComment,
      uploadLoadingAlertOpenState.open,
      productId,
      comment.id,
      sellerId,
    ],
  );

  const highlighted = React.useMemo(() => {
    switch (type) {
      case "comment":
        return Boolean(!highlight.replyId && highlight.threadId === comment.id);
      case "comment-reply":
        return Boolean(highlight.replyId);
      default:
        return false;
    }
  }, [type, highlight.replyId, highlight.threadId, comment.id]);

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
      <CommentContainer highlighted={highlighted}>
        <ProductComment
          key={`comment_${comment.id}`}
          type={type}
          ref={hoverRef}
          commentId={comment.id}
          userId={comment.author}
          showAvatar={true}
          title={title}
          size={type === "comment" ? "m" : "s"}
          editState={editState}
          contents={comment.content}
          productOption={option}
          media={mediaProps}
          createdAt={comment.created_at}
          menus={menus}
          hover={isHover}
          engage={engageProps}
          onEditContent={handleEditContent}
        />
      </CommentContainer>

      <ReviewItemChildrenContainer>
        <ReplyInputContainer visible={isOpenReplyInput}>
          {groupInputElement}
        </ReplyInputContainer>

        <Replies
          ref={refReplies}
          comment={comment}
          onClickMoreButton={handleOpenReplyInput}
        />
      </ReviewItemChildrenContainer>

      {menuElement}
    </>
  );
};

export default React.memo(CommentItem);
