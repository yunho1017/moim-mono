import { rgba } from "polished";
import memoize from "lodash/memoize";
import getColorSetWithRgbaConvert from "../helpers/getColorSet";
import hexToRGBA from "../helpers/hexToRgba";
import { getColorByAlias } from "..";

function generateColorTheme(): Moim.Theme.IColorTheme {
  return {
    blue900: "#009CAD",
    blue700: "#17CEDF",
    red700: "#FB2942",
    red200: rgba(251, 41, 66, 0.14),
    yellow900: "#FCBA02",
    green400: "#60ff00",
    green600: "#01D7AB",
    white1000: "#FFFFFF",
    cobalt800: "#1469BF",
    cobalt200: rgba(20, 105, 191, 0.14),
    lightblue900: "#0096FF",

    pink300: "#ff00f4",
    tangerine300: "#ff9000",
    cyan300: "#00e9ff",
    magenta300: "#ff00a5",
    lemon300: "#ffe300",
    skyblue300: "#00c7ff",
    carmine300: "#ff0050",
    lightgreen300: "#bdf400",
    marine300: "#3e00ff",
    crimson300: "#f60606",
    lime300: "#00f406",
    indigo300: "#6300ff",
    orange300: "#f66606",
    jade300: "#00f498",
    violet300: "#8c1dff",
    turquoise300: "#00efd9",
    purple300: "#c01dff",

    pink400: "#cc31c6",
    tangerine400: "#cc8931",
    cyan400: "#31aacc",
    magenta400: "#cc3196",
    lemon400: "#ccbb31",
    skyblue400: "#3177cc",
    carmine400: "#cc3162",
    lightgreen400: "#ccbb31",
    marine400: "#3431cc",
    crimson400: "#cc3131",
    lime400: "#a9cc31",
    indigo400: "#462fcc",
    orange400: "#cc6f31",
    jade400: "#32cc8d",
    violet400: "#6d31cc",
    turquoise400: "#32c5cc",
    purple400: "#7d31cc",

    pink415: rgba("#cc31c6", 0.15),
    tangerine415: rgba("#cc8931", 0.15),
    cyan415: rgba("#31aacc", 0.15),
    magenta415: rgba("#cc3196", 0.15),
    lemon415: rgba("#ccbb31", 0.15),
    skyblue415: rgba("#3177cc", 0.15),
    carmine415: rgba("#cc3162", 0.15),
    lightgreen415: rgba("#ccbb31", 0.15),
    marine415: rgba("#3431cc", 0.15),
    crimson415: rgba("#cc3131", 0.15),
    lime415: rgba("#a9cc31", 0.15),
    indigo415: rgba("#462fcc", 0.15),
    orange415: rgba("#cc6f31", 0.15),
    jade415: rgba("#32cc8d", 0.15),
    violet415: rgba("#6d31cc", 0.15),
    turquoise415: rgba("#32c5cc", 0.15),
    purple415: rgba("#7d31cc", 0.15),
  };
}

export const generateColorV2Theme = memoize(function(
  colorV2: Moim.Group.IThemePalette,
): Moim.Group.IThemePalette {
  return {
    primary: {
      main: hexToRGBA(colorV2.primary.main ?? ""),
      dark: hexToRGBA(colorV2.primary.dark ?? ""),
      light: hexToRGBA(colorV2.primary.light ?? ""),
    },
    secondary: {
      main: hexToRGBA(colorV2.secondary.main ?? ""),
      dark: hexToRGBA(colorV2.secondary.dark ?? ""),
      light: hexToRGBA(colorV2.secondary.light ?? ""),
    },
    accent: getColorByAlias(colorV2, colorV2.accent, colorV2.primary.main)!,
    colorSetV2: getColorSetWithRgbaConvert(colorV2.colorSetV2),
    primaryFogType: colorV2.primaryFogType,
    secondaryFogType: colorV2.secondaryFogType,
    accentFogType: colorV2.accentFogType,
  };
});

export default memoize(generateColorTheme);
