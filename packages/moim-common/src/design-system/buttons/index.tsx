import styled, { css } from "styled-components";
import { rgba } from "polished";
import BaseButton from "./base";
import { px2rem } from "../../helpers/rem";
export { IconButton } from "./icon";

export const FlatButton = styled(BaseButton).attrs((props) => ({
  loaderColor: props.theme.colorV2.colorSet.white1000,
}))`
  ${(props) => {
    const palette = props.theme.getButtonElementPalette("button");
    const paletteColor = palette.color ?? props.theme.colorV2.primary.main;
    return css`
      background-color: ${paletteColor};
      color: ${palette.fog800};

      ${() => {
        if (props.isActive) {
          return `
        color: ${paletteColor};
        background-color: ${rgba(paletteColor, 0.14)};
      `;
        }
      }}
    `;
  }}
`;

export const FlatGeneralButton = styled(BaseButton).attrs((props) => ({
  loaderColor: props.theme.colorV2.colorSet.white1000,
}))`
  background-color: ${(props) => props.theme.colorV2.colorSet.grey800};
  color: ${(props) => props.theme.colorV2.colorSet.white1000};
  ${(props) => {
    if (props.isActive) {
      return `
        background-color: ${props.theme.colorV2.colorSet.grey50};
        color: ${props.theme.colorV2.colorSet.grey800};
      `;
    }
  }}
`;

export const GhostButton = styled(BaseButton)`
  ${(props) => {
    const palette = props.theme.getButtonElementPalette("button");
    const paletteColor = palette.color ?? props.theme.colorV2.primary.main;
    return css`
      background-color: transparent;
      color: ${paletteColor};
      border: ${px2rem(1)} solid ${paletteColor};

      ${() => {
        if (props.isActive) {
          return `
        color: ${paletteColor};
        background-color: ${rgba(paletteColor, 0.14)};
        border: 1px solid transparent;
      `;
        }
      }}
    `;
  }}
`;

export const GhostGeneralButton = styled(BaseButton).attrs((props) => ({
  loaderColor: props.theme.colorV2.colorSet.grey800,
}))`
  background-color: transparent;
  color: ${(props) => props.theme.colorV2.colorSet.grey800};
  border: ${px2rem(1)} solid ${(props) => props.theme.colorV2.colorSet.grey100};

  ${(props) => {
    if (props.isActive) {
      return `
        background-color: ${props.theme.colorV2.colorSet.grey50};
        border: 1px solid transparent;
      `;
    }
  }}
`;

export const TextButton = styled(BaseButton)<{ direction?: "left" | "right" }>`
  ${(props) => {
    const palette = props.theme.getButtonElementPalette("button");
    const paletteColor = palette.color ?? props.theme.colorV2.primary.main;
    return css`
      color: ${paletteColor};
    `;
  }}

  background-color: transparent;

  ${(props) =>
    props.direction &&
    css`
    padding-${props.direction}: 0;
    text-align: ${props.direction};
`}
`;

export const TextGeneralButton = styled(BaseButton).attrs((props) => ({
  loaderColor: props.theme.colorV2.colorSet.grey800,
}))<{
  direction?: "left" | "right";
}>`
  background-color: transparent;
  color: ${(props) => props.theme.colorV2.colorSet.grey800};
  ${(props) =>
    props.direction &&
    css`
      padding-${props.direction}: 0;
      text-align: ${props.direction};
    `}
  ${(props) => {
    if (props.isActive) {
      return `
        color: ${props.theme.colorV2.primary.main};
        background-color: ${rgba(props.theme.colorV2.primary.main, 0.14)};
        border: 1px solid transparent;
      `;
    }
  }}
`;

export const FloatActionButton = styled(BaseButton)`
  min-width: initial;
  width: ${px2rem(48)};
  height: ${px2rem(48)};
  background-color: ${(props) => props.theme.colorV2.primary.main};
  color: ${(props) => props.theme.colorV2.colorSet.white1000};
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;
`;
