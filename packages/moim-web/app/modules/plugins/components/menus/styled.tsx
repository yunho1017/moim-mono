import styled, { css, FlattenInterpolation } from "styled-components";
import { B2RegularStyle } from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";
import { MEDIA_QUERY } from "common/constants/responsive";
import { Link } from "react-router-dom";

export const LEFT_WIDTH = 240;

export const Wrapper = styled.div<{ wrapperStyle?: FlattenInterpolation<any> }>`
  padding-top: ${px2rem(24)};
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    width: ${px2rem(LEFT_WIDTH)};
  }

  ${props => props.wrapperStyle}
`;

export const MenuList = styled.ul``;

export const MenuText = styled(Link)`
  width: 100%;
  display: inline-flex;
  align-items: center;
  color: ${props => props.theme.colorV2.colorSet.grey800};
  ${B2RegularStyle}
`;

export const MenuItem = styled.li<{ isSelected: boolean }>`
  padding-left: ${px2rem(16)};
  height: ${px2rem(48)};
  display: flex;
  align-items: center;
  border-radius: ${px2rem(4)};

  ${props =>
    props.isSelected
      ? css`
          background-color: ${props.theme.colorV2.colorSet.grey50};

          ${MenuText} {
            color: ${props.theme.colorV2.colorSet.grey800};
          }
        `
      : css`
          ${MenuText} {
            color: ${props.theme.colorV2.colorSet.grey300};
          }
          &:hover {
            background-color: ${props.theme.colorV2.colorSet.grey10};
          }
        `};
`;
