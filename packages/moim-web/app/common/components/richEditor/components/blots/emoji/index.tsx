import * as React from "react";
import Quill from "quill";
import { Emoji } from "emoji-mart";
import { createPortal } from "react-dom";
import { v4 } from "uuid";
import { Wrapper } from "./styled";

const Embed = Quill.import("blots/embed");
const DATA_ID_KEY = "data-id";
const DATA_KEYWORD_KEY = "data-keyword";
const DATA_TYPE_KEY = "data-type";

export const EmojiCell = React.memo(
  React.forwardRef<
    { getData: () => any },
    {
      readOnly: boolean;
      type: string;
      node: {
        colons: string;
        native: string;
      };
    }
  >(({ node }, ref) => {
    const { colons, native } = node;
    const getData = React.useCallback(() => node, [node]);

    React.useImperativeHandle(ref, () => ({
      getData,
    }));

    if (colons && native) {
      return null;
    }

    return (
      <Wrapper>
        {colons ? <Emoji native={true} emoji={colons} size={16} /> : native}
      </Wrapper>
    );
  }),
);

export default class EmojiBlot extends Embed {
  public static blotName = "emoji";
  public static tagName = "span";
  public static className = "ql-custom-emoji";
  public static ref = {};
  public static refs: Record<string, React.RefObject<any>> = {};

  public static create(value: any) {
    const id = v4();
    const node = super.create(value);
    node.setAttribute(DATA_ID_KEY, id);
    node.setAttribute(DATA_KEYWORD_KEY, value.colons ?? value.native);
    node.setAttribute(DATA_TYPE_KEY, value.colons ? "colons" : "native");
    node.setAttribute("contenteditable", false);

    EmojiBlot.data = value;
    EmojiBlot.refs = {
      ...EmojiBlot.refs,
      [id]: React.createRef(),
    };
    return node;
  }

  public static value(domNode: Element) {
    const id = domNode.getAttribute(DATA_ID_KEY);
    const keyword = domNode.getAttribute(DATA_KEYWORD_KEY);
    const type = domNode.getAttribute(DATA_TYPE_KEY);

    if (id) {
      const ref = EmojiBlot.refs[id];
      return (
        (ref && ref.current && ref.current.getData()) ||
        (type && {
          [type]: keyword,
        }) ||
        id
      );
    }
    return undefined;
  }

  public attach() {
    super.attach();
    this.id = this.domNode.getAttribute(DATA_ID_KEY);
    const keyword = this.domNode.getAttribute(DATA_KEYWORD_KEY);
    const type = this.domNode.getAttribute(DATA_TYPE_KEY);

    this.data =
      (type && {
        [type]: keyword,
      }) ??
      EmojiBlot.data;
    this.scroll.emitter.emit("blot-mount", this);
  }

  public detach() {
    super.detach();
    this.scroll.emitter.emit("blot-unmount", this);
  }

  public renderPortal(id: string) {
    const { options } = Quill.find(this.scroll.domNode.parentNode);
    const ref = EmojiBlot.refs[id];
    return createPortal(
      <EmojiCell
        ref={ref}
        type={EmojiBlot.blotName}
        node={this.data}
        readOnly={options.readOnly}
      />,
      this.domNode,
    );
  }
}
