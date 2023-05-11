import Quill from "quill";

const Inline = Quill.import("blots/inline");

export class Link extends Inline {
  public static blotName = "link";
  public static tagName = "a";
  public static className = "ql-link";

  public static create(value: any) {
    const node = super.create(value);
    node.setAttribute("target", "_blank");
    node.setAttribute("data-needLinkPreview", value.needLinkPreview ?? true);
    node.setAttribute("data-hasLinkPreview", value.hasLinkPreview);
    node.setAttribute("data-placeId", value.placeId);
    node.setAttribute("href", typeof value === "string" ? value : value.link);
    return node;
  }

  public static formats(node: any) {
    return {
      link: node.getAttribute("href"),
      needLinkPreview: Boolean(node.dataset.needlinkpreview === "true"),
      hasLinkPreview: Boolean(node.dataset.haslinkpreview === "true"),
      placeId: node.dataset.placeid,
    };
  }
}
