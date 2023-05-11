import * as React from "react";
import Quill from "quill";
import { createPortal } from "react-dom";
import { v4 } from "uuid";
// components
import LinkPreviewLoaderComponent from "common/components/linkPreview/loader";

const BlockEmbed = Quill.import("blots/block/embed");

const DATA_ID_KEY = "data-id";
const DATA_PLACE_ID_KEY = "data-place-id";

interface IBlotData {
  url?: string;
  placeId?: Moim.Id;
}

export const LinkPreviewCell = React.forwardRef<
  { getData: () => any },
  {
    readOnly: boolean;
    type: string;
    node: IBlotData;
    quillInst: Quill;
  }
>(({ type, node, quillInst }, ref) => {
  const getData = React.useCallback(
    () => ({
      type,
      ...node,
    }),
    [type, node],
  );

  React.useImperativeHandle(ref, () => ({
    getData,
  }));

  if (node) {
    const { url, placeId } = node;

    if (url && placeId) {
      return (
        <LinkPreviewLoaderComponent
          quill={quillInst}
          url={url}
          placeId={placeId}
        />
      );
    }
  }
  return null;
});

export default class LinkPreviewLoaderBlot extends BlockEmbed {
  public static blotName = "link-preview-loader";
  public static tagName = "figure";
  public static className = "ql-custom";
  public static ref = {};
  public static linkPreviews: Record<Moim.Id, IBlotData> = {};

  public static create(value: IBlotData) {
    const node = super.create(value);
    const id = v4();
    node.setAttribute(DATA_ID_KEY, id);
    node.setAttribute("contenteditable", false);

    if (value.placeId) {
      node.setAttribute(DATA_PLACE_ID_KEY, value.placeId);
      LinkPreviewLoaderBlot.linkPreviews[value.placeId] = value;
    } else {
      LinkPreviewLoaderBlot.linkPreviews[id] = value;
    }
    LinkPreviewLoaderBlot.data = value;
    LinkPreviewLoaderBlot.refs = {
      ...LinkPreviewLoaderBlot.refs,
      [id]: React.createRef(),
    };
    return node;
  }

  public static value(domNode: Element) {
    const id = domNode.getAttribute(DATA_ID_KEY);

    if (id) {
      const ref = LinkPreviewLoaderBlot.refs[id];
      return (ref && ref.current && ref.current.getData()) || this.data || id;
    }
    return undefined;
  }

  public attach() {
    super.attach();
    this.id = this.domNode.getAttribute(DATA_ID_KEY);
    this.placeId = this.domNode.getAttribute(DATA_PLACE_ID_KEY);
    this.data = LinkPreviewLoaderBlot.linkPreviews[this.placeId];
    this.scroll.emitter.emit("blot-mount", this);
  }

  public detach() {
    super.detach();
    this.scroll.emitter.emit("blot-unmount", this);
  }

  public renderPortal(id: string) {
    const quill = Quill.find(this.scroll.domNode.parentNode);
    const ref = LinkPreviewLoaderBlot.refs[id];

    return createPortal(
      <LinkPreviewCell
        ref={ref}
        type={LinkPreviewLoaderBlot.blotName}
        node={this.data}
        readOnly={quill.options.readOnly}
        quillInst={quill}
      />,
      this.domNode,
    );
  }
}
