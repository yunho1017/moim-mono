import Quill, { RangeStatic } from "quill";
import shortid from "shortid";
import Delta from "quill-delta";
import { isObject } from "lodash";

export function addLinkPreviewLoader(
  quill: Quill,
  url: string,
  storedRange?: RangeStatic,
) {
  const placeId = shortid.generate();
  const range = quill.getSelection(true) ||
    storedRange || { index: 0, length: 0 };
  const type = "link-preview-loader";
  const data = {
    url,
    placeId,
  };

  const currentFormat = quill.getFormat(range);
  if (
    currentFormat.link &&
    currentFormat.link.needLinkPreview &&
    !currentFormat.link.hasLinkPreview
  ) {
    updateLinkHasPreview(quill, placeId);
  }
  quill.insertEmbed(range.index + 1, type, data);
  quill.insertText(range.index + 2, "", "silent");
}

function updateLinkHasPreview(quill: Quill, placeId: Moim.Id) {
  const contents = quill.getContents();
  const newDelta = contents.map(op => {
    if (isObject(op.attributes) && op.attributes.hasOwnProperty("link")) {
      return {
        ...op,
        attributes: {
          ...op.attributes,
          link: {
            ...(op.attributes as any).link,
            placeId,
            needLinkPreview: false,
            hasLinkPreview: true,
          },
        },
      };
    }

    return op;
  });
  quill.updateContents(contents.diff(new Delta(newDelta)), "user");
}

export function deleteLinkPreview(
  quill: Quill,
  placeId: Moim.Id,
  onlyLinkUpdate?: boolean,
) {
  const contents = quill.getContents();
  const newDelta = contents.map(op => {
    if (
      isObject(op.attributes) &&
      op.attributes.hasOwnProperty("link") &&
      (op.attributes as any).link.placeId === placeId
    ) {
      return {
        ...op,
        attributes: {
          ...op.attributes,
          link: {
            ...(op.attributes as any).link,
            needLinkPreview: false,
            hasLinkPreview: false,
          },
        },
      };
    }
    if (!onlyLinkUpdate) {
      if (
        isObject(op.insert) &&
        op.insert.hasOwnProperty("link-preview") &&
        (op.insert as Record<string, any>)["link-preview"].placeId === placeId
      ) {
        return {
          insert: "",
        };
      } else if (
        isObject(op.insert) &&
        op.insert.hasOwnProperty("link-preview-loader") &&
        (op.insert as Record<string, any>)["link-preview-loader"].placeId ===
          placeId
      ) {
        return {
          insert: "",
        };
      }
    }

    return op;
  });
  quill.updateContents(contents.diff(new Delta(newDelta)), "user");
}
