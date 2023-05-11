import SelectionBase from "../base";
import { ISelectionConfig } from "../type";

const MEMBER_CONFIG: ISelectionConfig = { type: "member", useChip: false };
export default class MemberSelection extends SelectionBase {
  protected config: ISelectionConfig = MEMBER_CONFIG;
}
