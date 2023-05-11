import styled, { keyframes, FlattenInterpolation } from "styled-components";
import MoreIconResource from "@icon/18-more-g";
import ArrowDownIconBase from "@icon/18-downarrow-g.svg";
import { px2rem } from "common/helpers/rem";
import { B4RegularStyle } from "common/components/designSystem/typos";
import { MEDIA_QUERY } from "common/constants/responsive";
import { DefaultDivider } from "common/components/divider";

export const Wrapper = styled.div<{
  overrideStyle?: FlattenInterpolation<any>;
}>`
  width: 100%;
  height: fit-content;
  padding-top: ${px2rem(16)};
  ${props => props.overrideStyle}
`;

export const PageIndexContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MoreIcon = styled(MoreIconResource).attrs({
  size: "xs",
  touch: 30,
  role: "button",
})``;

export const Divider = styled(DefaultDivider)`
  margin: ${px2rem(8)} ${px2rem(16)};

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    margin: ${px2rem(8)} 0;
  }
`;

export const ArrowDownIcon = styled(ArrowDownIconBase).attrs(props => ({
  size: "xs",
  iconColor: props.theme.colorV2.colorSet.grey300,
}))``;

export const ShowMoreThreads = styled.div`
  cursor: pointer;
  width: 100%;
  height: ${px2rem(30)};
  padding: ${px2rem(7)} ${px2rem(16)};
  display: flex;
  align-items: center;

  span {
    margin-right: ${px2rem(8)};
    color: ${props => props.theme.colorV2.colorSet.grey300};
    ${B4RegularStyle}
  }
`;

export const getThreadHighlightAnimation = (color: string) => keyframes`
  from {
    background-color: ${color};
  }
  to {
    background-color: transparent;
  }
`;
