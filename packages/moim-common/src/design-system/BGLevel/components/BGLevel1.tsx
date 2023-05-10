import styled, { css } from "styled-components";
import { rgba } from "polished";
import {
  BG_LEVEL_BACKGROUND_CLASS_NAME,
  getBGLevelWithBackgroundStyle,
} from "./common";
import { ThemeMode } from "../../../enums";
import { px2rem } from "../../../helpers/rem";

const bgLevel1BackgroundStyle = css`
  .${BG_LEVEL_BACKGROUND_CLASS_NAME} {
    ${getBGLevelWithBackgroundStyle(
      css`
        ${(props) =>
          props.theme.themeMode.mode === ThemeMode.DARK
            ? css`
                background-color: ${rgba(
                  props.theme.themeMode.darkPalette.colorSet.grey1000,
                  0.06
                )};
              `
            : undefined}
      `
    )}
  }
`;
const bgLevel1PureStyle = css`
  ${(props) => {
    return props.theme.themeMode.mode === ThemeMode.DARK
      ? css`
          background-color: ${rgba(
            props.theme.themeMode.darkPalette.colorSet.grey1000,
            0.06
          )};
        `
      : css`
          border: ${px2rem(1)} solid
            ${props.theme.themeMode.lightPalette.colorSet.grey50};
          background-color: ${(props) =>
            props.theme.themeMode.lightPalette.colorSet.white1000};
        `;
  }}
`;

export const bgLevel1Style = css`
  ${bgLevel1BackgroundStyle}
  ${bgLevel1PureStyle}
`;

export const BGLevel1 = styled.div`
  ${bgLevel1Style}
`;

export const getBGLevel1DialogStyle = (params?: {
  borderRadius?: number;
}) => css`
  ${bgLevel1BackgroundStyle}
  ${getBGLevelWithBackgroundStyle(bgLevel1PureStyle, params)}
`;
