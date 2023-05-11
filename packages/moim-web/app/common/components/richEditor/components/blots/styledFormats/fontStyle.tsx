import * as React from "react";
import { createPortal } from "react-dom";
import { v4 } from "uuid";
import Quill from "quill";
import Texts from "../../blockitRenderer/components/texts";

const BlockEmbed = Quill.import("blots/embed");
const DATA_ID_KEY = "data-id";

const TextCell = React.forwardRef<
  { getData: () => any },
  {
    readOnly: boolean;
    type: string;
    node: Omit<Moim.Blockit.ITextBlock, "type">;
  }
>(({ node }, ref) => {
  const getData = React.useCallback(() => node, [node]);

  React.useImperativeHandle(ref, () => ({
    getData,
  }));

  return (
    <Texts fontStyle={node.subType} content={node.content} color={node.color} />
  );
});

export class FontStyle extends BlockEmbed {
  public static blotName = "fontStyle";
  public static tagName = "div";
  public static className = "ql-fontStyle";
  public static ref = {};

  public static create(value: any) {
    const id = v4();
    const node = super.create(value);
    node.setAttribute(DATA_ID_KEY, id);
    FontStyle.data = value;
    FontStyle.refs = {
      ...FontStyle.refs,
      [id]: React.createRef(),
    };
    return node;
  }

  public static value(domNode: Element) {
    const id = domNode.getAttribute(DATA_ID_KEY);
    if (id) {
      const ref = FontStyle.refs[id];
      return (ref && ref.current && ref.current.getData()) || id;
    }
    return undefined;
  }

  public static formats(node: any) {
    return {
      content: node.dataset.content,
      color: node.dataset.color,
      style: node.dataset.style,
    };
  }

  public attach() {
    super.attach();
    this.id = this.domNode.getAttribute(DATA_ID_KEY);
    this.data = FontStyle.data;
    this.scroll.emitter.emit("blot-mount", this);
  }

  public detach() {
    super.detach();
    this.scroll.emitter.emit("blot-unmount", this);
  }

  public renderPortal(id: string) {
    const { options } = Quill.find(this.scroll.domNode.parentNode);
    const ref = FontStyle.refs[id];
    return createPortal(
      <TextCell
        ref={ref}
        type={FontStyle.blotName}
        node={this.data}
        readOnly={options.readOnly}
      />,
      this.domNode,
    );
  }
}
