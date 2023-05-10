import { ThemeColorScaleTypes } from "../enums";

export default function colorSetReconciler(
  colorSet: Moim.Group.IColorSet,
  scale: Moim.Enums.ThemeColorScaleType
): Moim.Group.IColorSet {
  const rgbaColorSet = {
    grey50: colorSet.grey50,
    grey100: colorSet.grey100,
    grey200: colorSet.grey200,
    grey300: colorSet.grey300,
    grey400: colorSet.grey400,
    grey500: colorSet.grey500,
    grey600: colorSet.grey600,
    grey700: colorSet.grey700,
    grey800: colorSet.grey800,
    grey900: colorSet.grey900,
    white50: colorSet.white50,
    white100: colorSet.white100,
    white200: colorSet.white200,
    white300: colorSet.white300,
    white400: colorSet.white400,
    white500: colorSet.white500,
    white600: colorSet.white600,
    white700: colorSet.white700,
    white800: colorSet.white800,
    white900: colorSet.white900,
  };
  switch (scale) {
    case ThemeColorScaleTypes.BLACK: {
      return {
        ...colorSet,
        ...rgbaColorSet,
        fog50: colorSet.grey50,
        fog100: colorSet.grey100,
        fog200: colorSet.grey200,
        fog300: colorSet.grey300,
        fog400: colorSet.grey400,
        fog500: colorSet.grey500,
        fog600: colorSet.grey600,
        fog700: colorSet.grey700,
        fog800: colorSet.grey800,
        fog900: colorSet.grey900,
      };
    }

    case ThemeColorScaleTypes.WHITE: {
      return {
        ...colorSet,
        ...rgbaColorSet,
        fog50: colorSet.white50,
        fog100: colorSet.white100,
        fog200: colorSet.white200,
        fog300: colorSet.white300,
        fog400: colorSet.white400,
        fog500: colorSet.white500,
        fog600: colorSet.white600,
        fog700: colorSet.white700,
        fog800: colorSet.white800,
        fog900: colorSet.white900,
      };
    }

    default:
      return colorSet;
  }
}
