import useTheme from "./useTheme";

function useElementThemePalette() {
  const result = useTheme();
  return result ? result.theme.elementThemePalette : undefined;
}

export default useElementThemePalette;
