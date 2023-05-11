import { Spacer } from "common/components/designSystem/spacer";
import { SkeletonBox, SkeletonCircleBox } from "common/components/skeleton";
import { px2rem } from "common/helpers/rem";
import React from "react";
import styled from "styled-components";

const SkeletonWrapper = styled.div`
  padding: 0 ${px2rem(16)};
`;

const SkeletonBg = styled(SkeletonBox)`
  background-color: ${props => props.theme.colorV2.colorSet.grey10} !important;
  text-align: center;
`;

const SkeletonHistoryWrapper = styled.div`
  display: grid;
  place-items: center;
  grid-template-columns: ${px2rem(48)} auto ${px2rem(58)};
  grid-template-rows: 1fr;
  grid-column-gap: ${px2rem(16)};
  grid-row-gap: ${px2rem(8)};
`;

export const CoinShowSkeleton: React.FC = () => {
  return (
    <>
      <SkeletonBg width="100%" height={px2rem(138)}>
        <Spacer value={4} />
        <SkeletonBox width={px2rem(80)} height={px2rem(18)} />
        <Spacer value={16} />
        <SkeletonBox width={px2rem(150)} height={px2rem(24)} />
      </SkeletonBg>
      <Spacer value={16} />
      <SkeletonWrapper>
        <SkeletonBox width={px2rem(80)} height={px2rem(18)} />
        <Spacer value={16} />
        {new Array(3).fill(0).map(_ => (
          <>
            <SkeletonHistoryWrapper>
              <SkeletonCircleBox size={px2rem(48)} />
              <div>
                <SkeletonBox width={px2rem(80)} height={px2rem(18)} />
                <br />
                <SkeletonBox width={px2rem(140)} height={px2rem(12)} />
              </div>
              <SkeletonBox width={px2rem(58)} height={px2rem(12)} />
            </SkeletonHistoryWrapper>
            <Spacer value={32} />
          </>
        ))}
      </SkeletonWrapper>
    </>
  );
};
