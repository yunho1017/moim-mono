import { ThemeColorScaleTypes } from "app/enums";
import generateColorTheme from "app/theme/color";
import generator from "../generator";

const BG_COLOR = generateColorTheme().yellow900;
const SCALE: Moim.Enums.ThemeColorScaleType = ThemeColorScaleTypes.BLACK;

export default generator({ bgColor: BG_COLOR, scale: SCALE });
