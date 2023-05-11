import * as React from "react";

import { useActions, useStoreState } from "app/store";
import useCancelToken from "common/hooks/useCancelToken";

import ThreadShow from "./components/threadShow";
import ForumShowHeader from "./components/header";
import PostShowBottom from "./components/bottom";
import {
  Divider,
  PostShowWrapper,
  PostShowBottomWrapper,
  ForumContainer,
} from "./styled";

import { getPermission } from "app/actions/permission";
import { getChannel } from "app/actions/channel";
import { PostShowContext, defaultShowConfig } from "./context";

import { getGroupData } from "app/actions/group";
import { AnalyticsClass } from "common/helpers/analytics/analytics";

interface IProps {
  isModalShow: boolean;
  post: Moim.Forum.IThread;
  tagSetIds?: Moim.Id[];
  showConfig?: Omit<Moim.Forum.IForumShowConfig, "show_type">;
  className?: string;
  onBack(): void;
  onClickTagItem?(tagItem: Moim.TagSet.ITagItem): void;
}

const PostShow: React.FC<IProps> = ({
  isModalShow,
  post,
  tagSetIds,
  showConfig: showConfigProps,
  className,
  onBack,
  onClickTagItem,
}) => {
  const forumShowContainerRef = React.useRef<HTMLDivElement>(null);
  const forumShowRef = React.useRef<HTMLDivElement>(null);
  const cancelToken = useCancelToken();

  const {
    group,
    channel,
    channelPermissionLoading,
    permissionLoading,
  } = useStoreState(state => ({
    group: post.groupId ? state.entities.groups[post.groupId] : undefined,
    channel: state.entities.channels[post.parent_id] as
      | Moim.Channel.IForumSimpleChannel
      | undefined,
    channelPermissionLoading:
      state.permission.permissionLoading[post.parent_id],
    permissionLoading: state.permission.permissionLoading[post.id],
  }));

  const {
    dispatchGetChannel,
    dispatchGetGroup,
    dispatchGetPermission,
  } = useActions({
    dispatchGetChannel: getChannel,
    dispatchGetGroup: getGroupData,
    dispatchGetPermission: getPermission,
  });

  const showConfig = React.useMemo(
    () => showConfigProps ?? channel?.show_config ?? defaultShowConfig,
    [showConfigProps, channel?.show_config],
  );

  const contextValue = React.useMemo(
    () => ({
      isModalShow,
      post,
      showConfig,
      containerRef: forumShowContainerRef,
      forumShowRef,
      onBack,
    }),
    [isModalShow, post, showConfig, onBack],
  );

  React.useEffect(() => {
    if (!group && post.groupId) {
      dispatchGetGroup(post.groupId);
    }
    if (!channel) {
      dispatchGetChannel(
        { channelId: post.parent_id },
        cancelToken.current.token,
      );
    }

    if (permissionLoading === undefined) {
      dispatchGetPermission(
        { resource: post.id },
        cancelToken.current.token,
        post.groupId,
      );
    }

    if (channelPermissionLoading === undefined) {
      dispatchGetPermission(
        { resource: post.parent_id },
        cancelToken.current.token,
        post.groupId,
      );
    }
  }, [
    cancelToken,
    channel,
    channelPermissionLoading,
    dispatchGetChannel,
    dispatchGetGroup,
    dispatchGetPermission,
    group,
    permissionLoading,
    post.groupId,
    post.id,
    post.parent_id,
  ]);

  React.useEffect(() => {
    if (channel) {
      AnalyticsClass.getInstance().forumPostView({
        forumId: channel?.id ?? "",
        forumName: channel?.name ?? "",
        postId: post.id,
        postTitle: post.title,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post.id]);

  return (
    <PostShowContext.Provider value={contextValue}>
      <ForumContainer
        className={className}
        isModalShow={isModalShow}
        ref={forumShowContainerRef}
      >
        <ForumShowHeader />
        <PostShowWrapper ref={forumShowRef}>
          <ThreadShow
            tagSetIds={tagSetIds}
            followerCount={0}
            onClickTagItem={onClickTagItem}
          />
        </PostShowWrapper>
        {showConfig.show_comment_area && <Divider />}
        <PostShowBottomWrapper>
          <PostShowBottom />
        </PostShowBottomWrapper>
      </ForumContainer>
    </PostShowContext.Provider>
  );
};

export default PostShow;
