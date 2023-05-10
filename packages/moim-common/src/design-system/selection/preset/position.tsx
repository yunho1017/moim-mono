import SelectionBase from "../base";
import { ISelectionConfig } from "../type";

const POSITION_CONFIG: ISelectionConfig = { type: "position", useChip: true };
export default class PositionSelection extends SelectionBase {
  protected config: ISelectionConfig = POSITION_CONFIG;
}
