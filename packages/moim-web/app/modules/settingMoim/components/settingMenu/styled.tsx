import styled, { css, FlattenInterpolation } from "styled-components";
import { Link } from "react-router-dom";
import { B1Regular } from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";
import { MEDIA_QUERY } from "common/constants/responsive";
// icons
import LinkIconBase from "@icon/24-linkchannel-b.svg";
import { HoverSelectedStyleWrapper } from "common/components/designSystem/styles";

export const Wrapper = styled.div<{ wrapperStyle?: FlattenInterpolation<any> }>`
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    width: ${px2rem(230)};
  }

  ${props => props.wrapperStyle}
`;

export const MenuList = styled.ul``;

export const MenuLink = styled(Link)`
  & > ${HoverSelectedStyleWrapper} {
    min-height: ${px2rem(44)};
    height: fit-content;
  }
`;

export const MenuText = styled(B1Regular)<{ color?: string }>`
  display: inline-flex;
  align-items: center;
  color: ${props => props.theme.colorV2.colorSet.grey800};
  word-break: keep-all;
  white-space: normal;
`;

export const MenuItem = styled.li<{
  isSelected: boolean;
  isChildMenu?: boolean;
}>`
  padding-left: ${px2rem(16)};
  ${props =>
    props.isSelected
      ? css`
          background-color: ${props.theme.colorV2.colorSet.grey50};
          ${B1Regular} {
            font-weight: ${props.theme.font.bold};
          }
        `
      : css`
          &:hover {
            background-color: ${props.theme.colorV2.colorSet.grey10};
          }
        `};
  ${props =>
    props.isSelected &&
    css`
      font-weight: ${props.theme.font.bold};
    `};
  ${props =>
    props.isChildMenu &&
    css`
      margin-left: ${px2rem(16)};
    `};
`;

export const LinkIcon = styled(LinkIconBase).attrs({
  size: "xs",
  touch: 18,
})`
  margin-left: ${px2rem(4)};
`;
