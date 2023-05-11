import styled, { css } from "styled-components";

import NotiIconBase from "@icon/18-noti-b.svg";
import MyCartIconBase from "@icon/18-cart-full.svg";
import { px2rem } from "common/helpers/rem";

import {
  FlatButton,
  GhostButton,
} from "common/components/designSystem/buttons";
import { ThemeColorScaleTypes } from "app/enums";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const ItemWrapper = styled.div.attrs({ role: "button" })<{
  selected: boolean;
}>`
  display: inline-block;
  transition: background-color 200ms ease-in;
  border-radius: ${px2rem(2)};
  position: relative;
  ${props =>
    props.selected &&
    css`
      background-color: ${props.theme.getTopAreaElementPalette("background")
        .fog50};
    `};
  &:hover {
    background-color: ${props =>
      props.theme.getTopAreaElementPalette("background").fog50};
  }

  & + & {
    margin-left: ${px2rem(4)};
  }
`;

export const NotiIcon = styled(NotiIconBase).attrs(props => {
  const palette = props.theme.getTopAreaElementPalette("others");
  const iconColor = palette.color ?? palette.fog800;

  return {
    size: "xs",
    touch: 30,
    iconColor,
  };
})``;

export const MyCartIcon = styled(MyCartIconBase).attrs(props => {
  const palette = props.theme.getTopAreaElementPalette("others");
  const iconColor = palette.color ?? palette.fog800;

  return {
    size: "xs",
    touch: 30,
    iconColor,
  };
})``;

export const UserProfileWrapper = styled.div`
  margin-left: ${px2rem(9)};
`;

export const NotiAlertBadgeStyle = css`
  position: absolute;
  top: ${px2rem(-2)};
  left: ${px2rem(14)};
  box-shadow: 0 ${px2rem(2)} ${px2rem(4)} 0
    ${props => props.theme.colorV2.colorSet.grey200};
  color: ${props => props.theme.colorV2.colorSet.white1000};
  background-color: ${props => props.theme.color.red700};
`;

export const SignInButton = styled(GhostButton)`
  color: ${props => props.theme.getTopAreaElementPalette("others").fog800};
  border: ${px2rem(1)} solid
    ${props => props.theme.getTopAreaElementPalette("others").fog800};
  border-radius: ${px2rem(4)};
  background-color: rgba(0, 0, 0, 0);
`;
export const SignUpButton = styled(FlatButton)<{
  signUpbuttonScale: Moim.Enums.ThemeColorScaleType;
}>`
  ${props => {
    const palette = props.theme.getTopAreaElementPalette("others");

    return css`
      background-color: ${palette.color ?? palette.fog800};
      border-color: ${palette.color ?? palette.fog800};
      color: ${_ => {
        if (palette.color) {
          return palette.fog800;
        }

        const topNaviBackgroundColor = props.theme.getTopAreaElementPalette(
          "background",
        ).color;
        if (topNaviBackgroundColor) {
          return topNaviBackgroundColor;
        }

        switch (props.signUpbuttonScale) {
          case ThemeColorScaleTypes.BLACK:
            return palette.white800;

          case ThemeColorScaleTypes.WHITE:
            return palette.grey800;
        }
      }};
    `;
  }}

  padding: 0;
  border-radius: ${px2rem(4)};
  margin-left: ${px2rem(12)};
`;
