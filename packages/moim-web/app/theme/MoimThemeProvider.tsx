import * as React from "react";
import {
  DefaultTheme,
  ThemeProvider,
  createGlobalStyle,
} from "styled-components";
import MoimThemeContext from "./context";
import makeTheme from "./";
import { useStoreState } from "app/store";
import {
  elementThemePaletteGenerator,
  sideNavigationThemePaletteSelector,
} from "app/selectors/theme";
import { browserLocale } from "app/intl";
import { ThemeMode } from "app/enums";
import { px2rem } from "common/helpers/rem";
import {
  BG_LEVEL_BACKGROUND_CLASS_NAME,
  getBGLevel3DialogStyle,
  getBGLevel4DialogStyle,
} from "common/components/designSystem/BGLevel";

type IProps = React.PropsWithChildren<{}>;

const GlobalStyle = createGlobalStyle<{ theme: DefaultTheme }>`
  body {
    background-color: ${props => props.theme.colorV2.colorSet.white1000};
    .${BG_LEVEL_BACKGROUND_CLASS_NAME} {
      background-color: ${props => props.theme.colorV2.colorSet.white1000};
    }

    .MuiBackdrop-root {
      background-color: ${props =>
        props.theme.themeMode.mode === ThemeMode.DARK
          ? props.theme.colorV2.colorSet.white500
          : props.theme.colorV2.colorSet.grey500};
    }

    .MuiPaper-root {
      border-radius: ${px2rem(2)};
      ${getBGLevel3DialogStyle({
        borderRadius: 2,
      })}
      position: absolute;
    }

    // new Bottom Sheet
    [aria-modal] {
      ${getBGLevel4DialogStyle()}
    }
  }
`;
function MoimThemeProvider({ children }: IProps) {
  // TODO 추후에 isProd 체크 추가
  const queryThemeMode = new URLSearchParams(location.search)
    .get("themeMode")
    ?.toUpperCase() as Moim.Enums.ThemeModeType;
  const {
    themeMode,
    locale,
    palette,
    darkPalette,
    elementThemePalette,
  } = useStoreState(state => ({
    themeMode: queryThemeMode
      ? queryThemeMode
      : (state.app.currentGroupId
          ? state.entities.groups[state.app.currentGroupId]?.config.theme_web
          : undefined) ?? ThemeMode.LIGHT,
    palette: state.group.theme.palette,
    darkPalette: state.group.theme.darkPalette,
    elementThemePalette: sideNavigationThemePaletteSelector(state),
    locale: browserLocale(state.app.locale || undefined),
  }));

  const generateTheme = React.useMemo(
    () =>
      makeTheme({
        themeMode,
        locale,
        palette,
        darkPalette,
        elementThemePalette,
      }),
    [themeMode, palette, darkPalette, elementThemePalette, locale],
  );

  const [theme, setTheme] = React.useState<DefaultTheme>(generateTheme);

  const themeObject = React.useMemo(() => ({ theme }), [theme]);

  React.useEffect(() => {
    setTheme(generateTheme);
  }, [generateTheme]);

  const handlePreviewTheme = (event: MessageEvent) => {
    try {
      const data = JSON.parse(event.data) as {
        theme: {
          palette: Moim.Group.IThemePalette;
          element: Moim.Group.IElementTheme;
        };
      };

      setTheme(
        makeTheme({
          locale,
          themeMode,
          palette: data.theme.palette,
          darkPalette: darkPalette,
          elementThemePalette: elementThemePaletteGenerator(
            data.theme.palette,
            data.theme.element,
          ),
        }),
      );
      // eslint-disable-next-line no-empty
    } catch {}
  };

  React.useEffect(() => {
    window.addEventListener("message", handlePreviewTheme, false);
    return () => window.removeEventListener("message", handlePreviewTheme);
  }, []);

  return (
    <>
      <GlobalStyle theme={themeObject.theme} />
      <MoimThemeContext.Provider value={themeObject}>
        <ThemeProvider key="styled-theme-provider" theme={theme}>
          {children}
        </ThemeProvider>
      </MoimThemeContext.Provider>
    </>
  );
}

export default MoimThemeProvider;
