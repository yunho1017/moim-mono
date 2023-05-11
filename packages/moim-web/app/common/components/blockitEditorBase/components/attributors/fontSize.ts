import Quill from "quill";
const Parchment = Quill.import("parchment");

class AttrFontSizeAttributor extends Parchment.ClassAttributor {
  public constructor(attrName: string, keyName: string, options: any) {
    super(attrName, keyName, options);
  }

  public add(node: HTMLElement, value: any) {
    if (!this.canAdd(node, value)) {
      return false;
    }

    let fontSize = value ?? "16";
    const oldSize = node.dataset.fontSize;
    if (oldSize) {
      node.classList.remove(`ql-attr-${oldSize}`);
    }

    if (fontSize) {
      if (typeof fontSize === "number") {
        fontSize = `${fontSize}`;
      }

      node.setAttribute("data-font-size", fontSize);

      switch (fontSize) {
        case "32": {
          node.classList.add("ql-attr-32");
          break;
        }
        case "24": {
          node.classList.add("ql-attr-24");
          break;
        }
        default:
        case "16": {
          node.classList.add("ql-attr-16");
          break;
        }
        case "14": {
          node.classList.add("ql-attr-14");
          break;
        }
        case "12": {
          node.classList.add("ql-attr-12");
          break;
        }
      }
    }

    return true;
  }

  public remove(node: HTMLElement) {
    const value = this.value(node);
    if (value) {
      node.classList.remove(`ql-attr-${value}`);
      node.removeAttribute("data-font-size");
    }
  }

  public value(node: HTMLElement) {
    return node.dataset.fontSize ?? undefined;
  }
}
const AttrFontSizeClassAttribute = new AttrFontSizeAttributor(
  "fontSize",
  "ql-attr",
  {
    scope: Parchment.Scope.INLINE,
  },
);
export default AttrFontSizeClassAttribute;
