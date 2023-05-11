// vendor
import * as React from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
// component
import { ThreadRenderer } from "common/components/thread";
import PostItemAutoFocusController from "./components/postItemAutoFocusController";
import { PinnedIcon } from "./styledComponents";
import { DefaultDivider } from "common/components/divider";

import useIsMobile from "common/hooks/useIsMobile";
import { useStoreState } from "app/store";
import { useListItemImageScale } from "common/components/lazyBlurHashImage";
import { MoimURL } from "common/helpers/url";
import { PostShowTypes } from "app/enums";
import { ForumContext } from "app/modules/forum/context";
import getIsUnread from "common/helpers/getIsUnread";
import { forumConfig2ItemConfig } from "common/components/thread/helper";
import { px2rem } from "common/helpers/rem";
import { Thread } from "app/typings";
import { AnalyticsClass } from "common/helpers/analytics/analytics";

const StyledThreadRenderer = styled(ThreadRenderer)<{
  selected: boolean;
  viewType: Thread.THREAD_VIEW_TYPE;
}>`
  ${props =>
    props.selected &&
    css`
      background-color: ${props.theme.colorV2.colorSet.grey50};
    `};

  ${props => {
    switch (props.viewType) {
      case "compact-conversation":
        return css`
          width: 100%;
          height: calc(100% - ${px2rem(6 * 2)});
          margin: ${px2rem(6)} 0;
        `;
      default:
        return css`
          width: 100%;
          height: 100%;
          padding: ${px2rem(16)} 0;
        `;
    }
  }};
`;
export interface IProps {
  thread: Moim.Forum.IThread;
  selected: boolean;
  config?: Moim.Forum.IForumListConfig;
  pinned?: boolean;
  disableHyperLink?: boolean;
  disableAnonymousSuffix?: boolean;
}

const PostItem = React.memo(function PostItem(props: IProps) {
  const {
    thread,
    selected,
    pinned,
    config,
    disableHyperLink,
    disableAnonymousSuffix,
  } = props;
  const { refBody, showType } = React.useContext(ForumContext);
  const { threadStat } = useStoreState(state => ({
    threadStat: state.entities.stats[thread.id],
  }));
  const isMobile = useIsMobile();
  const imageScale = useListItemImageScale();

  const titlePrefix = React.useMemo(() => (pinned ? <PinnedIcon /> : null), [
    pinned,
  ]);

  const stat = React.useMemo(
    () => ({
      count: threadStat?.count,
      isUnread:
        (thread.read_at !== undefined && !thread.read_at) ||
        getIsUnread({
          latest: thread.latest,
          lastRead: threadStat?.last_read,
          statCount: threadStat?.count,
        }),
    }),
    [threadStat?.count, threadStat?.last_read, thread?.read_at, thread.latest],
  );

  const handleClick = React.useCallback(() => {
    AnalyticsClass.getInstance().formListPostSelect({
      forumId: thread.root_id ?? "",
      postId: thread.id ?? "",
    });

    if (showType !== PostShowTypes.MODAL && !isMobile) {
      requestAnimationFrame(() => {
        refBody?.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    }
  }, [thread.root_id, thread.id, showType, isMobile]);

  const parsedConfig = React.useMemo(() => forumConfig2ItemConfig(config), [
    config,
  ]);
  const viewType = config?.view_type ?? "post";

  const element = React.useMemo(
    () => (
      <>
        <StyledThreadRenderer
          viewType={viewType}
          threadId={thread.id}
          config={parsedConfig}
          stat={stat}
          titlePrefix={titlePrefix}
          selected={selected}
          thumbnailScale={imageScale}
          disableAnonymousSuffix={disableAnonymousSuffix}
        />
        {viewType === "post" && <DefaultDivider />}
      </>
    ),
    [
      imageScale,
      parsedConfig,
      selected,
      stat,
      thread.id,
      titlePrefix,
      viewType,
      disableAnonymousSuffix,
    ],
  );

  return (
    <PostItemAutoFocusController
      key={`forum_thread_list_thread_${thread.id}`}
      selected={selected}
      isMobile={isMobile}
      threadId={thread.id}
    >
      {disableHyperLink ? (
        element
      ) : (
        <Link
          to={new MoimURL.ShowForumThread({
            threadId: thread.id,
            forumId: thread.parent_id,
          }).toString()}
          onClick={handleClick}
        >
          {element}
        </Link>
      )}
    </PostItemAutoFocusController>
  );
});

export default PostItem;
