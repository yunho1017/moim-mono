// vendor
import * as React from "react";
// component
import { WithCategory } from "./components/withCategory";
import ChannelItem from "./components/channelItem";

export { ChannelItem, WithCategory };

interface IProps extends React.ComponentProps<typeof WithCategory> {
  channelList: Exclude<Moim.Channel.SimpleChannelType, { type: "category" }>[];
  elementPaletteKey?: Moim.Theme.SideAreaElementThemePaletteKey;
  onClickChannelItem(channel: Moim.Channel.SimpleChannelType): void;
  onInViewChange(
    visible: boolean,
    channel: Moim.Id,
    ref: React.RefObject<any>,
    statCount?: number,
  ): void;
}

export default function ChannelList({
  channelList,
  elementPaletteKey,
  onClickChannelItem,
  onInViewChange,
  ...props
}: IProps) {
  const channelItemList = React.useMemo(
    () =>
      channelList.map(channel => (
        <ChannelItem
          key={channel.id}
          channelId={channel.id}
          isMuted={false}
          elementPaletteKey={elementPaletteKey}
          onClickChannel={onClickChannelItem}
          onInViewChange={onInViewChange}
        />
      )),
    [elementPaletteKey, channelList, onClickChannelItem, onInViewChange],
  );

  return <WithCategory {...props}>{channelItemList} </WithCategory>;
}
