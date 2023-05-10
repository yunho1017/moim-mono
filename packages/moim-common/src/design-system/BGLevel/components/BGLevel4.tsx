import styled, { css } from "styled-components";
import { rgba } from "polished";
import {
  BG_LEVEL_BACKGROUND_CLASS_NAME,
  getBGLevelWithBackgroundStyle,
} from "./common";
import { ThemeMode } from "../../../enums";
import { px2rem } from "../../../helpers/rem";

const bgLevel4BackgroundOverrideStyle = css`
  .${BG_LEVEL_BACKGROUND_CLASS_NAME} {
    ${getBGLevelWithBackgroundStyle(
      css`
        ${(props) =>
          props.theme.themeMode.mode === ThemeMode.DARK
            ? css`
                background-color: ${rgba(
                  props.theme.themeMode.darkPalette.colorSet.grey1000,
                  0.12
                )};
              `
            : undefined}
      `
    )}
  }
`;
const bgLevel4PureStyle = css`
  ${(props) =>
    props.theme.themeMode.mode === ThemeMode.DARK
      ? css`
          background-color: ${rgba(
            props.theme.themeMode.darkPalette.colorSet.grey1000,
            0.12
          )};
        `
      : css`
          box-shadow: 0 ${px2rem(4)} ${px2rem(16)} 0
            ${rgba(props.theme.themeMode.lightPalette.colorSet.grey1000, 0.12)};

          background-color: ${(props) =>
            props.theme.themeMode.lightPalette.colorSet.white1000};
        `}
`;

export const bgLevel4Style = css`
  ${bgLevel4BackgroundOverrideStyle}
  ${bgLevel4PureStyle}
`;

export const BGLevel4 = styled.div`
  ${bgLevel4Style}
`;

export const getBGLevel4DialogStyle = (params?: {
  borderRadius?: number;
}) => css`
  ${getBGLevelWithBackgroundStyle(bgLevel4PureStyle, params)}
  ${bgLevel4BackgroundOverrideStyle}
`;
