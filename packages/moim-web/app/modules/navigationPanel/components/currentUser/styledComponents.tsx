import styled, { css } from "styled-components";
import { B1Regular } from "common/components/designSystem/typos";
import { useSingleLineStyle } from "common/components/designSystem/styles";
import SettingIconBase from "@icon/24-setting-g.svg";
import NotiIconBase from "@icon/24-noti-g.svg";
import MyCartIconBase from "@icon/18-cart-full.svg";
import { px2rem } from "common/helpers/rem";

export const Wrapper = styled.div.attrs({ role: "button" })``;

export const Username = styled(B1Regular)`
  ${props => {
    const moimNamePalette = props.theme.getSideAreaElementPalette("menuText");

    return css`
      color: ${moimNamePalette.color ?? moimNamePalette.fog600};
    `;
  }}

  ${useSingleLineStyle};
`;

export const SettingIcon = styled(SettingIconBase).attrs(props => {
  const moimNamePalette = props.theme.getSideAreaElementPalette("menuText");
  const iconColor = moimNamePalette.color ?? moimNamePalette.fog600;

  return {
    size: "s",
    touch: 24,
    iconColor,
  };
})``;

export const NotiIcon = styled(NotiIconBase).attrs(props => {
  const moimNamePalette = props.theme.getSideAreaElementPalette("menuText");
  const iconColor = moimNamePalette.color ?? moimNamePalette.fog600;

  return {
    size: "s",
    touch: 42,
    iconColor,
  };
})``;

export const ButtonWrapper = styled.button`
  position: relative;
  padding-right: ${px2rem(7)};
`;

export const MyCartIcon = styled(MyCartIconBase).attrs(props => {
  const palette = props.theme.getTopAreaElementPalette("menuText");
  const iconColor = palette.color ?? palette.fog600;

  return {
    size: "s",
    touch: 42,
    role: "button",
    iconColor,
  };
})``;

export const NotiAlertBadgeStyle = css`
  position: absolute;
  top: ${px2rem(-2)};
  left: ${px2rem(18)};
  box-shadow: 0 ${px2rem(2)} ${px2rem(4)} 0
    ${props => props.theme.colorV2.colorSet.grey200};
`;
