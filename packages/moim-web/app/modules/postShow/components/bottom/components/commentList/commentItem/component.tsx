import * as React from "react";
import { FormattedMessage } from "react-intl";

import { MediaPreview } from "common/components/designSystem/media";
import LinkPreviewComponent from "common/components/linkPreview";
import { useOpenPostReportDialog } from "common/components/reportDialog/presets/post/hooks";
import ResponsiveMenu from "common/components/responsiveMenu";
import { MoreIcon, MoreMenuItem, ResponsiveMenuWrapper } from "./styled";
import { Comment, HoverMenuItem } from "common/components/threadV2";
import DeleteCommentAlertDialog from "./components/deleteCommentAlertDialog";
import { useStoreState, useActions } from "app/store";
import { useOpenSNSShareDialog } from "common/components/snsShareDialog/utils";
import useCancelToken from "common/hooks/useCancelToken";
import useOpenState from "common/hooks/useOpenState";
import useGroupTexts, {
  useCurrentUserLocale,
} from "common/hooks/useGroupTexts";
import { usePostShowPermission } from "app/modules/postShow/hooks";

import {
  ActionCreators as ForumActionCreators,
  voteReply,
} from "app/actions/forum";
import makeShareUrl from "common/helpers/makeShareUrl";
import { MoimURL } from "common/helpers/url";
import { VoteStatus } from "app/enums";
import { AnalyticsClass } from "common/helpers/analytics/analytics";

interface IProps {
  focusedId?: Moim.Id;
  comment: Moim.Forum.IThread;
  isHover: boolean;
  commentReactionType: Moim.Forum.PostReactionType;
  showCommentReaction: boolean;
}

const Component = React.forwardRef<HTMLDivElement | null, IProps>(
  (
    { comment, focusedId, isHover, commentReactionType, showCommentReaction },
    ref,
  ) => {
    const highlighted = comment.id === focusedId;
    const {
      author,
      isAuthor,
      currentUserId,
      disableLike,
      commentEditState,
      isAnonymousReaction,
    } = useStoreState(state => ({
      author: comment ? state.entities.users[comment.author] : undefined,
      isAuthor:
        comment.author === state.app.currentUserId ||
        Boolean(comment?.anonymous_data?.isMine),
      currentUserId: state.app.currentUserId,
      commentEditState: state.forumCommentListPage.commentEditState,
      disableLike: state.forumCommentListPage.isLoadingToCommentLike,
      isAnonymousReaction: comment?.root_id
        ? Boolean(
            (state.entities.channels[
              comment.root_id
            ] as Moim.Channel.IForumSimpleChannel)?.anonymous_config?.reaction,
          )
        : false,
    }));

    const anonymousTextKey = useGroupTexts("anonymous_member");
    const locale = useCurrentUserLocale();

    const { dispatchChangeCommentEditStatus, dispatchVoteReply } = useActions({
      dispatchChangeCommentEditStatus:
        ForumActionCreators.changeCommentEditState,
      dispatchVoteReply: voteReply,
    });

    const refMoreMenu = React.useRef<HTMLDivElement>(null);
    const cancelToken = useCancelToken();
    const {
      isOpen: isOpenResponsiveMenu,
      open: handleOpenMenu,
      close: handleCloseMenu,
    } = useOpenState();
    const {
      isOpen: isDeleteAlertOpen,
      open: openDeleteAlert,
      close: closeDeleteAlert,
    } = useOpenState();

    const { hasPermission: votePermission } = usePostShowPermission(
      "COMMENT_VOTE",
    );
    const { hasPermission: deletePermission } = usePostShowPermission(
      "DELETE_COMMENT",
      comment.author,
    );
    const { hasPermission: editPermission } = usePostShowPermission(
      "MANAGE_COMMENT",
      comment.author,
    );

    const hasVotePermission = React.useMemo(
      () => votePermission || Boolean(comment.anonymous_data?.isMine),
      [votePermission, comment.anonymous_data?.isMine],
    );
    const hasDeletePermission = React.useMemo(
      () => deletePermission || Boolean(comment.anonymous_data?.isMine),
      [deletePermission, comment.anonymous_data?.isMine],
    );
    const hasEditPermission = React.useMemo(
      () => editPermission || Boolean(comment.anonymous_data?.isMine),
      [editPermission, comment.anonymous_data?.isMine],
    );

    const handleMenuClick = React.useCallback(() => {
      handleOpenMenu();
    }, [handleOpenMenu]);

    const fileContents = React.useMemo(
      () =>
        comment.content.filter(
          content => content.type === "file",
        ) as Moim.Blockit.IFileBlock[],
      [comment],
    );
    const mediaProps = React.useMemo(() => {
      if (fileContents.length && fileContents[0].files.length) {
        const file = fileContents[0].files[0];
        return {
          fileId: file.id,
          readonly: true,
          isSmallDeleteButton: true,
        } as React.ComponentProps<typeof MediaPreview>;
      }
      return undefined;
    }, [fileContents]);

    const linkPreviewContents = React.useMemo(
      () =>
        comment.content.filter(
          content => content.type === "link-preview",
        ) as Moim.Blockit.ILinkPreviewBlock[],
      [comment.content],
    );

    const linkPreviewProps:
      | React.ComponentProps<typeof LinkPreviewComponent>
      | undefined = React.useMemo(() => {
      if (linkPreviewContents.length && linkPreviewContents[0]) {
        const data = linkPreviewContents[0];
        return {
          readOnly: true,
          favicon: data.site?.icon,
          siteName: data.site?.name,
          url: data.url,
          title: data.title,
          description: data.description,
          image: data.thumb?.url,
          embed: data.embed,
        };
      }
      return undefined;
    }, [linkPreviewContents]);

    const menus = React.useMemo(
      () => [
        <HoverMenuItem ref={refMoreMenu} onClick={handleMenuClick}>
          <MoreIcon />
        </HoverMenuItem>,
      ],
      [handleMenuClick, refMoreMenu],
    );

    const shareUrl = React.useMemo(() => {
      if (comment.root_id) {
        return makeShareUrl(
          new MoimURL.FocusedShowForumThread({
            forumId: comment.root_id,
            threadId: comment.parent_id,
            focusedId: comment.id,
          }).toString(),
        );
      }
    }, [comment.root_id, comment.parent_id, comment.id]);

    const handleOpenShareDialog = useOpenSNSShareDialog(shareUrl);
    const handleOpenReportDialog = useOpenPostReportDialog({
      parentId: comment.author,
      threadId: comment.id,
    });

    const handleVoteComment = React.useCallback(
      (status: Moim.Enums.VoteStatus) => {
        if (!disableLike && comment.root_id && currentUserId) {
          dispatchVoteReply(
            {
              channelId: comment.root_id,
              threadId: comment.parent_id,
              replyId: comment.id,
              type: status,
              cancelToken: cancelToken.current.token,
            },
            comment.groupId,
          );

          if (status === null) {
            AnalyticsClass.getInstance().forumPostCommentReactCancel({
              commentId: comment.id,
              reactType: comment.vote?.type ?? "upvote",
            });
          } else {
            AnalyticsClass.getInstance().forumPostCommentReact({
              commentId: comment.id,
              reactType: status,
            });
          }
        }
      },
      [
        disableLike,
        currentUserId,
        comment.root_id,
        comment.groupId,
        comment.parent_id,
        comment.id,
      ],
    );

    const handleClickDelete = React.useCallback(() => {
      openDeleteAlert();
      handleCloseMenu();
    }, [openDeleteAlert, handleCloseMenu]);

    const handleClickEditComment = React.useCallback(() => {
      if (comment.root_id) {
        dispatchChangeCommentEditStatus({
          commentId: comment.id,
          threadId: comment.parent_id,
          channelId: comment.root_id,
          groupId: comment.groupId,
        });
        handleCloseMenu();
      }
    }, [
      comment.parent_id,
      comment.root_id,
      comment.id,
      comment.groupId,
      dispatchChangeCommentEditStatus,
      handleCloseMenu,
    ]);

    const handleSubmitEditComment = React.useCallback(() => {
      dispatchChangeCommentEditStatus(undefined);
    }, [dispatchChangeCommentEditStatus]);

    const handleCancelEditComment = React.useCallback(() => {
      dispatchChangeCommentEditStatus(undefined);
    }, [dispatchChangeCommentEditStatus]);

    const engageProps: PickValue<
      React.ComponentProps<typeof Comment>,
      "engage"
    > = React.useMemo(() => {
      if (!showCommentReaction) {
        return undefined;
      }

      if (commentReactionType === "up") {
        return {
          type: "like",
          disabled: !hasVotePermission || disableLike,
          liked: comment.vote?.type === VoteStatus.POSITIVE,
          likeCount: comment.vote_score,
          handleLike: handleVoteComment,
          channelId: comment?.root_id,
          threadId: comment.parent_id,
          replyId: comment.id,
          groupId: comment.groupId,
          disableOpenVotedUserList: isAnonymousReaction,
        };
      }

      return {
        type: "updown",
        upCount: comment?.up_vote_score,
        downCount: comment?.down_vote_score,
        channelId: comment?.root_id,
        threadId: comment.parent_id,
        replyId: comment.id,
        groupId: comment.groupId,
        disabled: !hasVotePermission || disableLike,
        status: comment.vote?.type ?? VoteStatus.NONE,
        handler: handleVoteComment,
        disableOpenVotedUserList: isAnonymousReaction,
      };
    }, [
      showCommentReaction,
      commentReactionType,
      comment,
      hasVotePermission,
      disableLike,
      handleVoteComment,
      isAnonymousReaction,
    ]);

    const avatarProps = React.useMemo(
      () =>
        author
          ? {
              userId: author.id,
              src: author.avatar_url || "",
              title: author.name,
              role: "button",
              isOnline: author.presence === "ACTIVE",
            }
          : isAnonymousReaction
          ? {}
          : undefined,
      [author, isAnonymousReaction],
    );

    return (
      <>
        <Comment
          ref={ref}
          key={comment.id}
          commentId={comment.id}
          engage={engageProps}
          userId={comment.author}
          avatar={avatarProps}
          title={
            isAnonymousReaction
              ? `${anonymousTextKey?.singular}${comment.anonymous_data?.authorSuffix?.[locale]}`
              : author?.name
          }
          createdAt={comment.created_at}
          contents={comment.content}
          media={mediaProps}
          hover={isHover}
          menus={menus}
          linkPreview={linkPreviewProps}
          selected={highlighted}
          isAnonymous={isAnonymousReaction}
          editState={{
            isEditMode: commentEditState?.commentId === comment.id,
            onEnter: handleSubmitEditComment,
            onCancel: handleCancelEditComment,
          }}
        />
        <ResponsiveMenu
          open={isOpenResponsiveMenu}
          anchorElement={refMoreMenu.current}
          onCloseRequest={handleCloseMenu}
        >
          <ResponsiveMenuWrapper>
            <MoreMenuItem onClick={handleOpenShareDialog}>
              <FormattedMessage id="menu_content_link_share" />
            </MoreMenuItem>

            {hasDeletePermission && (
              <MoreMenuItem onClick={handleClickDelete}>
                <FormattedMessage id="delete_button" />
              </MoreMenuItem>
            )}
            {hasEditPermission && (
              <MoreMenuItem onClick={handleClickEditComment}>
                <FormattedMessage id="edit_button" />
              </MoreMenuItem>
            )}
            {!isAuthor && (
              <MoreMenuItem onClick={handleOpenReportDialog}>
                <FormattedMessage id="more_menu_report" />
              </MoreMenuItem>
            )}
          </ResponsiveMenuWrapper>
        </ResponsiveMenu>

        <DeleteCommentAlertDialog
          comment={comment}
          isOpen={isDeleteAlertOpen}
          onClose={closeDeleteAlert}
        />
      </>
    );
  },
);

export default React.memo(Component);
