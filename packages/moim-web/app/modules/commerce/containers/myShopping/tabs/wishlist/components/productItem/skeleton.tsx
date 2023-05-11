import React from "react";
import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { SkeletonBox } from "common/components/skeleton";
import { Spacer } from "common/components/designSystem/spacer";

const Wrapper = styled.div`
  width: 100%;
  padding: ${px2rem(8)} ${px2rem(16)};
  display: flex;
  gap: ${px2rem(12)};
`;
const Information = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
`;
export default function Skeleton() {
  return (
    <Wrapper>
      <SkeletonBox width={px2rem(72)} height={px2rem(72)} />
      <Information>
        <SkeletonBox width="80%" height={px2rem(18)} />
        <Spacer value={8} />
        <SkeletonBox width="50%" height={px2rem(18)} />
      </Information>
    </Wrapper>
  );
}
