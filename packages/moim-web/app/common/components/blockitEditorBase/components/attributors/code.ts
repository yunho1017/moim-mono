import Quill from "quill";
const Parchment = Quill.import("parchment");

class AttrCodeAttributor extends Parchment.ClassAttributor {
  public constructor(attrName: string, keyName: string, options: any) {
    super(attrName, keyName, options);
  }

  public add(node: HTMLElement, value: any) {
    if (!this.canAdd(node, value)) {
      return false;
    }

    if (Boolean(value)) {
      node.classList.add("ql-attr-inline");
      node.setAttribute("data-attr-inline", value);
    }

    return true;
  }

  public remove(node: HTMLElement) {
    node.classList.remove("ql-attr-inline");
    node.removeAttribute("data-attr-inline");
  }

  public value(node: HTMLElement) {
    return node.dataset.attrInline === "true";
  }
}
const AttrCodeClassAttribute = new AttrCodeAttributor(
  "attr-code",
  "ql-attr-code",
  {
    scope: Parchment.Scope.INLINE,
  },
);
export default AttrCodeClassAttribute;
