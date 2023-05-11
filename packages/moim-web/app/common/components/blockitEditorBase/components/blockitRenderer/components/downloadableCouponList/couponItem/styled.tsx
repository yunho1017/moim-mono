import React from "react";
import styled from "styled-components";
import { px2rem } from "common/helpers/rem";

import { SkeletonBox } from "common/components/skeleton";
import useIsMobile from "common/hooks/useIsMobile";

export const Wrapper = styled.div`
  width: 100%;
`;

export const CouponSkeleton = () => {
  const isMobile = useIsMobile();
  return (
    <Wrapper>
      <SkeletonBox
        width={isMobile ? "100%" : px2rem(375)}
        height={px2rem(155)}
      />
    </Wrapper>
  );
};
