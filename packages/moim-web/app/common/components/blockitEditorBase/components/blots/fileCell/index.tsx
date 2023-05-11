import * as React from "react";
import Quill from "quill";
import { createPortal } from "react-dom";
import { v4 } from "uuid";
import { useActions, useStoreState } from "app/store";
// components
import FileViewTransition from "./components/viewTransition";
import { FileContainer } from "./styled";
import { getFileBatch as getFileBatchAction } from "app/actions/fileUpload";

const BlockEmbed = Quill.import("blots/block/embed");

const DATA_ID_KEY = "data-id";

export const FileCell = React.memo(
  React.forwardRef<
    { getData: () => any },
    {
      readOnly: boolean;
      type: string;
      node: {
        fileData: { file: File; fileId: Moim.Id };
        imageFileGroupName?: string;
        forceFullWidthFiles?: boolean;
        onFileRetry(fileId: Moim.Id, file: File): void;
        onFileDelete(fileId: Moim.Id): void;
      };
    }
  >(({ node, readOnly }, ref) => {
    const {
      fileData,
      imageFileGroupName,
      forceFullWidthFiles,
      onFileRetry,
      onFileDelete,
    } = node;
    const file = fileData.file;
    const fileId = fileData.fileId;
    const fileEntity = useStoreState(state => state.entities.files[fileId]);
    const { getFileBatch } = useActions({
      getFileBatch: getFileBatchAction,
    });

    const getData = React.useCallback(() => node, [node]);

    React.useImperativeHandle(ref, () => ({
      getData,
    }));

    React.useEffect(() => {
      if (!fileEntity) {
        getFileBatch([fileId]);
      }
    }, [fileEntity, fileId, getFileBatch]);

    React.useEffect(() => {
      if (fileEntity?.status.name === "FAILED") {
        onFileDelete(fileId);
      }
    }, [fileEntity, fileId, onFileDelete]);

    return (
      <FileContainer isSelected={false}>
        <FileViewTransition
          readonly={readOnly}
          fileId={fileId}
          originalFile={file}
          groupName={imageFileGroupName}
          previewForceFullWidth={forceFullWidthFiles}
          onFileRetry={onFileRetry}
          onFileDelete={onFileDelete}
        />
      </FileContainer>
    );
  }),
);

export default class FileCellBlot extends BlockEmbed {
  public static blotName = "fileCell";
  public static tagName = "figure";
  public static className = "ql-custom";
  public static ref = {};

  public static create(value: any) {
    const id = v4();
    const node = super.create(value);
    node.setAttribute(DATA_ID_KEY, id);
    node.setAttribute("contenteditable", false);
    FileCellBlot.data = value;
    FileCellBlot.refs = {
      ...FileCellBlot.refs,
      [id]: React.createRef(),
    };

    return node;
  }

  public static value(domNode: Element) {
    const id = domNode.getAttribute(DATA_ID_KEY);
    if (id) {
      const ref = FileCellBlot.refs[id];
      return (ref && ref.current && ref.current.getData()) ?? id;
    }
    return undefined;
  }

  public attach() {
    super.attach();
    this.id = this.domNode.getAttribute(DATA_ID_KEY);
    this.data = FileCellBlot.data;
    this.scroll.emitter.emit("blot-mount", this);
  }

  public detach() {
    super.detach();
    this.scroll.emitter.emit("blot-unmount", this);
  }

  public renderPortal(id: string) {
    const { options } = Quill.find(this.scroll.domNode.parentNode);
    const ref = FileCellBlot.refs[id];
    return createPortal(
      <FileCell
        ref={ref}
        type={FileCellBlot.blotName}
        node={this.data}
        readOnly={options.readOnly}
      />,
      this.domNode,
    );
  }
}
