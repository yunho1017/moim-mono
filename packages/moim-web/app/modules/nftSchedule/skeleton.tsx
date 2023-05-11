import * as React from "react";
import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import useIsMobile from "common/hooks/useIsMobile";
import { Spacer } from "common/components/designSystem/spacer";
import { Left, Right, TopWrapper, Wrapper } from "./styled";
import { SkeletonBox } from "common/components/skeleton";
import {
  ScheduleEndAt,
  ScheduleGridTemplate,
  ScheduleMaxAmount,
  ScheduleRange,
  ScheduleStartAt,
  ScheduleWrapper,
} from "./components/schedule/styled";

const CollectionSkeletonWrapper = styled.div`
  padding: 0 ${px2rem(16)};
  height: ${px2rem(140)};
  border: solid 1px ${props => props.theme.colorV2.colorSet.grey50};
  border-radius: ${px2rem(4)};
`;

export const NFTScheduleLayoutSkeleton: React.FC = () => {
  const isMobile = useIsMobile();
  if (isMobile) {
    return (
      <>
        <Wrapper>
          <Spacer value={16} />
          <SkeletonBox width="100%" height={px2rem(343)} />
          <Spacer value={8} />
          <SkeletonBox width="40%" height={px2rem(24)} />
          <Spacer value={12} />
          <CollectionSkeletonWrapper>
            <Spacer value={16} />
            <SkeletonBox width="50%" height={px2rem(16)} />
            <Spacer value={12} />
            <SkeletonBox width="30%" height={px2rem(20)} />
            <Spacer value={6} />
            <SkeletonBox width="80%" height={px2rem(12)} />
            <SkeletonBox width="60%" height={px2rem(12)} />
          </CollectionSkeletonWrapper>
          <Spacer value={12} />
          <ScheduleWrapper>
            <Spacer value={16} />
            <SkeletonBox width="30%" height={px2rem(18)} />
            <Spacer value={16} />
            <ScheduleGridTemplate>
              <ScheduleStartAt>
                <SkeletonBox width="30%" height={px2rem(12)} />
                <Spacer value={6} />
                <SkeletonBox width="70%" height={px2rem(17)} />
                <Spacer value={20} />
              </ScheduleStartAt>
              <ScheduleEndAt>
                <SkeletonBox width="30%" height={px2rem(12)} />
                <Spacer value={6} />
                <SkeletonBox width="70%" height={px2rem(17)} />
                <Spacer value={20} />
              </ScheduleEndAt>
              <ScheduleMaxAmount>
                <SkeletonBox width="30%" height={px2rem(12)} />
                <Spacer value={6} />
                <SkeletonBox width="70%" height={px2rem(17)} />
              </ScheduleMaxAmount>
              <ScheduleRange>
                <SkeletonBox width="30%" height={px2rem(12)} />
                <Spacer value={6} />
                <SkeletonBox width="70%" height={px2rem(17)} />
              </ScheduleRange>
            </ScheduleGridTemplate>
          </ScheduleWrapper>
        </Wrapper>
      </>
    );
  }

  return (
    <Wrapper>
      <Spacer value={32} />
      <TopWrapper>
        <Left>
          <SkeletonBox width="100%" height={px2rem(565)} />
        </Left>
        <Right>
          <Spacer value={8} />
          <SkeletonBox width="30%" height={px2rem(18)} />

          <Spacer value={16} />
          <SkeletonBox width="40%" height={px2rem(30)} />

          <Spacer value={16} />
          <SkeletonBox width="60%" height={px2rem(18)} />

          <Spacer value={16} />
          <SkeletonBox width="34%" height={px2rem(18)} />

          <Spacer value={16} />
          <CollectionSkeletonWrapper>
            <Spacer value={16} />
            <SkeletonBox width="50%" height={px2rem(16)} />
            <Spacer value={12} />
            <SkeletonBox width="30%" height={px2rem(20)} />
            <Spacer value={6} />
            <SkeletonBox width="80%" height={px2rem(12)} />
            <SkeletonBox width="60%" height={px2rem(12)} />
          </CollectionSkeletonWrapper>

          <Spacer value={16} />
          <ScheduleWrapper>
            <Spacer value={16} />
            <SkeletonBox width="30%" height={px2rem(18)} />
            <Spacer value={16} />
            <ScheduleGridTemplate>
              <ScheduleStartAt>
                <SkeletonBox width="30%" height={px2rem(12)} />
                <Spacer value={6} />
                <SkeletonBox width="70%" height={px2rem(17)} />
                <Spacer value={20} />
              </ScheduleStartAt>
              <ScheduleEndAt>
                <SkeletonBox width="30%" height={px2rem(12)} />
                <Spacer value={6} />
                <SkeletonBox width="70%" height={px2rem(17)} />
                <Spacer value={20} />
              </ScheduleEndAt>
              <ScheduleMaxAmount>
                <SkeletonBox width="30%" height={px2rem(12)} />
                <Spacer value={6} />
                <SkeletonBox width="70%" height={px2rem(17)} />
              </ScheduleMaxAmount>
              <ScheduleRange>
                <SkeletonBox width="30%" height={px2rem(12)} />
                <Spacer value={6} />
                <SkeletonBox width="70%" height={px2rem(17)} />
              </ScheduleRange>
            </ScheduleGridTemplate>
          </ScheduleWrapper>
        </Right>
      </TopWrapper>
    </Wrapper>
  );
};
