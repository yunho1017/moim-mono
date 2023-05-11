import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { B3Regular } from "common/components/designSystem/typos";

import { useStoreState } from "app/store";
import useCurrentGroup from "common/hooks/useCurrentGroup";

import { MoimURL } from "common/helpers/url";
import { PostShowContext } from "app/modules/postShow/context";
const Wrapper = styled(B3Regular)`
  color: ${props => props.theme.colorV2.colorSet.grey600};
  display: inline-block;
`;

export default function ChannelName() {
  const { post } = React.useContext(PostShowContext);
  const currentGroup = useCurrentGroup();
  const { group, channel } = useStoreState(state => ({
    group: post.groupId ? state.entities.groups[post.groupId] : undefined,
    channel: state.entities.channels[post.parent_id] as
      | Moim.Channel.IForumSimpleChannel
      | undefined,
  }));

  const isDifferentMoim = Boolean(group && currentGroup?.id !== group?.id);

  const inner = React.useMemo(() => {
    if (isDifferentMoim) {
      return <Wrapper>{`${group!.name} ・ ${channel?.name}`}</Wrapper>;
    } else {
      return <Wrapper>{channel?.name}</Wrapper>;
    }
  }, [isDifferentMoim, group, channel]);

  return isDifferentMoim ? (
    <a
      href={`${group!.url}${new MoimURL.Forum({
        forumId: post.parent_id,
      }).toString()}`}
      target="_blank"
    >
      {inner}
    </a>
  ) : (
    <Link
      to={new MoimURL.Forum({
        forumId: post.parent_id,
      }).toString()}
    >
      {inner}
    </Link>
  );
}
