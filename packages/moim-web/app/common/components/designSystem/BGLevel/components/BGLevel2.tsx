import { ThemeMode } from "app/enums";
import { px2rem } from "common/helpers/rem";
import { rgba } from "polished";
import styled, { css } from "styled-components";
import {
  BG_LEVEL_BACKGROUND_CLASS_NAME,
  getBGLevelWithBackgroundStyle,
} from "./common";

const bgLevel2BackgroundStyle = css`
  .${BG_LEVEL_BACKGROUND_CLASS_NAME} {
    ${getBGLevelWithBackgroundStyle(
      css`
        ${props =>
          props.theme.themeMode.mode === ThemeMode.DARK
            ? css`
                background-color: ${rgba(
                  props.theme.themeMode.darkPalette.colorSet.grey1000,
                  0.08,
                )};
              `
            : undefined}
      `,
    )}
  }
`;
const bgLevel2PureStyle = css`
  ${props =>
    props.theme.themeMode.mode === ThemeMode.DARK
      ? css`
          background-color: ${rgba(
            props.theme.themeMode.darkPalette.colorSet.grey1000,
            0.08,
          )};
        `
      : css`
          box-shadow: 0 ${px2rem(2)} ${px2rem(6)} ${px2rem(1)}
            ${props.theme.themeMode.lightPalette.colorSet.grey50};
          background-color: ${props.theme.themeMode.lightPalette.colorSet
            .white1000};
        `}
`;

export const bgLevel2Style = css`
  ${bgLevel2BackgroundStyle}
  ${bgLevel2PureStyle}
`;

export const BGLevel2 = styled.div`
  ${bgLevel2Style}
`;

export const getBGLevel2DialogStyle = (params?: {
  borderRadius?: number;
}) => css`
  ${getBGLevelWithBackgroundStyle(bgLevel2PureStyle, params)}
  ${bgLevel2BackgroundStyle}
`;
