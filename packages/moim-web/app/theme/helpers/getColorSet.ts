import hexToRGBA from "./hexToRgba";

const DEFAULT_EMPTY_VALUE_COLOR_SET: Moim.Group.IColorSet = {
  fog10: "",
  fog50: "",
  fog100: "",
  fog200: "",
  fog300: "",
  fog400: "",
  fog500: "",
  fog600: "",
  fog700: "",
  fog800: "",
  fog900: "",
  fog1000: "",
  grey10: "",
  grey50: "",
  grey100: "",
  grey200: "",
  grey300: "",
  grey400: "",
  grey500: "",
  grey600: "",
  grey700: "",
  grey800: "",
  grey900: "",
  grey1000: "",
  text: "",
  white10: "",
  white50: "",
  white100: "",
  white200: "",
  white300: "",
  white400: "",
  white500: "",
  white600: "",
  white700: "",
  white800: "",
  white900: "",
  white1000: "",
};

export default function getColorSetWithRgbaConvert(
  colorSet?: Moim.Group.IColorSet,
) {
  return Object.entries(colorSet || {}).reduce<Moim.Group.IColorSet>(
    (result, [key, value]: [keyof Moim.Group.IColorSet, string]) => ({
      ...result,
      [key]: hexToRGBA(value),
    }),
    DEFAULT_EMPTY_VALUE_COLOR_SET,
  );
}
