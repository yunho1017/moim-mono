import Quill from "quill";

const Embed = Quill.import("blots/embed");

export class Mark extends Embed {
  public static blotName = "mark";
  public static tagName = "span";
  public static className = "ql-mark";

  public static create(value: any) {
    const node = super.create(value);
    node.innerText = value.value;
    return node;
  }

  public static formats() {
    return false;
  }
}
