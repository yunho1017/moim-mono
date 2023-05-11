import Quill, { RangeStatic } from "quill";
import Delta from "quill-delta";
import { isObject } from "lodash";

export interface IImageFileCellInsert {
  imageCell: {
    imageData: Moim.Blockit.ImageProps; // NOTE: TEMPORARY VALUE
    fileData: {
      fileId: Moim.Id;
      file: File;
    };
    imageFileGroupName?: string;
    forceFullWidthFiles?: boolean;
    onFileRetry(fileId: Moim.Id, file: File): void;
    onFileDelete(payload: { fileId?: Moim.Id; UId?: Moim.Id }): void;
  };
}

export function insertImageFile(
  quill: Quill,
  options: {
    imageFileGroupName?: string;
    forceFullWidthFiles?: boolean;
    onFileRetry(fileId: Moim.Id, file: File): void;
    onFileDelete(pl: { fileId?: Moim.Id; UId?: Moim.Id }): void;
  },
  payload: {
    fileData: { fileId: Moim.Id; file: File | null };
  },
  storedRange?: RangeStatic,
) {
  const range = quill.getSelection(true) ||
    storedRange || { index: 0, length: 0 };
  const type = "imageCell";
  const data = {
    ...options,
    fileData: payload.fileData,
  };

  quill.insertEmbed(range.index, type, data);
}

export function changeImageFilePayload(
  quill: Quill,
  prevFileId: Moim.Id,
  fileId: Moim.Id,
) {
  const contents = quill.getContents();
  const newDelta = contents.map(op => {
    if (
      isObject(op.insert) &&
      op.insert.hasOwnProperty("imageCell") &&
      (op.insert as IImageFileCellInsert).imageCell.fileData.fileId ===
        prevFileId
    ) {
      return {
        ...op,
        insert: {
          ...op.insert,
          imageCell: {
            ...(op.insert as IImageFileCellInsert).imageCell,
            fileData: {
              ...(op.insert as IImageFileCellInsert).imageCell.fileData,
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

export function deleteImageFileByFileId(quill: Quill, fileId: Moim.Id) {
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

export function deleteImageFileImageUID(quill: Quill, UId: Moim.Id) {
  const range = quill.getSelection();
  if (range) {
    const targetBlot = quill
      .getLines()
      .find(blot => blot.data && blot.data.id === UId);
    const targetBlotIndex = quill.getIndex(targetBlot);

    const delta = new Delta().retain(targetBlotIndex).delete(1);
    quill.updateContents(delta, "user");
    quill.setSelection(targetBlotIndex - 1, 0, "silent");
  }
}

export function getImageFileContent(quill?: Quill | null) {
  if (!quill) return [];
  const contents = quill.getContents();
  return contents.filter(
    op => isObject(op.insert) && op.insert.hasOwnProperty("imageCell"),
  );
}
