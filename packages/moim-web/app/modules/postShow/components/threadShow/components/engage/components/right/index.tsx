import * as React from "react";
import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { useIntl } from "react-intl";

import UnsignedChecker from "common/components/unsiginedChecker";
import ForumShowMenu from "../../../menu";

import UnBookmarkIconBase from "@icon/24-bookmark-1.svg";
import BookmarkIconBase from "@icon/24-bookmark-fill.svg";
import ShareIconBase from "@icon/24-share-1.svg";
import BlackMoreIconBase from "@icon/24-more-v-g.svg";

import { useActions, useStoreState } from "app/store";
import useCancelToken from "common/hooks/useCancelToken";
import { useOpenSNSShareDialog } from "common/components/snsShareDialog/utils";
import useOpenState from "common/hooks/useOpenState";
import useIsMobile from "common/hooks/useIsMobile";
import { deleteBookmark, postBookmark } from "app/actions/bookmark";
import { deleteThread } from "app/actions/forum";

import { PermissionDeniedFallbackType } from "app/enums";
import { PostShowContext } from "app/modules/postShow/context";

const UnBookmarkIcon = styled(UnBookmarkIconBase).attrs(props => ({
  size: "s",
  touch: 24,
  iconColor: props.theme.colorV2.colorSet.grey800,
}))``;

const BookmarkIcon = styled(BookmarkIconBase).attrs(props => ({
  size: "s",
  touch: 24,
  iconColor: props.theme.colorV2.colorSet.grey800,
}))``;

const ShareIcon = styled(ShareIconBase).attrs(props => ({
  size: "s",
  touch: 24,
  iconColor: props.theme.colorV2.colorSet.grey800,
}))``;

const MoreIcon = styled(BlackMoreIconBase).attrs(props => ({
  size: "s",
  touch: 24,
  iconColor: props.theme.colorV2.colorSet.grey800,
}))``;

const IconWrapper = styled.div`
  width: ${px2rem(24)};
  height: ${px2rem(24)};
  transition: opacity 200ms ease-in;

  &:hover {
    opacity: 0.6;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;

  & > * + * {
    margin-left: ${px2rem(16)};
  }
`;

export default React.memo(function Right() {
  const { post, onBack } = React.useContext(PostShowContext);
  const channelId = post.parent_id;
  const threadId = post.id;
  const intl = useIntl();
  const isMobile = useIsMobile();
  const cancelToken = useCancelToken();
  const refMenuButton = React.useRef(null);
  const {
    isOpen: openMenu,
    open: handleClickMenu,
    close: handleCloseRequestMenu,
  } = useOpenState();

  const { channel } = useStoreState(state => ({
    channel: state.entities.channels[post.parent_id] as
      | Moim.Channel.IForumSimpleChannel
      | undefined,
  }));
  const {
    dispatchPostBookmark,
    dispatchDeleteBookmark,
    dispatchDeleteThread,
  } = useActions({
    dispatchPostBookmark: postBookmark,
    dispatchDeleteBookmark: deleteBookmark,
    dispatchDeleteThread: deleteThread,
  });

  const openShareDialog = useOpenSNSShareDialog(
    location.origin + location.pathname + location.search,
  );

  const handleBookmark = React.useCallback(() => {
    dispatchPostBookmark(
      { forumId: channelId, threadId },
      {
        succeed: intl.formatMessage({ id: "toast_message_bookmark_success" }),
        failed: intl.formatMessage({ id: "toast_message_bookmark_failure" }),
      },
      cancelToken.current.token,
      post.groupId,
    );
  }, [
    cancelToken,
    dispatchPostBookmark,
    intl,
    channelId,
    threadId,
    post.groupId,
  ]);

  const handleUnBookmark = React.useCallback(() => {
    dispatchDeleteBookmark(
      { forumId: channelId, threadId },
      {
        succeed: intl.formatMessage({
          id: "toast_message_bookmark_cancel_success",
        }),
        failed: intl.formatMessage({
          id: "toast_message_bookmark_cancel_failure",
        }),
      },
      cancelToken.current.token,
      post.groupId,
    );
  }, [
    cancelToken,
    dispatchDeleteBookmark,
    intl,
    channelId,
    threadId,
    post.groupId,
  ]);

  const handleDeleteThread = React.useCallback(() => {
    if (post) {
      dispatchDeleteThread(
        {
          forumId: post.parent_id,
          threadId: post.id,
        },
        post.groupId,
      );
      onBack();
    }
  }, [dispatchDeleteThread, post.id, post.parent_id, post.groupId]);

  return (
    <Wrapper>
      <IconWrapper onClick={openShareDialog}>
        <ShareIcon />
      </IconWrapper>
      {channel?.show_config.show_bookmark && (
        <UnsignedChecker fallbackType={PermissionDeniedFallbackType.ALERT}>
          {!post?.is_bookmarked ? (
            <IconWrapper onClick={handleBookmark}>
              <UnBookmarkIcon />
            </IconWrapper>
          ) : (
            <IconWrapper onClick={handleUnBookmark}>
              <BookmarkIcon />
            </IconWrapper>
          )}
        </UnsignedChecker>
      )}
      {!isMobile && (
        <>
          <IconWrapper onClick={handleClickMenu} ref={refMenuButton}>
            <MoreIcon />
          </IconWrapper>

          <ForumShowMenu
            open={openMenu}
            rootId={post.parent_id}
            threadId={post.id}
            authorId={post.author}
            refMenuButton={refMenuButton}
            onClose={handleCloseRequestMenu}
            onDeleteThread={handleDeleteThread}
          />
        </>
      )}
    </Wrapper>
  );
});
