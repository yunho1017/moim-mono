import React from "react";
import styled, { css } from "styled-components";
import {
  SkeletonBox,
  SkeletonCircleBox,
  FlexWrapper,
} from "common/components/skeleton";
import { HeaderWrapper, Left, Right } from "./styled";
import { Spacer, SpacerVertical } from "common/components/designSystem/spacer";
import { DefaultDivider } from "common/components/divider";

import useIsMobile from "common/hooks/useIsMobile";
import { px2rem } from "common/helpers/rem";

const imageSkeletonStyle = css`
  padding-top: 100%;
`;

const flex1Style = css`
  flex: 1;
  min-width: 0;
`;
const ProductImageList = styled.div`
  display: flex;
`;

const PaddingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 ${px2rem(16)};
  width: 100%;
`;

function ProductShowHeaderDesktopSkeleton() {
  return (
    <HeaderWrapper>
      <Left>
        <FlexWrapper flexDirection="column">
          <SkeletonBox width="100%" overrideStyle={imageSkeletonStyle} />
          <Spacer value={4} />
          <ProductImageList>
            <SkeletonBox width={px2rem(52)} height={px2rem(52)} />
            <SpacerVertical value={4} />
            <SkeletonBox width={px2rem(52)} height={px2rem(52)} />
            <SpacerVertical value={4} />
            <SkeletonBox width={px2rem(52)} height={px2rem(52)} />
            <SpacerVertical value={4} />
            <SkeletonBox width={px2rem(52)} height={px2rem(52)} />
            <SpacerVertical value={4} />
            <SkeletonBox width={px2rem(52)} height={px2rem(52)} />
          </ProductImageList>
        </FlexWrapper>
      </Left>
      <Right>
        <PaddingWrapper>
          <Spacer value={8} />
          <SkeletonBox width="30%" height={px2rem(18)} />

          <Spacer value={16} />
          <SkeletonBox width="100%" height={px2rem(34)} />

          <Spacer value={16} />
          <SkeletonBox width="100%" height={px2rem(18)} />

          <Spacer value={8} />
          <SkeletonBox width="90%" height={px2rem(18)} />

          <Spacer value={8} />
          <SkeletonBox width="100%" height={px2rem(18)} />

          <Spacer value={8} />
          <SkeletonBox width="40%" height={px2rem(34)} />

          <Spacer value={8} />
          <SkeletonBox width="100%" height={px2rem(18)} />

          <Spacer value={8} />
          <SkeletonBox width="50%" height={px2rem(18)} />

          <Spacer value={8} />
          <SkeletonBox width="100%" height={px2rem(18)} />

          <Spacer value={8} />
          <SkeletonBox width="40%" height={px2rem(18)} />

          <Spacer value={8} />
          <SkeletonBox width="100%" height={px2rem(18)} />

          <Spacer value={8} />
          <FlexWrapper>
            <SkeletonCircleBox size={px2rem(24)} />
            <SpacerVertical value={12} />
            <SkeletonBox width="30%" height={px2rem(18)} />
          </FlexWrapper>

          <Spacer value={8} />
          <SkeletonBox width="100%" height={px2rem(18)} />

          <Spacer value={8} />
          <FlexWrapper>
            <SkeletonCircleBox size={px2rem(20)} />
            <SpacerVertical value={16} />
            <SkeletonBox width="30%" height={px2rem(18)} />
          </FlexWrapper>

          <Spacer value={12} />
          <SkeletonBox width="100%" height={px2rem(42)} />

          <Spacer value={12} />
          <SkeletonBox width="100%" height={px2rem(130)} />

          <Spacer value={16} />
          <FlexWrapper justifyContent="space-between">
            <div style={{ width: "30%" }}>
              <SkeletonBox width="100%" height={px2rem(18)} />
              <Spacer value={4} />
              <SkeletonBox width="100%" height={px2rem(18)} />
            </div>
            <SkeletonBox width="30%" height={px2rem(44)} />
          </FlexWrapper>

          <Spacer value={16} />
          <FlexWrapper>
            <SkeletonBox width={px2rem(48)} height={px2rem(48)} />
            <SpacerVertical value={12} />
            <SkeletonBox width={px2rem(48)} height={px2rem(48)} />
            <SpacerVertical value={12} />
            <SkeletonBox height={px2rem(48)} overrideStyle={flex1Style} />
            <SpacerVertical value={12} />
            <SkeletonBox height={px2rem(48)} overrideStyle={flex1Style} />
          </FlexWrapper>
        </PaddingWrapper>
      </Right>
    </HeaderWrapper>
  );
}

function ProductShowHeaderMobileSkeleton() {
  return (
    <>
      <SkeletonBox width="100%" overrideStyle={imageSkeletonStyle} />

      <Spacer value={16} />
      <PaddingWrapper>
        <SkeletonBox width="30%" height={px2rem(18)} />

        <Spacer value={16} />
        <SkeletonBox width="100%" height={px2rem(34)} />

        <Spacer value={16} />
        <SkeletonBox width="100%" height={px2rem(18)} />

        <Spacer value={8} />
        <SkeletonBox width="80%" height={px2rem(18)} />

        <Spacer value={16} />
        <DefaultDivider />
        <Spacer value={16} />

        <SkeletonBox width="40%" height={px2rem(34)} />

        <Spacer value={16} />
        <DefaultDivider />
        <Spacer value={16} />

        <SkeletonBox width="50%" height={px2rem(19)} />

        <Spacer value={16} />
        <DefaultDivider />
        <Spacer value={16} />

        <SkeletonBox width="50%" height={px2rem(19)} />

        <Spacer value={16} />
        <DefaultDivider />
        <Spacer value={16} />

        <FlexWrapper>
          <SkeletonCircleBox size={px2rem(24)} />
          <SpacerVertical value={12} />
          <SkeletonBox width="30%" height={px2rem(18)} />
        </FlexWrapper>

        <Spacer value={16} />
        <DefaultDivider />
        <Spacer value={16} />

        <FlexWrapper>
          <SkeletonCircleBox size={px2rem(20)} />
          <SpacerVertical value={16} />
          <SkeletonBox width="30%" height={px2rem(18)} />
        </FlexWrapper>
      </PaddingWrapper>
    </>
  );
}

export default function ProductSummarySkeleton() {
  const isMobile = useIsMobile();
  return isMobile ? (
    <ProductShowHeaderMobileSkeleton />
  ) : (
    <ProductShowHeaderDesktopSkeleton />
  );
}
