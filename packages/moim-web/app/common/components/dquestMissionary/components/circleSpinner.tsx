import * as React from "react";
import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import { ThemeType } from "../component";
import useTheme from "app/theme/hooks/useTheme";

interface IProps {
  selectedTheme: ThemeType;
  size?: number;
}

const CircleSpinner: React.FC<IProps> = ({ selectedTheme, size = 36 }) => {
  const theme = useTheme();
  return (
    <Box style={{ position: "relative" }}>
      <CircularProgress
        variant="determinate"
        sx={{
          color:
            selectedTheme === "black"
              ? theme?.theme.themeMode.lightPalette.colorSet.grey100
              : theme?.theme.themeMode.lightPalette.colorSet.white100,
        }}
        size={size}
        disableShrink={true}
        thickness={3}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        sx={{
          animationDuration: "550ms",
          color:
            selectedTheme === "black"
              ? theme?.theme.themeMode.lightPalette.colorSet.grey1000
              : theme?.theme.themeMode.lightPalette.colorSet.white1000,
          position: "absolute",
          left: 0,
        }}
        size={size}
        disableShrink={true}
        thickness={3}
      />
    </Box>
  );
};

export default CircleSpinner;
