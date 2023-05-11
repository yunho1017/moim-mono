import * as React from "react";
import { FormattedMessage } from "react-intl";

import { MoreIcon, MoreIconWrapper, wrapperStyle, Title } from "./styled";
import { ItemWrapper, WithUnreadStatusBadgeWrapper } from "../styled";
import Popover, { PopoverInner } from "../popover";
import PopoverCategoryItem, {
  WithPopoverCategory,
} from "../popoverCategoryItem";
import PopoverChannelItem from "../popoverChannelItem";
import ChannelUnreadCount from "../channelUnreadCount";

import useMatchRoute from "common/hooks/useMatchRoute";
import { useStoreState } from "app/store";
import {
  unreadCountSelector,
  channelUnreadStatusSelector,
} from "app/selectors/channel";
import isSelectedChannel from "common/helpers/isSelectedChannel";
import {
  gethasUnreadFromChannelList,
  getTotalUnreadCountFromChannelList,
} from "../../helper";

interface IProps {
  channelList: Moim.Channel.SimpleChannelType[];
  elementPaletteProps?: Moim.Theme.CommonElementThemePaletteProps;
  onClickChannel(channel: Moim.Channel.SimpleChannelWithoutCategoryType): void;
}
export default function MoreButton({
  channelList,
  elementPaletteProps,
  onClickChannel,
}: IProps) {
  const refThis = React.useRef<HTMLDivElement>(null);
  const [open, setOpen] = React.useState<boolean>(false);

  const selectedChannel = useMatchRoute();
  const isSelected = React.useMemo(
    () =>
      channelList.some(channel => {
        if (channel.type === "category") {
          return Boolean(
            channel.items?.find(item =>
              isSelectedChannel(selectedChannel, item.type, item.id),
            ),
          );
        }

        return isSelectedChannel(selectedChannel, channel.type, channel.id);
      }),
    [channelList, selectedChannel],
  );

  const { totalUnreadCount, hasUnread } = useStoreState(state => {
    const totalUnreadCount = channelList?.reduce((total, current) => {
      if (current.type === "category") {
        return total + getTotalUnreadCountFromChannelList(state, current.items);
      }
      return total + unreadCountSelector(state, current.id);
    }, 0);

    return {
      totalUnreadCount,
      hasUnread:
        totalUnreadCount === 0
          ? channelList?.some(channel => {
              if (channel.type === "category") {
                return gethasUnreadFromChannelList(state, channel.items);
              }

              return channelUnreadStatusSelector(state, channel);
            })
          : false,
    };
  });

  const handleClickMoreButton = React.useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const handleClose = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const handleClickChannel = React.useCallback(
    (channel: Moim.Channel.SimpleChannelWithoutCategoryType) => {
      handleClose();
      onClickChannel(channel);
    },
    [handleClose, onClickChannel],
  );

  const channelListElement = React.useMemo(
    () =>
      channelList.map(channel => {
        if (channel.type === "category") {
          return (
            <WithPopoverCategory>
              <PopoverCategoryItem
                key={channel.id}
                id={channel.id}
                name={channel.name}
              />
              {channel.items?.map(item => (
                <PopoverChannelItem
                  key={item.id}
                  channel={item}
                  onClick={handleClickChannel}
                />
              ))}
            </WithPopoverCategory>
          );
        }

        return (
          <PopoverChannelItem
            key={channel.id}
            channel={channel}
            onClick={handleClickChannel}
          />
        );
      }),
    [channelList, handleClickChannel],
  );

  if (!channelList.length) {
    return null;
  }

  return (
    <>
      <ItemWrapper
        ref={refThis}
        isCategory={true}
        onClick={handleClickMoreButton}
        overrideStyle={wrapperStyle}
        elementPaletteProps={elementPaletteProps}
        selected={isSelected}
      >
        <Title>
          <WithUnreadStatusBadgeWrapper isUnread={hasUnread}>
            <FormattedMessage id="shaved_more" />
          </WithUnreadStatusBadgeWrapper>
        </Title>
        <ChannelUnreadCount count={totalUnreadCount} />
        <MoreIconWrapper
          popoverOpend={open}
          elementPaletteProps={elementPaletteProps}
        >
          <MoreIcon elementPaletteProps={elementPaletteProps} />
        </MoreIconWrapper>
      </ItemWrapper>
      <Popover
        open={open}
        anchorEl={refThis.current}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handleClose}
      >
        <PopoverInner>{channelListElement}</PopoverInner>
      </Popover>
    </>
  );
}
