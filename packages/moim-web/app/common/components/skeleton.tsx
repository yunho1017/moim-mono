import React from "react";
import { rgba } from "polished";
import styled, {
  css,
  FlattenInterpolation,
  keyframes,
} from "styled-components";
import { px2rem } from "common/helpers/rem";
import { parseRatio } from "common/components/thread/components/wrapper/thumbnail";
import { MEDIA_QUERY } from "common/constants/responsive";

const shimmerKeyframes = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
   transform: translateX(100%);
  }
`;

const SkeletonBoxBaseWrapper = styled.div`
  position: relative;
`;
const SkeletonBoxShimmer = styled.div`
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: skewX(-45deg);
    &::after {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-image: linear-gradient(
        90deg,
        ${props => rgba(props.theme.colorV2.colorSet.white1000, 0)} 0,
        ${props => rgba(props.theme.colorV2.colorSet.white1000, 0.2)} 20%,
        ${props => rgba(props.theme.colorV2.colorSet.white1000, 0.5)} 60%,
        ${props => rgba(props.theme.colorV2.colorSet.white1000, 0)}
      );
      animation: ${shimmerKeyframes} 2s infinite;
      content: "";
    }
  }
`;

const SkeletonBoxBase: React.FC<{ className?: string }> = ({ className }) => (
  <SkeletonBoxBaseWrapper className={className}>
    <SkeletonBoxShimmer />
  </SkeletonBoxBaseWrapper>
);

export const SkeletonBox = styled(SkeletonBoxBase)<{
  height?: string;
  width?: string;
  // deprecated
  overrideStyle?: FlattenInterpolation<any>;
}>`
  width: ${props => props.width ?? "100%"};
  height: ${props => props.height ?? "100%"};
  border-radius: ${px2rem(4)};
  ${props => props.overrideStyle};

  display: inline-block;
  position: relative;
  overflow: hidden;
  background-color: ${props => props.theme.colorV2.colorSet.grey50};
`;

export const SkeletonRatioBox = styled(SkeletonBoxBase)<{
  ratio: string; // 1:1
  width?: string;
}>`
  width: ${props => props.width ?? "100%"};
  height: 0;
  padding-top: ${props => {
    const { width, height } = parseRatio(props.ratio);
    return Math.round(100 * (height / width));
  }}%;

  border-radius: ${px2rem(4)};

  display: inline-block;
  position: relative;
  overflow: hidden;
  background-color: ${props => props.theme.colorV2.colorSet.grey50};
`;

export const SkeletonCircleBox = styled(SkeletonBox).attrs((props: any) => ({
  width: props.size,
  height: props.size,
}))<{ size?: string }>`
  border-radius: 50%;
`;

export const SkeletonRadiusBox = styled(SkeletonBox)<{ radius: string }>`
  border-radius: ${props => props.radius};
`;
export const FlexWrapper = styled.div<{
  justifyContent?: string;
  alignItems?: string;
  flexDirection?: string;
}>`
  display: flex;

  ${props =>
    props.flexDirection &&
    css`
      flex-direction: ${props.flexDirection};
    `};
  ${props =>
    props.justifyContent &&
    css`
      justify-content: ${props.justifyContent};
    `};
  ${props =>
    props.alignItems &&
    css`
      align-items: ${props.alignItems};
    `};
`;
