import SelectionBase from "../base";
import { ISelectionConfig } from "../type";

const BADGE_CONFIG: ISelectionConfig = { type: "badge", useChip: false };
export default class BadgeSelection extends SelectionBase {
  protected config: ISelectionConfig = BADGE_CONFIG;
}
