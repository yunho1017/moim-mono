import SelectionBase from "../base";
import { ISelectionConfig } from "../type";

const STATIC_CONFIG: ISelectionConfig = { type: "static", useChip: false };
export default class StaticSelection extends SelectionBase {
  protected config: ISelectionConfig = STATIC_CONFIG;
}
