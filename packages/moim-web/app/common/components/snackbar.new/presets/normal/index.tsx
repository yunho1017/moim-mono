import { ThemeColorScaleTypes } from "app/enums";
import generator from "../generator";

const BG_COLOR = undefined;
const SCALE: Moim.Enums.ThemeColorScaleType = ThemeColorScaleTypes.WHITE;

export default generator({ bgColor: BG_COLOR, scale: SCALE });
