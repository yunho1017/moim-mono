import * as React from "react";
import styled, { css } from "styled-components";
import { useStoreState } from "app/store";
import {
  B2RegularStyle,
  H9BoldStyle,
} from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";
import { LinkController, TabMenuSkeleton } from "../../helper";
import { MainTabWrapper } from "../../mobile/styled";

export const TabItem = styled.div<{ isSelected: boolean }>`
  position: relative;
  margin: 0 ${px2rem(12)};
  padding: ${px2rem(10)} 0;
  color: ${props => {
    const palette = props.theme.getTopAreaElementPalette("others");
    return palette.color ?? palette.fog400;
  }};
  ${B2RegularStyle}
  ${props => {
    const palette = props.theme.getTopAreaElementPalette("others");
    const textColor = palette.color ?? palette.fog800;
    return (
      props.isSelected &&
      css`
        color: ${textColor};
        ${H9BoldStyle}
        border-bottom: ${px2rem(2)} solid ${textColor}
      `
    );
  }};
`;

interface IItemProps {
  isSelected: boolean;
  defaultChildId?: string;
  itemId: string;
}

const MainTabItem = ({ isSelected, itemId, defaultChildId }: IItemProps) => {
  const scrollRef = React.useRef<HTMLDivElement | null>(null);
  const { channel, subChannel } = useStoreState(state => ({
    channel: state.entities.channels[itemId],
    subChannel: defaultChildId
      ? state.entities.channels[defaultChildId]
      : undefined,
  }));

  React.useEffect(() => {
    if (isSelected) {
      scrollRef?.current?.scrollIntoView({
        behavior: "auto",
        block: "nearest",
        inline: "center",
      });
    }
  }, [isSelected]);

  const linkChannel = subChannel ?? channel;

  return (
    <LinkController channel={linkChannel}>
      <TabItem ref={scrollRef} key={itemId} isSelected={isSelected}>
        {channel?.name}
      </TabItem>
    </LinkController>
  );
};

interface IProps {
  tabs?: Moim.Group.ITopTabMenu[];
  onCheckActive: (id?: string) => boolean;
  homeId: string;
  isLoading: boolean;
}

const MainTab = ({ tabs = [], onCheckActive, homeId, isLoading }: IProps) => {
  if (isLoading) {
    return <MainTabWrapper>{TabMenuSkeleton(4)}</MainTabWrapper>;
  }

  return (
    <MainTabWrapper>
      {tabs.map(item => (
        <MainTabItem
          key={item.channelId}
          isSelected={onCheckActive(
            item.type === "home" ? homeId : item.channelId,
          )}
          itemId={item.type === "home" ? homeId : item.channelId!}
          defaultChildId={item?.items?.[0]?.channelId}
        />
      ))}
    </MainTabWrapper>
  );
};

export default React.memo(MainTab);
