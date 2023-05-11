import * as React from "react";
import { ThemeProvider } from "styled-components";
import MoimThemeContext from "app/theme/context";
import colorSetReconciler from "app/theme/helpers/colorSetReconciler";

type IProps = React.PropsWithChildren<{
  scale?: Moim.Enums.ThemeColorScaleType;
}>;

function SnackbarThemeProvider({ children, scale }: IProps) {
  const theme = React.useContext(MoimThemeContext);

  const snackbarTheme = React.useMemo(() => {
    if (theme?.theme) {
      return {
        ...theme.theme,
        colorV2: {
          ...theme.theme.colorV2,
          colorSet: colorSetReconciler(
            theme.theme.colorV2.colorSet,
            scale ?? theme.theme.colorV2.primaryFogType,
          ),
        },
      };
    }

    return undefined;
  }, [theme, scale]);

  if (!snackbarTheme) {
    return <>{children}</>;
  }

  return <ThemeProvider theme={snackbarTheme}>{children}</ThemeProvider>;
}

export default SnackbarThemeProvider;
