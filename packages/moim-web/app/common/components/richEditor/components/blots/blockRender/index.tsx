import * as React from "react";
import Quill from "quill";
import Delta from "quill-delta";
import { createPortal } from "react-dom";
import { v4 } from "uuid";
// components
import BlockitRenderer from "../../blockitRenderer";
import {
  Container,
  WrapperStyle,
  GridWrapperStyle,
  DeleteButtonWrapper,
  DeleteButton,
  EditableWrapperStyle,
} from "./styled";

const BlockEmbed = Quill.import("blots/block/embed");
const DATA_ID_KEY = "data-id";

export const BlockitRenderCell = React.memo(
  React.forwardRef<
    { getData: () => any },
    {
      readOnly: boolean;
      type: string;
      quill: Quill;
      domNode: HTMLElement;
      node: Moim.Blockit.Blocks;
    }
  >(({ type, node, readOnly, quill }, ref) => {
    const getData = React.useCallback(
      () => ({
        type,
        node,
      }),
      [type, node],
    );

    const handleDeleteClick: React.MouseEventHandler<HTMLDivElement> = React.useCallback(
      e => {
        e.preventDefault();
        const targetPosition = quill.getSelection();
        if (targetPosition) {
          const index = targetPosition.index - 1;
          const deleteDelta = new Delta().retain(index).delete(1);
          quill.updateContents(deleteDelta);
        }
      },
      [quill],
    );

    React.useImperativeHandle(ref, () => ({
      getData,
    }));

    return (
      <Container>
        <BlockitRenderer
          block={node}
          wrapperStyle={readOnly ? WrapperStyle : EditableWrapperStyle}
          gridWrapperStyle={GridWrapperStyle}
        />
        {!readOnly && (
          <DeleteButtonWrapper onClick={handleDeleteClick}>
            <DeleteButton />
          </DeleteButtonWrapper>
        )}
      </Container>
    );
  }),
);

export default class BlockitRender extends BlockEmbed {
  public static blotName = "blockit-render";
  public static tagName = "figure";
  public static className = "ql-blockit-render";
  public static ref = {};

  public static create(value: any) {
    const id = v4();
    const node = super.create(value);
    node.setAttribute(DATA_ID_KEY, id);
    node.setAttribute("contenteditable", false);

    BlockitRender.data = value.block;
    BlockitRender.refs = {
      ...BlockitRender.refs,
      [id]: React.createRef(),
    };
    return node;
  }

  public static value(domNode: Element) {
    const id = domNode.getAttribute(DATA_ID_KEY);
    if (id) {
      const ref = BlockitRender.refs[id];
      return (ref && ref.current && ref.current.getData()) || id;
    }
    return undefined;
  }

  public attach() {
    super.attach();
    this.id = this.domNode.getAttribute(DATA_ID_KEY);
    this.data = BlockitRender.data;
    this.scroll.emitter.emit("blot-mount", this);
  }

  public detach() {
    super.detach();
    this.scroll.emitter.emit("blot-unmount", this);
  }

  public renderPortal(id: string) {
    const quill = Quill.find(this.scroll.domNode.parentNode);
    const { options } = quill;
    const ref = BlockitRender.refs[id];
    return createPortal(
      <BlockitRenderCell
        ref={ref}
        quill={quill}
        type={BlockitRender.blotName}
        domNode={this.domNode}
        node={this.data}
        readOnly={options.readOnly}
      />,
      this.domNode,
    );
  }
}
