// hook
import useHover from "common/hooks/useHover";
import { useStoreState } from "app/store";
import useMatchRoute from "common/hooks/useMatchRoute";
// type
import { IProps } from "../";
// helper
import {
  unreadCountSelector,
  channelUnreadStatusSelector,
} from "app/selectors/channel";

import isSelectedChannel from "common/helpers/isSelectedChannel";
import useIsLimitedChannel from "common/hooks/useIsLimitedChannel";

export const MAX_UNREAD_COUNT = 9;

export type IHookProps = ReturnType<typeof useProps>;

export function useProps(props: IProps) {
  const { channelId } = props;
  const { channel, unreadCount } = useStoreState(storeState => ({
    channel: storeState.entities.channels[
      channelId
    ] as Moim.Channel.SimpleChannelWithoutCategoryType,
    unreadCount: unreadCountSelector(storeState, channelId),
  }));
  const isUnread = useStoreState(state =>
    channelUnreadStatusSelector(state, channel),
  );
  const selectedChannel = useMatchRoute();
  const [hoverRef, isHovered] = useHover<HTMLDivElement>();

  const unreadCountMessage =
    unreadCount > MAX_UNREAD_COUNT ? `${MAX_UNREAD_COUNT}+` : unreadCount;

  const isSelected = isSelectedChannel(
    selectedChannel,
    channel.type,
    channel.id,
  );

  const isLimited = useIsLimitedChannel(channel.id);

  return {
    ...props,
    channel,
    unreadCount,
    unreadCountMessage,
    hoverRef,
    isSelected,
    isHovered,
    isUnread,
    isLimited,
  };
}
