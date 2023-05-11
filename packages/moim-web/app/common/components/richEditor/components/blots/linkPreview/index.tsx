import * as React from "react";
import Quill from "quill";
import { createPortal } from "react-dom";
import { v4 } from "uuid";
// components
import LinkPreviewComponent from "common/components/linkPreview";
import { deleteLinkPreview } from "app/common/components/richEditor/utils/linkpreview";

const BlockEmbed = Quill.import("blots/block/embed");

const DATA_ID_KEY = "data-id";
const DATA_PLACE_ID_KEY = "data-place-id";

interface IBlotData {
  linkPreviewData: Moim.Blockit.ILinkPreviewBlock;
  placeId: Moim.Id;
}

export const LinkPreviewCell = React.memo(
  React.forwardRef<
    { getData: () => any },
    {
      readOnly: boolean;
      type: string;
      node: IBlotData;
      quillInst: Quill;
    }
  >(({ type, readOnly, node, quillInst }, ref) => {
    const getData = React.useCallback(
      () => ({
        type,
        ...node,
      }),
      [type, node],
    );

    const handleClickDelete = React.useCallback(() => {
      const placeId = node.placeId;
      if (placeId) {
        deleteLinkPreview(quillInst, placeId);
      }
    }, [node.placeId, quillInst]);

    React.useImperativeHandle(ref, () => ({
      getData,
    }));

    if (node) {
      const { linkPreviewData } = node;
      if (linkPreviewData) {
        return (
          <LinkPreviewComponent
            readOnly={readOnly}
            favicon={linkPreviewData.site?.icon}
            siteName={linkPreviewData.site?.name}
            url={linkPreviewData.url}
            title={linkPreviewData.title}
            description={linkPreviewData.description}
            image={linkPreviewData.thumb?.url}
            embed={linkPreviewData.embed}
            onDeleteClick={handleClickDelete}
          />
        );
      }
    }
    return null;
  }),
);

export default class LinkPreviewBlot extends BlockEmbed {
  public static blotName = "link-preview";
  public static tagName = "figure";
  public static className = "ql-custom";
  public static ref = {};

  public static create(value: IBlotData) {
    const node = super.create(value);
    const id = v4();
    node.setAttribute(DATA_ID_KEY, id);
    node.setAttribute(DATA_PLACE_ID_KEY, value.placeId ?? id);
    node.setAttribute("contenteditable", false);

    LinkPreviewBlot.data = {
      ...value,
      placeId: value.placeId ?? id,
    };
    LinkPreviewBlot.refs = {
      ...LinkPreviewBlot.refs,
      [id]: React.createRef(),
    };
    return node;
  }

  public static value(domNode: Element) {
    const id = domNode.getAttribute(DATA_ID_KEY);

    if (id) {
      const ref = LinkPreviewBlot.refs[id];
      return (ref && ref.current && ref.current.getData()) || this.data || id;
    }
    return undefined;
  }

  public attach() {
    super.attach();
    this.id = this.domNode.getAttribute(DATA_ID_KEY);
    this.placeId = this.domNode.getAttribute(DATA_PLACE_ID_KEY);
    this.data = LinkPreviewBlot.data;
    this.scroll.emitter.emit("blot-mount", this);
  }

  public detach() {
    super.detach();
    this.scroll.emitter.emit("blot-unmount", this);
  }

  public renderPortal(id: string) {
    const quill = Quill.find(this.scroll.domNode.parentNode);
    const ref = LinkPreviewBlot.refs[id];

    return createPortal(
      <LinkPreviewCell
        ref={ref}
        quillInst={quill}
        type={LinkPreviewBlot.blotName}
        node={this.data}
        readOnly={quill.options.readOnly}
      />,
      this.domNode,
    );
  }
}
