import * as React from "react";
import { SkeletonRatioBox, SkeletonBox } from "common/components/skeleton";
import useIsMobile from "common/hooks/useIsMobile";
import { Inner, Left, Right } from "./styled";
import { Spacer } from "common/components/designSystem/spacer";
import { px2rem } from "common/helpers/rem";
import styled, { css } from "styled-components";

const titleSkeletonStyle = css`
  border-radius: ${px2rem(4)};
  width: ${px2rem(135)};
`;

const descSkeletonStyle = css`
  border-radius: ${px2rem(4)};
  width: 100%;
`;

const nameSkeletonStyle = css`
  border-radius: ${px2rem(4)};
  width: ${px2rem(280)};
`;

const attributeSkeletonStyle = css`
  border-radius: ${px2rem(4)};
`;

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: ${px2rem(8)};
  grid-row-gap: ${px2rem(8)};
`;

const GridMobileWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: ${px2rem(8)};
  grid-row-gap: ${px2rem(8)};
`;

export const Skeleton: React.FC = () => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Inner>
        <SkeletonRatioBox ratio="1:1"></SkeletonRatioBox>
        <Spacer value={12} />
        <SkeletonBox height={px2rem(19)} overrideStyle={titleSkeletonStyle} />
        <Spacer value={6} />
        <SkeletonBox height={px2rem(16)} overrideStyle={nameSkeletonStyle} />
        <Spacer value={12} />
        <GridMobileWrapper>
          <SkeletonBox
            height={px2rem(130)}
            overrideStyle={attributeSkeletonStyle}
          />
          <SkeletonBox
            height={px2rem(130)}
            overrideStyle={attributeSkeletonStyle}
          />
        </GridMobileWrapper>
      </Inner>
    );
  }
  return (
    <Inner>
      <Left>
        <SkeletonRatioBox ratio="1:1"></SkeletonRatioBox>
        <Spacer value={12} />
        <SkeletonBox height={px2rem(16)} overrideStyle={titleSkeletonStyle} />
        <Spacer value={6} />
        <SkeletonBox height={px2rem(16)} overrideStyle={descSkeletonStyle} />
      </Left>
      <Right>
        <SkeletonBox height={px2rem(16)} overrideStyle={nameSkeletonStyle} />
        <Spacer value={6} />
        <SkeletonBox height={px2rem(16)} overrideStyle={titleSkeletonStyle} />
        <Spacer value={6} />
        <SkeletonBox height={px2rem(16)} overrideStyle={nameSkeletonStyle} />
        <Spacer value={20} />
        <SkeletonBox height={px2rem(30)} overrideStyle={titleSkeletonStyle} />
        <Spacer value={38} />
        <GridWrapper>
          <SkeletonBox
            height={px2rem(130)}
            overrideStyle={attributeSkeletonStyle}
          />
          <SkeletonBox
            height={px2rem(130)}
            overrideStyle={attributeSkeletonStyle}
          />
          <SkeletonBox
            height={px2rem(130)}
            overrideStyle={attributeSkeletonStyle}
          />
          <SkeletonBox
            height={px2rem(130)}
            overrideStyle={attributeSkeletonStyle}
          />
        </GridWrapper>
      </Right>
    </Inner>
  );
};

export default React.memo(Skeleton);
