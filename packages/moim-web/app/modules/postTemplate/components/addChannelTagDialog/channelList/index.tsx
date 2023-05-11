import * as React from "react";
import styled from "styled-components";
import Item from "./item";
import { useStoreState } from "app/store";
import { channelWithoutCategorySelector } from "app/selectors/channel";
import { PostTemplateContext } from "app/modules/postTemplate/context";

const Section = styled.div``;

interface IProps {
  isSelected(userId: Moim.Id): boolean;
  onSelected(userId: Moim.Id): void;
}
export default function ChannelList({ isSelected, onSelected }: IProps) {
  const { currentPostTemplate } = React.useContext(PostTemplateContext);
  const { channels } = useStoreState(state => ({
    channels: channelWithoutCategorySelector(state)?.filter(
      channel =>
        channel.type === "forum" &&
        !currentPostTemplate?.channelIds?.includes(channel.id),
    ) as Moim.Channel.IForumSimpleChannel[],
  }));
  return (
    <Section>
      {channels
        ?.filter(channel => channel.type === "forum")
        .map(channel => (
          <Item
            key={channel.id}
            channel={channel}
            isSelected={isSelected(channel.id)}
            onClick={onSelected}
          />
        ))}
    </Section>
  );
}
