import styled, { css, keyframes } from "styled-components";
import RetryIconBase from "@icon/24-retry-g.svg";
import { MEDIA_QUERY } from "common/constants/responsive";
import { px2rem } from "common/helpers/rem";
import {
  useScrollStyle,
  useSingleLineStyle,
} from "common/components/designSystem/styles";
import {
  B4RegularStyle,
  H8BoldStyle,
  H4Bold,
  H4BoldStyle,
} from "common/components/designSystem/typos";
import { BGLevel1 } from "common/components/designSystem/BGLevel";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    ${useScrollStyle}
  }
`;

export const Inner = styled.div`
  width: 100%;
  max-width: ${px2rem(732)};

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    margin: ${px2rem(40)} 0;
  }
`;

export const HeaderWrapper = styled.div`
  padding: ${px2rem(8)} ${px2rem(16)};
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    ${H8BoldStyle}
  }
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    ${H4BoldStyle}
  }
`;

export const ItemContentWrapper = styled(BGLevel1)`
  border-radius: 8px;
  margin: ${px2rem(16)};
  padding-top: ${px2rem(7)};
`;

export const Title = styled(H4Bold)`
  color: ${props => props.theme.colorV2.colorSet.grey800};
  font-weight: ${props => props.theme.font.bold};
  margin: ${px2rem(6)} 0;
  ${useSingleLineStyle};
`;

export const Description = styled.div`
  ${B4RegularStyle}
  color: ${props => props.theme.colorV2.colorSet.grey300};
  margin: ${px2rem(2)} 0;
`;

const loadingAnimationKeyframe = keyframes`
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const RetryIcon = styled(RetryIconBase).attrs(props => ({
  size: "s",
  iconColor: props.theme.colorV2.colorSet.grey800,
  touch: 24,
  role: "button",
}))<{ isRefreshing: boolean }>`
  ${props =>
    props.isRefreshing &&
    css`
      animation: ${loadingAnimationKeyframe} 1s 1 ease-in-out;
    `}
`;
