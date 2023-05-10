/**
 * NOTE:
 * Why every initial constant are surround by function?.
 * > 페이지 첫 렌더링시 임시 테마를 목적으로 상수화된 초기값을 value로 넣어주면 이후 theme API에서 넘겨주는 값으로 치환하려고 했을때,
 * 일부 inner object들의 메모리 포인터가 새로 바꿔야할 object쪽이 아닌 initial시점의 object를 바라보고 있어서 memoize 같은 cache 로직을 가진 함수들이 제대로 동작하지 못하는 문제를 해결하기 위함.
 */

import {
  ElementThemeColorValueTypes,
  ThemeColorScaleTypes,
  ThemeMode,
} from "../../enums";
import elementTheme2ColorSet from "../../helpers/elementTheme2ColorSet";

export const generateDefaultColorSet = () => ({
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
});

export const generateDarkColorSet = () => ({
  color: "#770cd5ff",
  text: "#ffffffff",

  white10: "#05010a05",
  white50: "#05010a0f",
  white100: "#05010a29",
  white200: "#05010a42",
  white300: "#05010a5c",
  white400: "#05010a75",
  white500: "#05010a8f",
  white600: "#05010aa8",
  white700: "#05010ac2",
  white800: "#05010adb",
  white900: "#05010af5",
  white1000: "#05010aff",

  grey50: "#ffffff0f",
  grey10: "#ffffff05",
  grey100: "#ffffff29",
  grey200: "#ffffff42",
  grey300: "#ffffff5c",
  grey400: "#ffffff75",
  grey500: "#ffffff8f",
  grey600: "#ffffffa8",
  grey700: "#ffffffc2",
  grey800: "#ffffffdb",
  grey900: "#fffffff5",
  grey1000: "#ffffffff",

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
});

export const generateDefaultPalette = (
  theme?: Moim.Enums.ThemeModeType
): Moim.Group.IThemePalette => ({
  primary: {
    main: "#ffffffff",
    light: "#ffffffff",
    dark: "#ffffffff",
  },
  secondary: {
    main: "#ffffffff",
    light: "#ffffffff",
    dark: "#ffffffff",
  },
  accent: "#ffffffff",
  colorSetV2:
    theme === ThemeMode.DARK
      ? generateDarkColorSet()
      : generateDefaultColorSet(),
  primaryFogType: ThemeColorScaleTypes.BLACK,
  secondaryFogType: ThemeColorScaleTypes.BLACK,
  accentFogType: ThemeColorScaleTypes.BLACK,
});

export const generateDefaultElementTheme = (): Moim.Group.IElementTheme => ({
  sideArea: {
    background: {
      color: ElementThemeColorValueTypes.WHITE,
      scale: ThemeColorScaleTypes.BLACK,
    },
    categoryTitleText: {
      scale: ThemeColorScaleTypes.BLACK,
    },
    childMoimNameText: {
      scale: ThemeColorScaleTypes.BLACK,
    },
    menuText: {
      scale: ThemeColorScaleTypes.BLACK,
    },
    others: {
      scale: ThemeColorScaleTypes.BLACK,
    },
  },
  topSubArea: {
    background: {
      color: ElementThemeColorValueTypes.WHITE,
      scale: ThemeColorScaleTypes.BLACK,
    },
    childMoimNameText: {
      scale: ThemeColorScaleTypes.BLACK,
    },
    menuText: {
      scale: ThemeColorScaleTypes.BLACK,
    },
  },
  topArea: {
    background: {
      color: ElementThemeColorValueTypes.WHITE,
      scale: ThemeColorScaleTypes.BLACK,
    },
    menuText: {
      scale: ThemeColorScaleTypes.BLACK,
    },
    moimNameText: {
      scale: ThemeColorScaleTypes.BLACK,
    },
    others: {
      scale: ThemeColorScaleTypes.BLACK,
    },
  },
  alert: {
    alertBadge: {
      color: "#fb2942ff",
      scale: ThemeColorScaleTypes.WHITE,
    },
  },
  buttons: {
    button: {
      color: ElementThemeColorValueTypes.PRIMARY_MAIN,
      scale: ThemeColorScaleTypes.BLACK,
    },
  },
});

export const generateDefaultElementThemeColorSet =
  (): Moim.Theme.IElementThemePalette => {
    const defaultPalette = generateDefaultPalette();
    const defaultElementTheme = generateDefaultElementTheme();
    return {
      topArea: {
        background: elementTheme2ColorSet(
          defaultPalette,
          defaultElementTheme.topArea.background
        ),
        moimNameText: elementTheme2ColorSet(
          defaultPalette,
          defaultElementTheme.topArea.moimNameText
        ),
        menuText: elementTheme2ColorSet(
          defaultPalette,
          defaultElementTheme.topArea.menuText
        ),
        others: elementTheme2ColorSet(
          defaultPalette,
          defaultElementTheme.topArea.others
        ),
      },
      topSubArea: {
        background: elementTheme2ColorSet(
          defaultPalette,
          defaultElementTheme.topSubArea.background
        ),
        childMoimNameText: elementTheme2ColorSet(
          defaultPalette,
          defaultElementTheme.topSubArea.childMoimNameText
        ),
        menuText: elementTheme2ColorSet(
          defaultPalette,
          defaultElementTheme.topSubArea.menuText
        ),
      },
      sideArea: {
        background: elementTheme2ColorSet(
          defaultPalette,
          defaultElementTheme.sideArea.background
        ),
        childMoimNameText: elementTheme2ColorSet(
          defaultPalette,
          defaultElementTheme.sideArea.childMoimNameText
        ),
        categoryTitleText: elementTheme2ColorSet(
          defaultPalette,
          defaultElementTheme.sideArea.categoryTitleText
        ),
        menuText: elementTheme2ColorSet(
          defaultPalette,
          defaultElementTheme.sideArea.menuText
        ),
        others: elementTheme2ColorSet(
          defaultPalette,
          defaultElementTheme.sideArea.others
        ),
      },
      alert: {
        alertBadge: elementTheme2ColorSet(
          defaultPalette,
          defaultElementTheme.alert.alertBadge
        ),
      },
      buttons: {
        button: elementTheme2ColorSet(
          defaultPalette,
          defaultElementTheme.buttons.button
        ),
      },
    };
  };
