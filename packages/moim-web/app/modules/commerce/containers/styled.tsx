import React from "react";
import styled, { css } from "styled-components";
import { SkeletonBox } from "common/components/skeleton";
import { px2rem } from "common/helpers/rem";
import {
  H4BoldStyle,
  B3RegularStyle,
  B4RegularStyle,
} from "common/components/designSystem/typos";
import { useSingleLineStyle } from "common/components/designSystem/styles";
import { MEDIA_QUERY } from "common/constants/responsive";

export const RootWrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const InnerStyle = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const CarouselContainedWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const InnerContentWrapper = styled.div`
  width: ${px2rem(1200)};
  height: 100%;
  max-width: 100%;

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    overflow: inherit;
  }
`;

export const Header = styled.div`
  width: 100%;
  padding: 0 ${px2rem(16)};
  margin: ${px2rem(40)} 0 ${px2rem(24)};

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    margin: ${px2rem(16)} 0 ${px2rem(16)};
  }
`;

export const Body = styled.div`
  width: 100%;
  height: 100%;
  min-height: 0;
  flex: 1;
  padding: 0 ${px2rem(16)};
`;

export const BreadCrumbs = styled.div`
  color: ${props => props.theme.colorV2.colorSet.grey600};
  padding: ${px2rem(2)} 0;
  ${B4RegularStyle};
  ${useSingleLineStyle}
`;

export const Title = styled.div`
  position: relative;
  color: ${props => props.theme.colorV2.colorSet.grey800};
  padding: ${px2rem(4)} 0;
  ${useSingleLineStyle};
  ${H4BoldStyle}
`;

export const TitleSkeleton = () => (
  <SkeletonBox width="30%" height={px2rem(42)} />
);

export const Description = styled.div`
  color: ${props => props.theme.colorV2.colorSet.grey300};
  padding: ${px2rem(4)} 0;
  ${B3RegularStyle}
  ${useSingleLineStyle};
`;

export const CommerceCategoryWrapper = styled.div`
  width: 100%;
  height: fit-content;
  padding: 0 ${px2rem(16)};
  margin: ${px2rem(56)} 0 ${px2rem(24)};

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    margin: ${px2rem(16)} 0;
    padding: 0;
  }
`;
export const CommerceCategoryStyle = css``;
