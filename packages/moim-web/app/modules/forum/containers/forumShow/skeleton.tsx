import React from "react";
import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import {
  FlexWrapper,
  SkeletonBox,
  SkeletonCircleBox,
} from "common/components/skeleton";
import { Spacer, SpacerVertical } from "common/components/designSystem/spacer";
import { MEDIA_QUERY } from "common/constants/responsive";
import { MaxWidthPaper } from "app/modules/postShow/components/header/mobile/styled";

const Wrapper = styled(MaxWidthPaper)`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  padding: 0 ${px2rem(16)};

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    width: 100%;
  }
`;
export function ForumShowSkeleton() {
  return (
    <Wrapper>
      <Spacer value={55} />
      <SkeletonBox width="90%" height={px2rem(32)} />
      <Spacer value={10} />
      <SkeletonBox width="40%" height={px2rem(32)} />
      <Spacer value={42} />

      <FlexWrapper>
        <SkeletonCircleBox size={px2rem(36)} />
        <SpacerVertical value={12} />
        <FlexWrapper flexDirection="column">
          <SkeletonBox width={px2rem(80)} height={px2rem(18)} />
          <Spacer value={6} />
          <SkeletonBox width={px2rem(50)} height={px2rem(18)} />
        </FlexWrapper>
      </FlexWrapper>

      <Spacer value={42} />
      <SkeletonBox width="80%" height={px2rem(18)} />
      <Spacer value={8} />
      <SkeletonBox width="40%" height={px2rem(18)} />
      <Spacer value={8} />
      <SkeletonBox width="50%" height={px2rem(18)} />
      <Spacer value={24} />
      <SkeletonBox width="100%" height={px2rem(300)} />
    </Wrapper>
  );
}
