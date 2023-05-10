import { DefaultTheme } from "styled-components";
import fontWeights from "./constants/font";
import zIndexSet from "./constants/zIndex";
import generateColorTheme, { generateColorV2Theme } from "./color";
import generateShadowSet from "./shadow";
import { getFogColorSetGenerator } from "../helpers/elementTheme2ColorSet";
import { ElementThemeColorValueTypes, ThemeMode } from "../enums";
import hex2RGBA from "../helpers/hexToRgba";
import { SupportedLanguageType } from "../intl";

export default function makeTheme(data: {
  themeMode: Moim.Enums.ThemeModeType;
  locale: SupportedLanguageType;
  palette: Moim.Group.IThemePalette;
  darkPalette: Moim.Group.IThemePalette;
  elementThemePalette: Moim.Theme.IElementThemePalette;
}): DefaultTheme {
  const { themeMode, locale, palette, darkPalette, elementThemePalette } = data;
  const colorSet = generateColorTheme();
  const originalPalette = palette;
  const themePalette = themeMode === ThemeMode.DARK ? darkPalette : palette;
  const originalColorV2Set = generateColorV2Theme(originalPalette);
  const themeColorV2Set = generateColorV2Theme(themePalette);

  const getTopAreaElementPalette = (
    element?: Moim.Theme.TopAreaElementThemePaletteKey
  ): Moim.Group.IColorSetWithColor =>
    element
      ? elementThemePalette.topArea[element] ?? originalColorV2Set.colorSetV2
      : originalColorV2Set.colorSetV2;

  const getTopSubAreaElementPalette = (
    element?: Moim.Theme.TopSubAreaElementThemePaletteKey
  ): Moim.Group.IColorSetWithColor =>
    element
      ? elementThemePalette.topSubArea[element] ?? originalColorV2Set.colorSetV2
      : originalColorV2Set.colorSetV2;

  const getSideAreaElementPalette = (
    element?: Moim.Theme.SideAreaElementThemePaletteKey
  ): Moim.Group.IColorSetWithColor =>
    element
      ? elementThemePalette.sideArea[element] ?? originalColorV2Set.colorSetV2
      : originalColorV2Set.colorSetV2;

  const getAlertElementPalette = (
    element?: Moim.Theme.AlertElementThemePaletteKey
  ): Moim.Group.IColorSetWithColor =>
    element
      ? elementThemePalette.alert[element] ?? originalColorV2Set.colorSetV2
      : originalColorV2Set.colorSetV2;

  const getButtonElementPalette = (
    element?: Moim.Theme.ButtonElementThemePaletteKey
  ): Moim.Group.IColorSetWithColor =>
    element
      ? elementThemePalette.buttons[element] ?? originalColorV2Set.colorSetV2
      : originalColorV2Set.colorSetV2;

  const getThemeElementColor = ({
    targetColor,
    elementPalette,
    fallback,
  }: {
    targetColor: keyof Moim.Group.IColorSetWithColor;
    elementPalette?: Moim.Theme.CommonElementThemePaletteProps;
    fallback?: string;
  }) => {
    switch (elementPalette?.type) {
      case "topArea": {
        return (
          getTopAreaElementPalette(elementPalette.key)[targetColor] ?? fallback
        );
      }
      case "topSubArea": {
        return (
          getTopSubAreaElementPalette(elementPalette.key)[targetColor] ??
          fallback
        );
      }
      case "sideArea": {
        return (
          getSideAreaElementPalette(elementPalette.key)[targetColor] ?? fallback
        );
      }

      case "alert": {
        return (
          getAlertElementPalette(elementPalette.key)[targetColor] ?? fallback
        );
      }

      case "buttons": {
        return (
          getButtonElementPalette(elementPalette.key)[targetColor] ?? fallback
        );
      }
      default:
        return fallback;
    }
  };

  const getPrimaryFogPalette = getFogColorSetGenerator(
    originalPalette.colorSetV2,
    originalPalette.primaryFogType,
    originalPalette.primary.main
  );

  const getSecondaryFogPalette = getFogColorSetGenerator(
    originalPalette.colorSetV2,
    originalPalette.primaryFogType,
    originalPalette.primary.main
  );

  const getColorByAlias = getColorByAliasGenerator(originalColorV2Set);

  return {
    locale,
    elementThemePalette,
    font: fontWeights,
    zIndexes: zIndexSet,
    color: colorSet,
    shadow: generateShadowSet(themeColorV2Set.colorSetV2),
    colorV2: {
      ...themeColorV2Set,
      colorSet: themeColorV2Set.colorSetV2,
    },
    themeMode: {
      mode: themeMode,
      lightPalette: { ...palette, colorSet: palette.colorSetV2 },
      darkPalette: { ...darkPalette, colorSet: darkPalette.colorSetV2 },
    },

    getTopAreaElementPalette,
    getTopSubAreaElementPalette,
    getSideAreaElementPalette,
    getAlertElementPalette,
    getButtonElementPalette,
    getPrimaryFogPalette,
    getThemeElementColor,
    getSecondaryFogPalette,
    getColorByAlias,
  } as unknown as DefaultTheme;
}

export function getColorByAlias(
  colorData: {
    primary: Moim.Group.IThemePaletteColor;
    secondary: Moim.Group.IThemePaletteColor;
  },
  alias?: Moim.Enums.ElementThemeColorValueType | string,
  fallback?: string
) {
  switch (alias?.toUpperCase()) {
    case ElementThemeColorValueTypes.PRIMARY_MAIN: {
      return colorData.primary.main;
    }
    case ElementThemeColorValueTypes.PRIMARY_LIGHT: {
      return colorData.primary.light;
    }
    case ElementThemeColorValueTypes.PRIMARY_DARK: {
      return colorData.primary.dark;
    }
    case ElementThemeColorValueTypes.SECONDARY_MAIN: {
      return colorData.secondary.main;
    }
    case ElementThemeColorValueTypes.SECONDARY_LIGHT: {
      return colorData.secondary.light;
    }
    case ElementThemeColorValueTypes.SECONDARY_DARK: {
      return colorData.secondary.dark;
    }

    case ElementThemeColorValueTypes.BLACK: {
      return "rgba(0,0,0,1.00)";
    }

    case ElementThemeColorValueTypes.WHITE: {
      return "rgba(255,255,255,1.00)";
    }

    default: {
      if (
        alias &&
        typeof alias === "string" &&
        (alias as string).startsWith("#")
      ) {
        if ((alias as string).length >= 8) {
          return hex2RGBA(alias);
        }

        return alias;
      } else if (
        typeof alias === "string" &&
        (alias as string).startsWith("rgb")
      ) {
        return alias;
      }
      return fallback;
    }
  }
}
export function getColorByAliasGenerator(theme: Moim.Group.IThemePalette) {
  return (
    alias?: Moim.Enums.ElementThemeColorValueType | string,
    fallback?: string
  ) => getColorByAlias(theme, alias, fallback);
}
