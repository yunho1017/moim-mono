import * as React from "react";
import styled, { css } from "styled-components";
import { px2rem } from "common/helpers/rem";
import { SkeletonBox } from "common/components/skeleton";
import { Spacer } from "common/components/designSystem/spacer";

const chipSkeletonStyle = css`
  width: ${px2rem(55)};
  border-radius: ${px2rem(12)};
`;

const titleSkeletonStyle = css`
  border-radius: ${px2rem(4)};
  width: ${px2rem(128)};
`;

const textSkeletonStyle = css`
  border-radius: ${px2rem(4)};
`;

const CouponFrame = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
  padding: ${px2rem(16)};
  background-color: ${props => props.theme.colorV2.colorSet.white1000};

  .title {
    flex: 1;
    min-width: 0;
    width: 100%;
    height: ${px2rem(24)};
  }
`;

const CouponTitleSection = styled.div`
  width: 100%;
  display: flex;
`;

const CouponSkeleton: React.FC = () => {
  return (
    <CouponFrame>
      <CouponTitleSection>
        <div className="title">
          <SkeletonBox height={px2rem(24)} overrideStyle={titleSkeletonStyle} />
        </div>
        <SkeletonBox height={px2rem(18)} overrideStyle={chipSkeletonStyle} />
        <Spacer value={4} />
      </CouponTitleSection>
      <Spacer value={39} />
      <SkeletonBox
        width="55%"
        height={px2rem(18)}
        overrideStyle={textSkeletonStyle}
      />
      <Spacer value={4} />
      <SkeletonBox
        width="41%"
        height={px2rem(18)}
        overrideStyle={textSkeletonStyle}
      />
      <Spacer value={4} />
    </CouponFrame>
  );
};

export default CouponSkeleton;
