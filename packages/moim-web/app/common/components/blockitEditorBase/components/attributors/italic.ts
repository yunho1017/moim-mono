import Quill from "quill";
const Parchment = Quill.import("parchment");

class AttrItalicAttributor extends Parchment.ClassAttributor {
  public constructor(attrName: string, keyName: string, options: any) {
    super(attrName, keyName, options);
  }

  public add(node: HTMLElement, value: any) {
    if (!this.canAdd(node, value)) {
      return false;
    }

    if (Boolean(value)) {
      node.classList.add("ql-italic");
      node.setAttribute("data-italic", value);
    }

    return true;
  }

  public remove(node: HTMLElement) {
    node.classList.remove("ql-italic");
    node.removeAttribute("data-italic");
  }

  public value(node: HTMLElement) {
    return node.dataset.italic === "true";
  }
}

const AttrItalicClassAttribute = new AttrItalicAttributor(
  "attr-italic",
  "ql-attr-italic",
  {
    scope: Parchment.Scope.INLINE,
  },
);

export default AttrItalicClassAttribute;
