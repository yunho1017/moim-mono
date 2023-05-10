import { ThemeColorScaleTypes } from "../enums";
import { getColorByAliasGenerator } from "../theme";
import hex2RGBA from "./hexToRgba";

export function getFogColorSetGenerator(
  colorSet: Moim.Group.IColorSet,
  scale: Moim.Enums.ThemeColorScaleType,
  mainColor?: string
): () => Moim.Group.IColorSetWithColor {
  return () => {
    const rgbaColorSet = {
      fog10: hex2RGBA(colorSet.fog10),
      grey50: hex2RGBA(colorSet.grey50),
      grey100: hex2RGBA(colorSet.grey100),
      grey200: hex2RGBA(colorSet.grey200),
      grey300: hex2RGBA(colorSet.grey300),
      grey400: hex2RGBA(colorSet.grey400),
      grey500: hex2RGBA(colorSet.grey500),
      grey600: hex2RGBA(colorSet.grey600),
      grey700: hex2RGBA(colorSet.grey700),
      grey800: hex2RGBA(colorSet.grey800),
      grey900: hex2RGBA(colorSet.grey900),
      grey1000: hex2RGBA(colorSet.grey1000),
      white10: hex2RGBA(colorSet.white10),
      white50: hex2RGBA(colorSet.white50),
      white100: hex2RGBA(colorSet.white100),
      white200: hex2RGBA(colorSet.white200),
      white300: hex2RGBA(colorSet.white300),
      white400: hex2RGBA(colorSet.white400),
      white500: hex2RGBA(colorSet.white500),
      white600: hex2RGBA(colorSet.white600),
      white700: hex2RGBA(colorSet.white700),
      white800: hex2RGBA(colorSet.white800),
      white900: hex2RGBA(colorSet.white900),
      white1000: hex2RGBA(colorSet.white1000),
    };
    switch (scale) {
      case ThemeColorScaleTypes.BLACK: {
        return {
          ...colorSet,
          ...rgbaColorSet,
          color: mainColor,
          fog10: hex2RGBA(colorSet.grey10),
          fog50: hex2RGBA(colorSet.grey50),
          fog100: hex2RGBA(colorSet.grey100),
          fog200: hex2RGBA(colorSet.grey200),
          fog300: hex2RGBA(colorSet.grey300),
          fog400: hex2RGBA(colorSet.grey400),
          fog500: hex2RGBA(colorSet.grey500),
          fog600: hex2RGBA(colorSet.grey600),
          fog700: hex2RGBA(colorSet.grey700),
          fog800: hex2RGBA(colorSet.grey800),
          fog900: hex2RGBA(colorSet.grey900),
        };
      }

      case ThemeColorScaleTypes.WHITE: {
        return {
          ...colorSet,
          ...rgbaColorSet,
          color: mainColor,
          fog10: hex2RGBA(colorSet.white10),
          fog50: hex2RGBA(colorSet.white50),
          fog100: hex2RGBA(colorSet.white100),
          fog200: hex2RGBA(colorSet.white200),
          fog300: hex2RGBA(colorSet.white300),
          fog400: hex2RGBA(colorSet.white400),
          fog500: hex2RGBA(colorSet.white500),
          fog600: hex2RGBA(colorSet.white600),
          fog700: hex2RGBA(colorSet.white700),
          fog800: hex2RGBA(colorSet.white800),
          fog900: hex2RGBA(colorSet.white900),
        };
      }

      default:
        return { ...colorSet, color: mainColor };
    }
  };
}
export default function elementTheme2ColorSet(
  palette: Moim.Group.IThemePalette,
  elementThemeValue: Moim.Group.IElementThemeValue
): Moim.Group.IColorSetWithColor {
  const getColorByAlias = getColorByAliasGenerator(palette);
  const mainColor = getColorByAlias(elementThemeValue.color);
  const getFogColorSet = getFogColorSetGenerator(
    palette.colorSetV2,
    elementThemeValue.scale,
    mainColor
  );

  return getFogColorSet();
}
