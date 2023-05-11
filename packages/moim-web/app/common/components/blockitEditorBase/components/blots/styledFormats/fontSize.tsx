import Quill from "quill";

const Inline = Quill.import("blots/inline");

export class FontSize extends Inline {
  public static blotName = "fontSize";
  public static tagName = "span";

  public static create(value: any) {
    const node = super.create(value);
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

    return node;
  }

  public static formats(node: any) {
    return node.dataset.fontSize ?? "";
  }
}
