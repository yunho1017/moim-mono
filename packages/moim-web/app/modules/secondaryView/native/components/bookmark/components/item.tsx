import * as React from "react";
import styled from "styled-components";
import { ThreadRenderer } from "common/components/thread";

import { px2rem } from "common/helpers/rem";
import { B4Regular } from "common/components/designSystem/typos";
import { Spacer } from "common/components/designSystem/spacer";
import useRedirect from "common/hooks/useRedirect";
import useCurrentGroup from "common/hooks/useCurrentGroup";
import { MoimURL } from "common/helpers/url";
import { forumConfig2ItemConfig } from "common/components/thread/helper";
import { Thread } from "app/typings";
import { useListItemImageScale } from "common/components/lazyBlurHashImage";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const AnchorWrapper = styled.a`
  display: flex;
  flex-direction: column;
`;

const HeaderStatus = styled(B4Regular)`
  color: ${props => props.theme.colorV2.colorSet.grey300};
`;

const PostItemHeader = styled.div`
  padding: 0 ${px2rem(16)};
  display: flex;
  align-items: center;
  ${HeaderStatus} + ${HeaderStatus}:before {
    content: "･";
    margin: 0 ${px2rem(2)};
  }
`;

const StyledThreadRenderer = styled(ThreadRenderer)`
  margin: ${px2rem(8)} 0;
  padding: ${px2rem(8)} ${px2rem(16)};
`;

interface IProps {
  bookmark: Moim.Bookmark.IBookmark;
}

export default function PostItem({ bookmark }: IProps) {
  const redirect = useRedirect();
  const currentGroup = useCurrentGroup();
  const imageScale = useListItemImageScale();
  const { channel, resource: thread, group } = bookmark;

  const isSameMoim = React.useMemo(() => currentGroup?.id === group.id, [
    group,
    currentGroup,
  ]);

  const handleClickWrapper = React.useCallback(() => {
    if (isSameMoim) {
      redirect(
        new MoimURL.ShowForumThread({
          forumId: channel.id,
          threadId: thread.id,
        }).toString(),
      );
    }
  }, [isSameMoim, channel, thread]);

  const config: Partial<Thread.IThreadItemConfig> = React.useMemo(() => {
    return {
      ...forumConfig2ItemConfig(channel.list_config),
      showAuthor: true,
      showDate: true,
      showThumbnail: true,
      showTitle: true,
      showText: true,
      textAlignment: "LEFT",
      thumbnailConfig: {
        type: "ratio",
        value: "5:3",
        position: "left",
      },
      viewType: channel.list_config.view_type,
      viewType_web: channel.list_config.view_type,
    };
  }, [channel.list_config]);

  const inner = React.useMemo(
    () => (
      <>
        <Spacer value={8} />
        <PostItemHeader>
          <HeaderStatus>{group.name}</HeaderStatus>
          <HeaderStatus>{channel.name}</HeaderStatus>
        </PostItemHeader>
        <StyledThreadRenderer
          threadId={thread.id}
          config={config}
          thumbnailScale={imageScale}
        />
      </>
    ),
    [group.name, channel.name, thread, config],
  );
  return isSameMoim ? (
    <Wrapper onClick={handleClickWrapper}>{inner}</Wrapper>
  ) : (
    <AnchorWrapper
      href={`${group.url}${new MoimURL.ShowForumThread({
        forumId: channel.id,
        threadId: thread.id,
      }).toString()}`}
      target="_blank"
    >
      {inner}
    </AnchorWrapper>
  );
}
