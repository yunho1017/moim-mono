import * as React from "react";
import { DefaultTheme } from "styled-components";

const MoimThemeContext = React.createContext<{ theme: DefaultTheme } | null>(
  null
);

export default MoimThemeContext;
