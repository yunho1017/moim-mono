import Quill from "quill";
const Parchment = Quill.import("parchment");

class AttrBackgroundAttributor extends Parchment.StyleAttributor {
  public constructor(attrName: string, keyName: string, options: any) {
    super(attrName, keyName, options);
  }

  public add(node: HTMLElement, value: any) {
    if (!this.canAdd(node, value)) {
      return false;
    }
    node.style.backgroundColor = value;

    return true;
  }

  public remove(node: HTMLElement) {
    node.style.backgroundColor = "";
  }

  public value(domNode: HTMLElement) {
    let value = super.value(domNode);
    if (!value.startsWith("rgb(")) return value;
    value = value.replace(/^[^\d]+/, "").replace(/[^\d]+$/, "");
    const hex = value
      .split(",")
      .map((component: any) =>
        `00${parseInt(component, 10).toString(16)}`.slice(-2),
      )
      .join("");
    return `#${hex}`;
  }
}
const AttrBackgroundStyleAttribute = new AttrBackgroundAttributor(
  "background",
  "background-color",
  {
    scope: Parchment.Scope.INLINE,
  },
);
export default AttrBackgroundStyleAttribute;
