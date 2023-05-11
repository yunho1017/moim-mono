import * as React from "react";
import styled from "styled-components";
import useIsMobile from "common/hooks/useIsMobile";
import { px2rem } from "common/helpers/rem";
// components
import { SkeletonBox } from "common/components/skeleton";
import { Spacer } from "common/components/designSystem/spacer";
import {
  CollectionInfo,
  InfoItem,
  InfoWrapper,
  Left,
  Right,
  TopContainer,
  TopWrapper,
} from "./styled";
import Banner from "./components/banner";
import HeaderButtons from "./components/buttons";
import HolderList from "../holderList";

const FlexWrapper = styled.div<{ gap?: number }>`
  display: flex;
  gap: ${props => px2rem(props.gap ? props.gap : 8)};
`;

const MobileWrapper = styled.div`
  padding: 0 ${px2rem(16)};
`;

const CollectionShowTopSkeleton: React.FC = () => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <TopWrapper>
        <TopContainer>
          <Banner headerButtonElement={<HeaderButtons />} />
          <InfoWrapper>
            <InfoItem>
              <SkeletonBox width={px2rem(50)} height={px2rem(37)} />
            </InfoItem>
            <InfoItem>
              <SkeletonBox width={px2rem(50)} height={px2rem(37)} />
            </InfoItem>
          </InfoWrapper>
        </TopContainer>
        <MobileWrapper>
          <Spacer value={16} />
          <SkeletonBox width={px2rem(60)} height={px2rem(16)} />
          <Spacer value={12} />
          <SkeletonBox width={px2rem(120)} height={px2rem(24)} />
          <Spacer value={12} />
          <FlexWrapper gap={15}>
            <SkeletonBox width={px2rem(60)} height={px2rem(16)} />
            <SkeletonBox width={px2rem(90)} height={px2rem(16)} />
          </FlexWrapper>
          <Spacer value={8} />
          <SkeletonBox width={px2rem(300)} height={px2rem(16)} />
          <Spacer value={1} />
          <SkeletonBox width={px2rem(343)} height={px2rem(16)} />
        </MobileWrapper>
        <HolderList isLoading={true} />
      </TopWrapper>
    );
  }
  return (
    <TopWrapper>
      <Spacer value={16} />
      <Banner />
      <Spacer value={20} />
      <CollectionInfo>
        <Left>
          <SkeletonBox width={px2rem(161)} height={px2rem(16)} />
          <Spacer value={16} />
          <SkeletonBox width={px2rem(450)} height={px2rem(34)} />
          <Spacer value={16} />
          <FlexWrapper>
            <SkeletonBox width={px2rem(66)} height={px2rem(16)} />
            <SkeletonBox width={px2rem(128)} height={px2rem(16)} />
          </FlexWrapper>
        </Left>
        <Right isSkeleton={true}>
          <HeaderButtons />
          <InfoWrapper>
            <InfoItem>
              <SkeletonBox width={px2rem(52)} height={px2rem(60)} />
            </InfoItem>
            <InfoItem>
              <SkeletonBox width={px2rem(52)} height={px2rem(60)} />
            </InfoItem>
          </InfoWrapper>
        </Right>
      </CollectionInfo>
    </TopWrapper>
  );
};

export default React.memo(CollectionShowTopSkeleton);
