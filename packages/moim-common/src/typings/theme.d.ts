declare namespace Moim {
  namespace Theme {
    interface IReferenceColor {
      hue: number;
      saturation: number;
      brightness: number;
      alpha?: number;
    }

    interface IFontTheme {
      black: 900;
      bolder: 700;
      bold: 600;
      medium: 500;
      regular: 400;
      light: 300;
      thin: 100;
    }

    interface IZIndexTheme {
      below: -1;
      default: 1;
      gnb: 500;
      gnbSticky: 500;
      wrapper: 10;
      modal: 50;
      popover: 20;
      toast: 1500;
      tooltip: 1000;
      fullscreen: 1000;
      bottomSheet: 1400;
    }

    interface IColorTheme {
      red700: string;
      red200: string;
      blue700: string;
      blue900: string;
      yellow900: string;
      green400: string;
      green600: string;
      white1000: string;
      cobalt800: string;
      cobalt200: string;
      lightblue900: string;

      pink300: string;
      tangerine300: string;
      cyan300: string;
      magenta300: string;
      lemon300: string;
      skyblue300: string;
      carmine300: string;
      lightgreen300: string;
      marine300: string;
      crimson300: string;
      lime300: string;
      indigo300: string;
      orange300: string;
      jade300: string;
      violet300: string;
      turquoise300: string;
      purple300: string;

      pink400: string;
      tangerine400: string;
      cyan400: string;
      magenta400: string;
      lemon400: string;
      skyblue400: string;
      carmine400: string;
      lightgreen400: string;
      marine400: string;
      crimson400: string;
      lime400: string;
      indigo400: string;
      orange400: string;
      jade400: string;
      violet400: string;
      turquoise400: string;
      purple400: string;

      pink415: string;
      tangerine415: string;
      cyan415: string;
      magenta415: string;
      lemon415: string;
      skyblue415: string;
      carmine415: string;
      lightgreen415: string;
      marine415: string;
      crimson415: string;
      lime415: string;
      indigo415: string;
      orange415: string;
      jade415: string;
      violet415: string;
      turquoise415: string;
      purple415: string;
    }

    interface IShadowTheme {
      whiteElevated: string;
      whiteElevated2: string;
      whiteElevated3: string;
    }

    interface IThemePalette extends Omit<Group.IThemePalette, "colorSetV2"> {
      colorSet: Group.IColorSet;
    }

    interface ITheme {
      font: IFontTheme;
      zIndexes: IZIndexTheme;
      color: IColorTheme;
      shadow: IShadowTheme;
      colorV2: IThemePalette;
      elementThemePalette: Moim.Theme.IElementThemePalette;
      locale: "en" | "ko";
      themeMode: {
        mode: Enums.ThemeModeType;
        lightPalette: IThemePalette;
        darkPalette: IThemePalette;
      };
      getTopAreaElementPalette(
        element?: TopAreaElementThemePaletteKey,
      ): Group.IColorSetWithColor;
      getTopSubAreaElementPalette(
        element?: TopSubAreaElementThemePaletteKey,
      ): Group.IColorSetWithColor;
      getSideAreaElementPalette(
        element?: SideAreaElementThemePaletteKey,
      ): Group.IColorSetWithColor;
      getAlertElementPalette(
        element?: AlertElementThemePaletteKey,
      ): Group.IColorSetWithColor;

      getButtonElementPalette(
        element?: ButtonElementThemePaletteKey,
      ): Group.IColorSetWithColor;

      getThemeElementColor(params: {
        targetColor: keyof Moim.Group.IColorSetWithColor;
        elementPalette?: Moim.Theme.CommonElementThemePaletteProps;
        fallback?: string;
      }): string | undefined;

      getPrimaryFogPalette(): Group.IColorSetWithColor;
      getSecondaryFogPalette(): Group.IColorSetWithColor;
      getColorByAlias(alias?: any, fallback?: string): string | undefined;
    }

    type TopAreaElementThemePaletteKey = keyof Group.ITopAreaElementTheme;
    type TopSubAreaElementThemePaletteKey = keyof Group.ITopSubAreaElementTheme;
    type SideAreaElementThemePaletteKey = keyof Group.ISideAreaElementTheme;
    type AlertElementThemePaletteKey = keyof Group.IAlertElementTheme;
    type ButtonElementThemePaletteKey = keyof Group.IButtonElementTheme;

    type CommonElementThemePaletteProps =
      | {
          type: "topArea";
          key: TopAreaElementThemePaletteKey;
        }
      | {
          type: "sideArea";
          key: SideAreaElementThemePaletteKey;
        }
      | {
          type: "topSubArea";
          key: TopSubAreaElementThemePaletteKey;
        }
      | {
          type: "alert";
          key: AlertElementThemePaletteKey;
        }
      | {
          type: "buttons";
          key: ButtonElementThemePaletteKey;
        };

    interface IElementThemePalette {
      topArea: ITopAreaElementThemePalette;
      topSubArea: ITopSubAreaElementThemePalette;
      sideArea: ISideAreaElementThemePalette;
      alert: IAlertElementThemePalette;
      buttons: IButtonElementThemePalette;
    }

    interface ITopAreaElementThemePalette {
      background: Group.IColorSetWithColor;
      moimNameText: Group.IColorSetWithColor;
      menuText: Group.IColorSetWithColor;
      others: Group.IColorSetWithColor;
    }

    interface ITopSubAreaElementThemePalette {
      background: Group.IColorSetWithColor;
      childMoimNameText: Group.IColorSetWithColor;
      menuText: Group.IColorSetWithColor;
    }

    interface ISideAreaElementThemePalette {
      background: Group.IColorSetWithColor;
      childMoimNameText: Group.IColorSetWithColor;
      categoryTitleText: Group.IColorSetWithColor;
      menuText: Group.IColorSetWithColor;
      others: Group.IColorSetWithColor;
    }

    interface IAlertElementThemePalette {
      alertBadge: Group.IColorSetWithColor;
    }

    interface IButtonElementThemePalette {
      button: Group.IColorSetWithColor;
    }
  }
}
