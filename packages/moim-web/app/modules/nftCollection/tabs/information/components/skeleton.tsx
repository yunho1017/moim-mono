import * as React from "react";
import styled from "styled-components";
// helpers
import { px2rem } from "common/helpers/rem";
// hooks
import useIsMobile from "common/hooks/useIsMobile";
// components
import { Spacer } from "common/components/designSystem/spacer";
import { SkeletonBox, SkeletonCircleBox } from "common/components/skeleton";
import { HolderListWrapper } from "app/modules/nftCollection/components/holderList";
import { DescWrapper } from "app/modules/nftCollection/components/description";
import Skeleton from "common/components/NFTItemCell/skeleton";
// style
import {
  Wrapper,
  InnerWrapper,
} from "app/modules/nftCollection/components/list/styled";
import {
  ScheduleListBanner,
  ScheduleListItem,
  ScheduleListItemContainer,
  ScheduleListItemLeft,
  ScheduleListItemRight,
} from "app/modules/nftCollection/components/scheduleList/components/styled";
import { InformationWrapper, Left, Right } from "../styled";

const SkeletonHolderWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${px2rem(4)};
`;

const SkeletonHolderListWrapper = styled(HolderListWrapper)`
  padding: ${px2rem(24)};
`;

export const NFTCollectionSkeleton: React.FC = () => {
  const isMobile = useIsMobile();

  const itemElements = React.useMemo(
    () => (
      <>
        {new Array(isMobile ? 4 : 8).fill(0).map(_ => (
          <Skeleton />
        ))}
      </>
    ),
    [isMobile],
  );

  if (isMobile) {
    return (
      <>
        <Spacer value={16} />
        <ScheduleListItem>
          <ScheduleListBanner>
            <SkeletonBox width="100%" height={px2rem(80)} />
          </ScheduleListBanner>
          <ScheduleListItemContainer>
            <ScheduleListItemLeft hasFullWidth={true}>
              <SkeletonBox width="60%" height={px2rem(20)} />
              <Spacer value={10} />
              <SkeletonBox width="80%" height={px2rem(20)} />
              <Spacer value={10} />
              <SkeletonBox width="40%" height={px2rem(20)} />
            </ScheduleListItemLeft>
          </ScheduleListItemContainer>
        </ScheduleListItem>
        <Wrapper>
          <Spacer value={8} />
          <InnerWrapper columnCount={2}>{itemElements}</InnerWrapper>
          <Spacer value={10} />
        </Wrapper>
      </>
    );
  }
  return (
    <InformationWrapper>
      <Left>
        <ScheduleListItem>
          <ScheduleListItemContainer>
            <ScheduleListItemLeft>
              <SkeletonBox width="50%" height={px2rem(20)} />
              <Spacer value={10} />
              <SkeletonBox width="80%" height={px2rem(20)} />
            </ScheduleListItemLeft>
            <ScheduleListItemRight>
              <SkeletonBox width={px2rem(86)} height={px2rem(86)} />
            </ScheduleListItemRight>
          </ScheduleListItemContainer>
        </ScheduleListItem>
        <Wrapper>
          <Spacer value={8} />
          <InnerWrapper columnCount={4}>{itemElements}</InnerWrapper>
          <Spacer value={10} />
        </Wrapper>
      </Left>
      <Right>
        <DescWrapper>
          <SkeletonBox width="30%" height={px2rem(20)} />
          <Spacer value={12} />
          <SkeletonBox width="80%" height={px2rem(16)} />
          <Spacer value={4} />
          <SkeletonBox width="100%" height={px2rem(16)} />
          <Spacer value={4} />
          <SkeletonBox width="60%" height={px2rem(16)} />
        </DescWrapper>
        <Spacer value={24} />
        <SkeletonHolderListWrapper>
          <SkeletonBox width="30%" height={px2rem(20)} />
          <Spacer value={12} />
          <SkeletonHolderWrapper>
            <SkeletonCircleBox size={px2rem(24)} />
            <Spacer value={4} />
            <SkeletonBox width="50%" height={px2rem(18)} />
          </SkeletonHolderWrapper>
          <Spacer value={12} />
          <SkeletonHolderWrapper>
            <SkeletonCircleBox size={px2rem(24)} />
            <Spacer value={4} />
            <SkeletonBox width="50%" height={px2rem(18)} />
          </SkeletonHolderWrapper>
          <Spacer value={12} />
          <SkeletonHolderWrapper>
            <SkeletonCircleBox size={px2rem(24)} />
            <Spacer value={4} />
            <SkeletonBox width="50%" height={px2rem(18)} />
          </SkeletonHolderWrapper>
          <Spacer value={12} />
          <SkeletonHolderWrapper>
            <SkeletonCircleBox size={px2rem(24)} />
            <Spacer value={4} />
            <SkeletonBox width="50%" height={px2rem(18)} />
          </SkeletonHolderWrapper>
        </SkeletonHolderListWrapper>
      </Right>
    </InformationWrapper>
  );
};
