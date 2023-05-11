import styled, { css, FlattenInterpolation } from "styled-components";
import { rgba } from "polished";
import { px2rem } from "common/helpers/rem";
import { getBGLevel4DialogStyle } from "../designSystem/BGLevel";
import { ThemeMode } from "app/enums";

export const sheetHeaderHeight = 16;

export const BottomSheetRoot = styled.div<{ open: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: ${props => props.theme.zIndexes.bottomSheet};
  visibility: ${props => (props.open ? "visible" : "hidden")};
  transition: visibility 300ms ease-in-out;
`;

export const Backdrop = styled.div`
  background-color: ${props =>
    props.theme.themeMode.mode === ThemeMode.DARK
      ? props.theme.colorV2.colorSet.white800
      : props.theme.colorV2.colorSet.grey500};
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: ${props => props.theme.zIndexes.below};
`;

export const Sheet = styled.div<{ isFullScreen: boolean }>`
  ${getBGLevel4DialogStyle()}

  transition: transform 120ms ease-in-out 0ms;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  z-index: ${props => props.theme.zIndexes.bottomSheet};
  overflow: hidden;

  border-radius: ${props => (props.isFullScreen ? 0 : px2rem(8))};
`;

export const SheetHeader = styled.div<{
  overrideStyle?: FlattenInterpolation<any>;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .bottomSheetHandler {
    display: block;
    width: 100%;
    height: ${px2rem(16)};
  }

  ${props => props.overrideStyle};
`;

export const Handler = styled.div`
  width: ${px2rem(39)};
  height: ${px2rem(4)};
  border-radius: ${px2rem(2)};
  background-color: ${props => rgba(props.theme.colorV2.colorSet.grey300, 0.6)};
`;

export const SheetContent = styled.div<{
  isFullScreen: boolean;
  needScroll: boolean;
  innerChildHeight: number;
}>`
  flex: 1;
  min-height: 0;

  ${props =>
    props.isFullScreen
      ? css`
          > * {
            height: 100% !important;
            max-height: 100% !important;
          }
        `
      : props.needScroll
      ? css`
          > * {
            height: calc(
              ${px2rem(props.innerChildHeight)} - env(safe-area-inset-bottom)
            );
          }
        `
      : null}
`;
