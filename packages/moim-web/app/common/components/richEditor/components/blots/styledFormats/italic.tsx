import Quill from "quill";

const Inline = Quill.import("blots/inline");

export class Italic extends Inline {
  public static blotName = "italic";
  public static tagName = "em";
  public static className = "ql-italic";

  public static create() {
    return super.create();
  }

  public static formats() {
    return true;
  }
}
