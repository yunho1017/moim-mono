import React from "react";
import styled from "styled-components";
import { Spacer } from "common/components/designSystem/spacer";
import { SkeletonBox } from "common/components/skeleton";

import { px2rem } from "common/helpers/rem";
import { useScrollStyle } from "common/components/designSystem/styles";

const Wrapper = styled.div`
  width: 100%;
  max-height: ${px2rem(380)};
  background-color: ${props => props.theme.colorV2.colorSet.grey10};
  ${useScrollStyle};
`;

const Skeleton = styled(SkeletonBox)`
  width: calc(100% - ${px2rem(16)});
  height: ${px2rem(140)};
  margin: 0 ${px2rem(8)};
`;

export const CouponListSkeleton: React.FC = React.memo(() => {
  return (
    <Wrapper>
      <Spacer value={12} />

      <Skeleton />
      <Spacer value={12} />
    </Wrapper>
  );
});
