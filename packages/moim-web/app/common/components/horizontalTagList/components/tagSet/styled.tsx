import {
  B3RegularStyle,
  B4RegularStyle,
  H10BoldStyle,
} from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";
import { rgba } from "polished";
import styled, { css, FlattenInterpolation } from "styled-components";
import FilterIconBase from "@icon/18-filterline-g.svg";
import { MEDIA_QUERY } from "common/constants/responsive";

export const TagSetFilterButtonStyle = css`
  margin-top: ${px2rem(2)};
`;

export const FilterIcon = styled(FilterIconBase).attrs(props => ({
  size: "xs",
  touch: 18,
  iconColor: props.theme.colorV2.colorSet.grey800,
}))``;

export const TagsCount = styled.div`
  position: absolute;
  top: ${px2rem(-8)};
  right: ${px2rem(-8)};
  width: ${px2rem(20)};
  height: ${px2rem(18)};
  border-radius: ${px2rem(10)};
  background: ${props => props.theme.colorV2.accent};
  color: ${props => props.theme.colorV2.colorSet.fog1000};
  display: flex;
  justify-content: center;
  align-items: center;
  ${B4RegularStyle}
`;

export const FilterButtonWrapper = styled.div`
  position: relative;
`;

export const FilterButton = styled.button<{
  overrideStyle?: FlattenInterpolation<any>;
}>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${px2rem(30)};
  height: ${px2rem(30)};
  border-radius: 100%;
  border: solid ${px2rem(1)} ${props => props.theme.colorV2.colorSet.grey100};
  ${props => props.overrideStyle};
  transition: opacity 200ms ease-in-out;
  &:hover {
    opacity: 0.6;
  }
`;

export const TagSetWrapper = styled.div`
  display: flex;
  gap: 0 ${px2rem(8)};
  align-items: center;
  flex-shrink: 0;

  & > div {
    height: fit-content;
  }
`;

export const TagSet = styled.div<{
  isSelected: boolean;
  isActivated: boolean;
}>`
  position: relative;
  padding: ${px2rem(6)} ${px2rem(14)};
  border-radius: ${px2rem(16)};
  background: ${props =>
    props.isSelected ? rgba(props.theme.colorV2.accent, 0.14) : "none"};
  cursor: pointer;

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    &:hover {
      span {
        transition: color 200ms ease-in-out;
        color: ${props => props.theme.colorV2.colorSet.grey300};
      }
    }
  }

  span{
    ${B3RegularStyle}
    color: ${props => props.theme.colorV2.colorSet.grey800};
    text-align: center;

    ${props =>
      props.isActivated &&
      css`
        color: ${props.theme.colorV2.colorSet.grey800};
      `}
    ${props =>
      props.isSelected &&
      css`
          ${H10BoldStyle}
          color: ${props.theme.colorV2.colorSet.grey800} !important;
          letter-spacing: ${px2rem(-0.3)};
        `}
  }

  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    border-radius: ${px2rem(16)};
    border: solid ${px2rem(1)}  ${props =>
  props.theme.colorV2.colorSet.grey100};
    transition: color 200ms ease-in-out;
  ${props =>
    props.isActivated &&
    css`
      border-width: ${px2rem(2)};
      border-color: ${props.theme.colorV2.colorSet.grey800};
      color: ${props.theme.colorV2.colorSet.grey800} !important;
      background: none;
    `}
  ${props =>
    props.isSelected &&
    css`
      border-width: ${px2rem(2)};
      border-color: ${props.theme.colorV2.accent};
      ${H10BoldStyle}
      color: ${props.theme.colorV2.colorSet.grey800} !important;
      letter-spacing: ${px2rem(-0.3)};
    `}
  }
`;
