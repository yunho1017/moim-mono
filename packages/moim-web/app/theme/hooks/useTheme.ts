import * as React from "react";
import MoimThemeContext from "app/theme/context";

function useTheme() {
  return React.useContext(MoimThemeContext);
}

export default useTheme;
