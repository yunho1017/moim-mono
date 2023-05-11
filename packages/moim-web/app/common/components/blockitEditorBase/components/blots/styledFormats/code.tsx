import Quill from "quill";

const Inline = Quill.import("blots/inline");

export class Code extends Inline {
  public static blotName = "code";
  public static tagName = "span";
  public static className = "ql-attr-inline";

  public static create() {
    return super.create();
  }

  public static formats() {
    return true;
  }
}
