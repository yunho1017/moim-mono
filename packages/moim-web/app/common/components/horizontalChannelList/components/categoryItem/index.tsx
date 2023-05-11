import * as React from "react";

import { DropdownIcon, MoreIconWrapper, CategoryName } from "./styled";
import { ItemWrapper, WithUnreadStatusBadgeWrapper } from "../styled";
import Popover, { PopoverInner } from "../popover";
import PopoverChannelItem from "../popoverChannelItem";
import ChannelUnreadCount from "../channelUnreadCount";

import useMatchRoute from "common/hooks/useMatchRoute";
import { useStoreState } from "app/store";
import isSelectedChannel from "common/helpers/isSelectedChannel";
import {
  gethasUnreadFromChannelList,
  getTotalUnreadCountFromChannelList,
} from "../../helper";

interface IProps {
  category: Moim.Channel.ICategory;
  elementPaletteProps?: Moim.Theme.CommonElementThemePaletteProps;
  onClickChannel(channel: Moim.Channel.SimpleChannelWithoutCategoryType): void;
}

export default function CategoryItem({
  category,
  elementPaletteProps,
  onClickChannel,
}: IProps) {
  const refThis = React.useRef<HTMLDivElement>(null);
  const [open, setOpen] = React.useState<boolean>(false);

  const { totalUnreadCount, hasUnread } = useStoreState(state => {
    const channels = category.items;
    const totalUnreadCount = getTotalUnreadCountFromChannelList(
      state,
      channels,
    );
    return {
      totalUnreadCount,
      hasUnread:
        totalUnreadCount === 0
          ? gethasUnreadFromChannelList(state, channels)
          : false,
    };
  });

  const selectedChannel = useMatchRoute();
  const isSelected = React.useMemo(
    () =>
      Boolean(
        category.items?.find(item =>
          isSelectedChannel(selectedChannel, item.type, item.id),
        ),
      ),
    [category, selectedChannel],
  );

  const handleClickCategory = React.useCallback(() => {
    setOpen(true);
  }, [category]);

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
      category.items?.map(channel => {
        return (
          <PopoverChannelItem
            key={channel.id}
            channel={channel}
            onClick={handleClickChannel}
          />
        );
      }),
    [category.items, handleClickChannel],
  );

  return (
    <>
      <ItemWrapper
        ref={refThis}
        onClick={handleClickCategory}
        isCategory={true}
        elementPaletteProps={elementPaletteProps}
        selected={isSelected}
      >
        <CategoryName>
          <WithUnreadStatusBadgeWrapper isUnread={hasUnread}>
            {category.name}
          </WithUnreadStatusBadgeWrapper>
        </CategoryName>
        <ChannelUnreadCount count={totalUnreadCount} />
        <MoreIconWrapper
          popoverOpend={open}
          elementPaletteProps={elementPaletteProps}
        >
          <DropdownIcon elementPaletteProps={elementPaletteProps} />
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
