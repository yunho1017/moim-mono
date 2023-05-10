import * as React from "react";
import MoimThemeContext from "../context";

function useTheme() {
  return React.useContext(MoimThemeContext);
}

export default useTheme;
