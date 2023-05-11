import * as React from "react";
import { DefaultTheme, ThemeProvider } from "styled-components";

import fontWeights from "app/theme/constants/font";
import zIndexSet from "app/theme/constants/zIndex";
import generateColorTheme from "app/theme/color";
import { getColorByAliasGenerator } from "app/theme";
import generateShadowSet from "app/theme/shadow";
import { browserLocale } from "app/intl";
import { ThemeColorScaleTypes } from "app/enums";

type IProps = React.PropsWithChildren<{}>;

const HUB_COLOR_SET = {
  color: "#770cd5ff",
  text: "#ffffffff",

  grey10: "#05010a05",
  grey50: "#05010a0f",
  grey100: "#05010a29",
  grey200: "#05010a42",
  grey300: "#05010a5c",
  grey400: "#05010a75",
  grey500: "#05010a8f",
  grey600: "#05010aa8",
  grey700: "#05010ac2",
  grey800: "#05010adb",
  grey900: "#05010af5",
  grey1000: "#05010aff",

  white50: "#ffffff0f",
  white10: "#ffffff05",
  white100: "#ffffff29",
  white200: "#ffffff42",
  white300: "#ffffff5c",
  white400: "#ffffff75",
  white500: "#ffffff8f",
  white600: "#ffffffa8",
  white700: "#ffffffc2",
  white800: "#ffffffdb",
  white900: "#fffffff5",
  white1000: "#ffffffff",

  fog10: "#ffffff05",
  fog50: "#ffffff0f",
  fog100: "#ffffff29",
  fog200: "#ffffff42",
  fog300: "#ffffff5c",
  fog400: "#ffffff75",
  fog500: "#ffffff8f",
  fog600: "#ffffffa8",
  fog700: "#ffffffc2",
  fog800: "#ffffffdb",
  fog900: "#fffffff5",
  fog1000: "#ffffffff",
};

const HUB_PALETTE: Moim.Group.IThemePalette = {
  primary: {
    main: "#17cedfff",
    dark: "#17cedfff",
    light: "#17cedfff",
  },
  secondary: {
    main: "#17cedfff",
    dark: "#17cedfff",
    light: "#17cedfff",
  },
  accent: "#17cedfff",
  colorSetV2: HUB_COLOR_SET,
  primaryFogType: ThemeColorScaleTypes.WHITE,
  secondaryFogType: ThemeColorScaleTypes.WHITE,
  accentFogType: ThemeColorScaleTypes.WHITE,
};

function HubThemeProvider({ children }: IProps) {
  const theme: DefaultTheme = React.useMemo(
    () =>
      (({
        font: fontWeights,
        zIndexes: zIndexSet,
        color: generateColorTheme(),
        shadow: generateShadowSet(HUB_COLOR_SET),
        colorV2: { ...HUB_PALETTE, colorSet: HUB_PALETTE.colorSetV2 },
        locale: browserLocale(),
        elementThemePalette: {} as Moim.Theme.IElementThemePalette,
        getColorByAlias: getColorByAliasGenerator(HUB_PALETTE),
        getTopAreaElementPalette: () => HUB_COLOR_SET,
        getTopSubAreaElementPalette: () => HUB_COLOR_SET,
        getSideAreaElementPalette: () => HUB_COLOR_SET,
        getAlertElementPalette: () => HUB_COLOR_SET,
        getButtonElementPalette: () => HUB_COLOR_SET,
        getThemeElementColor: () => "",
        getPrimaryFogPalette: () => HUB_COLOR_SET,
        getSecondaryFogPalette: () => HUB_COLOR_SET,
      } as unknown) as DefaultTheme),
    [],
  );

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default HubThemeProvider;
