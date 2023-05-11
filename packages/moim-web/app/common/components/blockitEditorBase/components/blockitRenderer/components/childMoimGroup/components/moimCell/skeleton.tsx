import { px2rem } from "common/helpers/rem";
import React from "react";
import styled from "styled-components";
import { FlexWrapper, SkeletonBox } from "common/components/skeleton";
import { Spacer, SpacerVertical } from "common/components/designSystem/spacer";

const ImageSkeleton = styled(SkeletonBox)`
  padding-top: 100%;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export function MoimCellSkeleton() {
  return (
    <Wrapper className="moimCellSkeleton">
      <ImageSkeleton width="100%" />
      <Spacer value={16} />
      <div>
        <TextSkeleton />
      </div>
    </Wrapper>
  );
}

function TextSkeleton() {
  return (
    <FlexWrapper flexDirection="column">
      <SkeletonBox width="90%" height={px2rem(14)} />
      <Spacer value={8} />
      <SkeletonBox width="100%" height={px2rem(14)} />
      <Spacer value={8} />
      <FlexWrapper>
        <SkeletonBox width="60px" height={px2rem(16)} />
        <SpacerVertical value={6} />
        <SkeletonBox width="60px" height={px2rem(16)} />
      </FlexWrapper>
    </FlexWrapper>
  );
}
