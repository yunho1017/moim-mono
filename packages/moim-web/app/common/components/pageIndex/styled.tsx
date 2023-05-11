import styled, { css } from "styled-components";
import RightIconBase from "@icon/18-rightarrow-g.svg";
import LeftIconBase from "@icon/18-leftarrow-g.svg";
import { px2rem } from "common/helpers/rem";
import { B1RegularStyle, H8BoldStyle } from "../designSystem/typos";

export const Wrapper = styled.div`
  width: fit-content;
  height: ${px2rem(32)};
  padding: ${px2rem(4)} ${px2rem(8)};
  display: flex;
  align-items: center;
`;

export const IndexBox = styled.div<{ selected: boolean }>`
  position: relative;
  cursor: pointer;
  width: ${px2rem(24)};
  height: ${px2rem(24)};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: ${px2rem(4)};
  border-radius: ${px2rem(2)};
  border: solid 1px
    ${props =>
      props.selected ? props.theme.colorV2.colorSet.grey800 : "transparent"};
  background-color: ${props =>
    props.selected ? props.theme.colorV2.colorSet.grey10 : "transparent"};

  transition-property: border, background-color;
  transition-duration: 200ms;
  transition-timing-function: ease-in-out;

  &:hover {
    background-color: ${props => props.theme.colorV2.colorSet.grey50};
  }

  &:last-of-type {
    margin-right: ${px2rem(4)};
  }

  ${props =>
    props.selected
      ? css`
          color: ${props.theme.colorV2.colorSet.grey800};
          ${H8BoldStyle};
        `
      : css`
          color: ${props.theme.colorV2.colorSet.grey300};
          ${B1RegularStyle};
        `}
`;

export const ArrowButton = styled.div.attrs({
  role: "button",
})<{ disable: boolean }>`
  cursor: ${props => (props.disable ? "default" : "pointer")};
  width: ${px2rem(24)};
  height: ${px2rem(24)};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 200ms ease-in-out;

  &:hover {
    background-color: ${props => props.theme.colorV2.colorSet.grey50};
  }
`;

export const RightArrow = styled(RightIconBase).attrs<{ disable: boolean }>(
  props => ({
    size: "xs",
    touch: 24,
    iconColor: props.disable
      ? props.theme.colorV2.colorSet.grey300
      : props.theme.colorV2.colorSet.grey800,
  }),
)``;

export const LeftArrow = styled(LeftIconBase).attrs<{ disable: boolean }>(
  props => ({
    size: "xs",
    touch: 24,
    iconColor: props.disable
      ? props.theme.colorV2.colorSet.grey300
      : props.theme.colorV2.colorSet.grey800,
  }),
)``;
