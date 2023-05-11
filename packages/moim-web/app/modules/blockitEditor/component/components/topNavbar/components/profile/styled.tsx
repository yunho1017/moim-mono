import styled, { css } from "styled-components";

import DownArrowIconBase from "@icon/18-spread-arrow-g.svg";
import { px2rem } from "common/helpers/rem";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  /* NOTE: temporary disable. */
  cursor: default;
  pointer-events: none;
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
`;

export const CurrentUserWrapper = styled(ItemWrapper)`
  display: inline-flex;
  align-items: center;
  height: ${px2rem(42)};
  margin: 0 ${px2rem(12)} 0 ${px2rem(8)};
`;

export const UserProfileWrapper = styled.div`
  margin-right: ${px2rem(9)};
`;

export const DownArrowIcon = styled(DownArrowIconBase).attrs(props => {
  const palette = props.theme.getTopAreaElementPalette("others");
  const iconColor = palette.color ?? palette.grey600;

  return {
    size: "xs",
    touch: 18,
    role: "button",
    iconColor,
  };
})``;
