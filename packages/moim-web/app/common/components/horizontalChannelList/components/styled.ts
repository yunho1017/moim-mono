import styled, { css, FlattenInterpolation } from "styled-components";

import LinkChannelIconBase from "@icon/18-linkchannel-s.svg";
import { px2rem } from "common/helpers/rem";

const channelSelectedStyle = css<{
  selected?: boolean;
  isCategory?: boolean;
  elementPaletteProps?: Moim.Theme.CommonElementThemePaletteProps;
}>`
  color: ${props =>
    props.selected
      ? props.theme.getThemeElementColor({
          targetColor: "fog800",
          elementPalette: props.elementPaletteProps,
          fallback: props.theme.colorV2.colorSet.grey800,
        })
      : props.theme.getThemeElementColor({
          targetColor: "fog600",
          elementPalette: props.elementPaletteProps,
          fallback: props.theme.colorV2.colorSet.grey600,
        })};

  &::after {
    content: "";
    display: block;
    position: absolute;
    background-color: ${props =>
      props.theme.getThemeElementColor({
        targetColor: "fog800",
        elementPalette: props.elementPaletteProps,
        fallback: props.theme.colorV2.colorSet.grey800,
      })};
    height: ${px2rem(2)};
    left: ${px2rem(16)};
    right: ${props => (props.isCategory ? px2rem(24) : px2rem(16))};
    bottom: 0;
    transition: all 300ms;
    opacity: ${props => (props.selected ? 1 : 0)};
    transform: scale(${props => (props.selected ? 1 : 0)});
  }
`;

export const channelUnreadStyle = css<{
  isUnread?: boolean;
}>`
  &::before {
    content: "";
    display: block;
    position: absolute;
    border-radius: 50%;
    background-color: ${props =>
      props.theme.getAlertElementPalette("alertBadge").color ??
      props.theme.color.red700};
    height: ${px2rem(3)};
    width: ${px2rem(3)};
    top: 0;
    right: -${px2rem(3)};
    transition: all 300ms;
    opacity: ${props => (props.isUnread ? 1 : 0)};
    transform: scale(${props => (props.isUnread ? 1 : 0)});
  }
`;

export const WithUnreadStatusBadgeWrapper = styled.span<{
  isUnread?: boolean;
}>`
  position: relative;
  ${channelUnreadStyle}
`;

export const ItemWrapper = styled.div.attrs({ role: "button" })<{
  overrideStyle?: FlattenInterpolation<any>;
  selected?: boolean;
  isCategory?: boolean;
  elementPaletteProps?: Moim.Theme.CommonElementThemePaletteProps;
}>`
  height: 100%;
  position: relative;
  padding: 0 ${px2rem(16)};

  display: inline-flex;
  align-items: center;

  transition: opacity 200ms ease-in;

  &:hover {
    opacity: 0.6;
  }

  ${channelSelectedStyle};
  ${props => props.overrideStyle}
`;

export const LinkChannelIcon = styled(LinkChannelIconBase).attrs(props => ({
  size: "xs",
  touch: 30,
  iconColor:
    props.theme.getThemeElementColor({
      targetColor: "color",
      elementPalette: props.elementPaletteProps,
    }) ??
    props.theme.getThemeElementColor({
      targetColor: "fog600",
      elementPalette: props.elementPaletteProps,
      fallback: props.theme.colorV2.colorSet.grey600,
    }),
}))<{ elementPaletteProps?: Moim.Theme.CommonElementThemePaletteProps }>``;

export const LinkChannelNameWrapper = styled.div`
  flex: 1;
  min-width: 0;

  & > a {
    display: flex;
    align-items: center;
  }
`;
