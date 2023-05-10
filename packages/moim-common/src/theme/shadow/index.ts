import { rgba } from "polished";
import { px2rem } from "../../helpers/rem";

export default function generateShadowSet(colorSet: Moim.Group.IColorSet) {
  return {
    whiteElevated: `0 ${px2rem(2)} ${px2rem(8)} 0 ${rgba(
      colorSet.grey800 || "#FFF",
      0.2
    )}`,
    whiteElevated2: `0 ${px2rem(2)} ${px2rem(6)} ${px2rem(1)} ${
      colorSet.grey50
    }`,
    whiteElevated3: `0 ${px2rem(4)} ${px2rem(16)} 0 ${rgba(
      colorSet.grey800 || "#FFF",
      0.2
    )}`,
  };
}
