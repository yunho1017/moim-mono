import styled, { css } from "styled-components";
import MenuIconBase from "@icon/24-menu-b.svg";
import { px2rem } from "common/helpers/rem";
import { TOP_NAVIGATION_HEIGHT } from "../constant";

export const Wrapper = styled.div<{
  visibleTopSubNavigation: boolean;
  visibleTopTabNavigation?: boolean;
}>`
  position: relative;
  width: 100%;
  background-color: ${props =>
    props.theme.getTopAreaElementPalette("background").color};
  ${props =>
    props.visibleTopSubNavigation
      ? css`
          border-bottom: ${px2rem(1)} solid
            ${props.theme.colorV2.colorSet.grey50};
        `
      : !props?.visibleTopTabNavigation &&
        css`
          box-shadow: ${props.theme.shadow.whiteElevated2};
        `};
  height: ${px2rem(TOP_NAVIGATION_HEIGHT)};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: ${px2rem(16)};
`;

export const CurrentUserWrapper = styled.div<{ hasCurrentUser: boolean }>`
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  & > * + * {
    margin-left: ${props => (props.hasCurrentUser ? px2rem(4) : px2rem(12))};
  }
`;

export const MenuIcon = styled(MenuIconBase).attrs(props => {
  const palette = props.theme.getTopAreaElementPalette("others");
  const iconColor = palette.color ?? palette.fog800;

  return {
    size: "s",
    touch: 42,
    iconColor,
  };
})``;
