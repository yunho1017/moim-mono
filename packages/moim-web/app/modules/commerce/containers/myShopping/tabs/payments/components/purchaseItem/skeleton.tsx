import * as React from "react";
import styled from "styled-components";
import { SkeletonBox } from "common/components/skeleton";
import { Spacer } from "common/components/designSystem/spacer";
import { px2rem } from "common/helpers/rem";

const ImageSkeleton = styled(SkeletonBox)`
  border-radius: 1px;
`;
const TextSkeleton = styled(SkeletonBox)`
  margin-bottom: ${px2rem(8)};
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
  padding: 0 ${px2rem(16)};
`;

const Inner = styled.div`
  width: 100%;
  display: flex;

  .left {
    width: ${px2rem(72)};
    height: ${px2rem(72)};
  }

  .right {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-top: ${px2rem(4)};
    padding-left: ${px2rem(12)};
  }
`;

const PurchaseItemSkeleton: React.FC = () => {
  return (
    <Wrapper>
      <Spacer value={8} />
      <TextSkeleton width="29%" height={px2rem(18)} />
      <Spacer value={8} />
      <Inner>
        <div className="left">
          <ImageSkeleton width={px2rem(72)} height={px2rem(72)} />
        </div>
        <div className="right">
          <TextSkeleton width="100%" height={px2rem(18)} />
          <TextSkeleton width="100%" height={px2rem(18)} />
          <TextSkeleton width="28%" height={px2rem(18)} />
        </div>
      </Inner>
      <Spacer value={16} />
    </Wrapper>
  );
};

export default PurchaseItemSkeleton;
