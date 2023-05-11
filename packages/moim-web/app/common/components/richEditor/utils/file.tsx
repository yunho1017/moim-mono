import Quill, { RangeStatic } from "quill";
import Delta from "quill-delta";
import { isObject } from "lodash";

export interface IFileCellInsert {
  fileCell: {
    fileData: {
      fileId: Moim.Id;
      file: File;
    };
    imageFileGroupName?: string;
    forceFullWidthFiles?: boolean;
    onFileRetry(fileId: Moim.Id, file: File): void;
    onFileDelete(fileId: Moim.Id): void;
  };
}

export function insertFile(
  quill: Quill,
  options: {
    imageFileGroupName?: string;
    forceFullWidthFiles?: boolean;
    onFileRetry(fileId: Moim.Id, file: File): void;
    onFileDelete(fileId: Moim.Id): void;
  },
  payload: {
    fileId: Moim.Id;
    file: File | null;
  },
  storedRange?: RangeStatic,
) {
  const range = quill.getSelection(true) ||
    storedRange || { index: 0, length: 0 };
  const type = "fileCell";
  const data = {
    ...options,
    fileData: payload,
  };

  quill.insertEmbed(range.index, type, data);
}

export function changeFilePayload(
  quill: Quill,
  prevFileId: Moim.Id,
  fileId: Moim.Id,
) {
  const contents = quill.getContents();
  const newDelta = contents.map(op => {
    if (
      isObject(op.insert) &&
      op.insert.hasOwnProperty("fileCell") &&
      (op.insert as IFileCellInsert).fileCell.fileData.fileId === prevFileId
    ) {
      return {
        ...op,
        insert: {
          ...op.insert,
          fileCell: {
            ...(op.insert as IFileCellInsert).fileCell,
            fileData: {
              ...(op.insert as IFileCellInsert).fileCell.fileData,
              fileId,
            },
          },
        },
      };
    }

    return op;
  });

  quill.setContents(new Delta(newDelta), "user");
}

export function deleteFile(quill: Quill, fileId: Moim.Id) {
  const range = quill.getSelection();
  if (range) {
    const targetBlot = quill
      .getLines()
      .find(
        blot =>
          blot.data &&
          blot.data.fileData &&
          blot.data.fileData.fileId === fileId,
      );
    const targetBlotIndex = quill.getIndex(targetBlot);

    const delta = new Delta().retain(targetBlotIndex).delete(1);
    quill.updateContents(delta, "user");
    quill.setSelection(targetBlotIndex - 1, 0, "silent");
  }
}

export function getFileContent(quill?: Quill | null) {
  if (!quill) return [];
  const contents = quill.getContents();
  return contents.filter(
    op => isObject(op.insert) && op.insert.hasOwnProperty("fileCell"),
  );
}
