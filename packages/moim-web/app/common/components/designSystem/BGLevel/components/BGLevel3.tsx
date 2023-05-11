import { ThemeMode } from "app/enums";
import { px2rem } from "common/helpers/rem";
import { rgba } from "polished";
import styled, { css } from "styled-components";
import {
  BG_LEVEL_BACKGROUND_CLASS_NAME,
  getBGLevelWithBackgroundStyle,
} from "./common";

const bgLevel3BackgroundStyle = css`
  .${BG_LEVEL_BACKGROUND_CLASS_NAME} {
    ${getBGLevelWithBackgroundStyle(
      css`
        ${props =>
          props.theme.themeMode.mode === ThemeMode.DARK
            ? css`
                background-color: ${rgba(
                  props.theme.themeMode.darkPalette.colorSet.grey1000,
                  0.1,
                )};
              `
            : undefined}
      `,
    )}
  }
`;
const bgLevel3PureStyle = css`
  ${props =>
    props.theme.themeMode.mode === ThemeMode.DARK
      ? css`
          background-color: ${rgba(
            props.theme.themeMode.darkPalette.colorSet.grey1000,
            0.1,
          )};
        `
      : css`
          box-shadow: 0 ${px2rem(2)} ${px2rem(8)} 0
            ${rgba(props.theme.themeMode.lightPalette.colorSet.grey1000, 0.1)};
          background-color: ${props =>
            props.theme.themeMode.lightPalette.colorSet.white1000};
        `}
`;

export const bgLevel3Style = css`
  ${bgLevel3BackgroundStyle}
  ${bgLevel3PureStyle}
`;

export const BGLevel3 = styled.div`
  ${bgLevel3Style}
`;

export const getBGLevel3DialogStyle = (params?: {
  borderRadius?: number;
}) => css`
  ${getBGLevelWithBackgroundStyle(bgLevel3PureStyle, params)}
  ${bgLevel3BackgroundStyle}
`;
