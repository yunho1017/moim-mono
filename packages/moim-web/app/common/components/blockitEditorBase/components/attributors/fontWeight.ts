import Quill from "quill";
const Parchment = Quill.import("parchment");

class AttrFontWeightAttributor extends Parchment.ClassAttributor {
  public constructor(attrName: string, keyName: string, options: any) {
    super(attrName, keyName, options);
  }

  public add(node: HTMLElement, value: any) {
    if (!this.canAdd(node, value)) {
      return false;
    }

    node.style.fontWeight = value;
    node.setAttribute("data-font-weight", value);

    return true;
  }

  public remove(node: HTMLElement) {
    node.style.fontWeight = "inherit";
    node.removeAttribute("data-font-weight");
  }

  public value(node: HTMLElement) {
    return node.dataset.fontWeight ?? undefined;
  }
}
const AttrFontWeightClassAttribute = new AttrFontWeightAttributor(
  "attr-font-weight",
  "ql-attr-font-weight",
  {
    scope: Parchment.Scope.INLINE,
  },
);
export default AttrFontWeightClassAttribute;
