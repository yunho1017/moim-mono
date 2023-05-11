import ArrowDownIconBase from "@icon/18-downarrow-g.svg";
import styled, { css } from "styled-components";
import { MenuItem } from "app/modules/settingMoim/components/settingMenu/styled";
import { px2rem } from "common/helpers/rem";
import { B1Regular } from "common/components/designSystem/typos";

export const ArrowIcon = styled(ArrowDownIconBase).attrs(props => ({
  size: "xs",
  iconColor: props.theme.colorV2.colorSet.grey300,
}))``;

export const CollapseIconButton = styled.button<{
  open: boolean;
}>`
  ${ArrowIcon} {
    transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
    ${props =>
      props.open
        ? css`
            transform: rotate(180deg);
          `
        : css`
            transform: rotate(0deg);
          `}
  }
`;

export const ParentMenu = styled.li<{
  open: boolean;
}>`
  cursor: pointer;
  ${props =>
    !props.open &&
    css`
      ${MenuItem} {
        display: none;
      }
    `};
`;

export const ParentMenuWrapper = styled.div`
  width: 100%;
`;

export const ParentMenuButtonWrapper = styled.div<{
  isSelected: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: ${px2rem(16)};
  padding-right: ${px2rem(16)};
  ${props =>
    props.isSelected
      ? css`
          ${B1Regular} {
            font-weight: ${props.theme.font.bold};
          }
        `
      : css`
          :hover {
            background-color: ${props.theme.colorV2.colorSet.grey10};
          }
        `};
`;

export {
  Wrapper,
  MenuList,
  MenuItem,
  MenuLink,
  MenuText,
  LinkIcon,
} from "app/modules/settingMoim/components/settingMenu/styled";
