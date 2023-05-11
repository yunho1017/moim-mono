import * as React from "react";
import { useStoreState } from "app/store";
import styled, { css } from "styled-components";
import {
  H10BoldStyle,
  B3RegularStyle,
} from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";
import { LinkController, TabMenuSkeleton } from "../../helper";
import { SubTabWrapper } from "../../mobile/styled";

export const TabItem = styled.div<{
  isSelected: boolean;
  isScrollVisible: boolean;
}>`
  margin: 0 ${px2rem(12)};
  padding: ${px2rem(10)} 0;
  color: ${props => props.theme.colorV2.colorSet.grey300};
  ${B3RegularStyle}
  ${props =>
    props.isSelected &&
    css`
      color: ${props.theme.colorV2.colorSet.grey800};
      ${H10BoldStyle}
    `};
  ${props =>
    props.isScrollVisible
      ? css`
          animation: fadeIn 0.6s;
        `
      : css`
          animation: fadeOut 0.6s;
        `}

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

interface IItemProps {
  isSelected: boolean;
  channelId: string;
  isScrollVisible: boolean;
}

const SubTabItem = ({ isSelected, channelId, isScrollVisible }: IItemProps) => {
  const scrollRef = React.useRef<HTMLDivElement | null>(null);
  const channel = useStoreState(state => state.entities.channels[channelId]);

  React.useEffect(() => {
    if (isSelected) {
      scrollRef?.current?.scrollIntoView({
        behavior: "auto",
        block: "nearest",
        inline: "center",
      });
    }
  }, [isSelected]);

  return (
    <LinkController channel={channel}>
      <TabItem
        ref={scrollRef}
        key={channelId}
        isSelected={isSelected}
        isScrollVisible={isScrollVisible}
      >
        {channel?.name}
      </TabItem>
    </LinkController>
  );
};

interface IProps {
  tabs: Moim.Group.ITopTabMenu[];
  homeId: string;
  paramsId?: string;
  isLoading: boolean;
  isScrollVisible: boolean;
}

const SubTab = ({
  tabs,
  isLoading,
  isScrollVisible,
  paramsId,
  homeId,
}: IProps) => {
  if (isLoading) {
    return <SubTabWrapper isScrollVisible>{TabMenuSkeleton(5)}</SubTabWrapper>;
  }

  return (
    <SubTabWrapper isScrollVisible={isScrollVisible}>
      {tabs.map((sub, index) => (
        <SubTabItem
          key={
            sub.type === "home"
              ? homeId || `top-tab-home-${index}`
              : sub.channelId
          }
          channelId={sub.type === "home" ? homeId : sub.channelId!}
          isSelected={
            sub.type === "home"
              ? homeId === paramsId
              : sub.channelId === paramsId
          }
          isScrollVisible={isScrollVisible}
        />
      ))}
    </SubTabWrapper>
  );
};

export default React.memo(SubTab);
