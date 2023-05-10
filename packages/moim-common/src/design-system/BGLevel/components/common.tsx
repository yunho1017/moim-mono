import { css, FlattenInterpolation } from "styled-components";
import { ThemeMode } from "../../../enums";
import { px2rem } from "../../../helpers/rem";

export const BG_LEVEL_BACKGROUND_CLASS_NAME = "bglevel-background";

export const getBGLevelWithBackgroundStyle = (
  styles: FlattenInterpolation<any>,
  params?: { borderRadius?: number }
) => css`
  position: sticky;
  background-color: ${(props) => props.theme.colorV2.colorSet.white1000};
  ${(props) =>
    props.theme.themeMode.mode === ThemeMode.DARK
      ? css`
          &::before {
            ${params?.borderRadius &&
            css`
              border-radius: ${px2rem(params.borderRadius)};
            `}

            content: "";

            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            pointer-events: none;
            ${styles}
          }
        `
      : css`
          ${styles}
        `}
`;
