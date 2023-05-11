import * as React from "react";
import styled from "styled-components";
import {
  ItemWrapper,
  LinkChannelNameWrapper,
  WithUnreadStatusBadgeWrapper,
  LinkChannelIcon,
} from "../styled";
import ChannelUnreadCount from "../channelUnreadCount";
import {
  B3RegularStyle,
  H10BoldStyle,
} from "common/components/designSystem/typos";
import useRedirect from "common/hooks/useRedirect";
import { useStoreState } from "app/store";
import {
  unreadCountSelector,
  channelUnreadStatusSelector,
} from "app/selectors/channel";

import useMatchRoute from "common/hooks/useMatchRoute";
import isSelectedChannel from "common/helpers/isSelectedChannel";

const ChannelName = styled.div<{ selected: boolean }>`
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  ${props => (props.selected ? H10BoldStyle : B3RegularStyle)}
`;

interface IProps {
  channel: Moim.Channel.SimpleChannelWithoutCategoryType;
  elementPaletteProps?: Moim.Theme.CommonElementThemePaletteProps;
  onClickChannel(channel: Moim.Channel.SimpleChannelWithoutCategoryType): void;
}

function LinkChannelController({
  channel,
  elementPaletteProps,
  children,
}: React.PropsWithChildren<Pick<IProps, "channel" | "elementPaletteProps">>) {
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
    return <>{children}</>;
  }

  return (
    <LinkChannelNameWrapper>
      <a onClick={handleClick}>
        {children}
        <LinkChannelIcon elementPaletteProps={elementPaletteProps} />
      </a>
    </LinkChannelNameWrapper>
  );
}

export default function ChannelItem({
  channel,
  elementPaletteProps,
  onClickChannel,
}: IProps) {
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
      <>
        <ChannelName selected={isSelected}>
          <WithUnreadStatusBadgeWrapper isUnread={isUnread}>
            {channel.name}
          </WithUnreadStatusBadgeWrapper>
        </ChannelName>
        <ChannelUnreadCount count={unreadCount} />
      </>
    );
  }, [isUnread, isSelected, unreadCount, channel]);

  const handleClick = React.useCallback(() => {
    onClickChannel(channel);
  }, [channel, onClickChannel]);

  return (
    <ItemWrapper
      onClick={handleClick}
      elementPaletteProps={elementPaletteProps}
      selected={isSelected}
    >
      <LinkChannelController
        channel={channel}
        elementPaletteProps={elementPaletteProps}
      >
        {channelNameElement}
      </LinkChannelController>
    </ItemWrapper>
  );
}
