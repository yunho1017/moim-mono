import Quill from "quill";

const Inline = Quill.import("blots/inline");

export class Bold extends Inline {
  public static blotName = "bold";
  public static tagName = "strong";
  public static className = "ql-bold";

  public static create() {
    return super.create();
  }

  public static formats() {
    return true;
  }
}
