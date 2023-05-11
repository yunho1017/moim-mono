import * as React from "react";
import styled, { css } from "styled-components";
import { B3RegularStyle } from "common/components/designSystem/typos";
import { CommonBadge } from "common/components/alertBadge";
import {
  channelUnreadStyle,
  LinkChannelIcon,
  LinkChannelNameWrapper,
} from "../styled";
import ChannelUnreadCount from "../channelUnreadCount";

import { useStoreState } from "app/store";
import {
  channelUnreadStatusSelector,
  unreadCountSelector,
} from "app/selectors/channel";
import useMatchRoute from "common/hooks/useMatchRoute";
import isSelectedChannel from "common/helpers/isSelectedChannel";
import {
  useHoverStyle,
  useSelectedStyle,
  useSingleLineStyle,
} from "common/components/designSystem/styles";
import { px2rem } from "common/helpers/rem";
import useRedirect from "common/hooks/useRedirect";

const ChannelNameWrapper = styled.div`
  flex: 1;
  min-width: 0;
`;

export const PopoverChannelItemWrapper = styled.div.attrs({ role: "button" })<{
  selected?: boolean;
}>`
  width: 100%;
  height: ${px2rem(42)};
  padding: 0 ${px2rem(16)};
  color: ${props => props.theme.colorV2.colorSet.grey600};
  display: flex;
  align-items: center;

  * > & + ${CommonBadge} {
    margin-left: ${px2rem(12)};
  }

  ${props =>
    props.selected &&
    css`
      color: ${props.theme.colorV2.colorSet.grey800};
      ${useSelectedStyle}
    `}

  ${useHoverStyle}
`;
const PopoverChannelName = styled.span<{
  isUnread?: boolean;
}>`
  display: inline-block;
  position: relative;
  max-width: 100%;

  ${channelUnreadStyle};
  ${useSingleLineStyle};
  ${B3RegularStyle};
  color: ${props =>
    props.isUnread
      ? props.theme.colorV2.colorSet.grey800
      : props.theme.colorV2.colorSet.grey600};

  ${props =>
    props.isUnread &&
    css`
      font-weight: ${props.theme.font.bolder};
    `}
`;

function LinkChannelController({
  channel,
  children,
}: React.PropsWithChildren<{
  channel: Moim.Channel.SimpleChannelWithoutCategoryType;
}>) {
  const redirect = useRedirect();

  const handleClick = React.useCallback(() => {
    if (channel.type === "link" && channel.url) {
      redirect(channel.url);
    }
  }, [
    channel.type,
    (channel as Moim.Channel.ILinkSimpleChannel).url,
    redirect,
  ]);

  if (channel.type !== "link") {
    return <ChannelNameWrapper>{children}</ChannelNameWrapper>;
  }

  return (
    <LinkChannelNameWrapper>
      <a onClick={handleClick}>
        {children}
        <LinkChannelIcon />
      </a>
    </LinkChannelNameWrapper>
  );
}

export default function PopoverChannelItem({
  channel,
  onClick,
}: {
  channel: Moim.Channel.SimpleChannelWithoutCategoryType;
  onClick(channel: Moim.Channel.SimpleChannelWithoutCategoryType): void;
}) {
  const { unreadCount, isUnread } = useStoreState(state => {
    const unread = unreadCountSelector(state, channel.id);
    return {
      unreadCount: unread,
      isUnread:
        unread === 0 ? channelUnreadStatusSelector(state, channel) : false,
    };
  });

  const selectedChannel = useMatchRoute();
  const isSelected = React.useMemo(
    () => isSelectedChannel(selectedChannel, channel.type, channel.id),
    [selectedChannel, channel],
  );

  const channelNameElement = React.useMemo(() => {
    return (
      <PopoverChannelName isUnread={isUnread}>
        {channel.name}
      </PopoverChannelName>
    );
  }, [isUnread, channel, unreadCount]);

  const handleClick = React.useCallback(() => {
    onClick(channel);
  }, [onClick, channel]);

  return (
    <PopoverChannelItemWrapper
      key={channel.id}
      selected={isSelected}
      onClick={handleClick}
    >
      <LinkChannelController channel={channel}>
        {channelNameElement}
      </LinkChannelController>
      <ChannelUnreadCount count={unreadCount} />
    </PopoverChannelItemWrapper>
  );
}
