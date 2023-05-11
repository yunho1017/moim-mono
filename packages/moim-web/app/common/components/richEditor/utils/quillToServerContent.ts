import Delta from "quill-delta";
import { isObject } from "lodash";
import {
  parseRenderSpecMention,
  renderSpecMentionReplace,
} from "common/helpers/moimDown";
import { IFileCellInsert } from "./file";
import { IImageFileCellInsert } from "./imageFile";

const REGEX_ENTER = /\n+/g;
const REGEX_GT = />/g;
const REGEX_LT = /</g;
const REGEX_ASTERISK = /\*/g;
const REGEX_UNDERSCORE = /_/g;

interface IBlockitRendererInsert {
  "blockit-render": {
    type: "blockit-render";
    node: Moim.Blockit.IReferenceBlock;
  };
}

export default function quillToServer(delta: Delta): Moim.Blockit.Blocks[] {
  const content: Moim.Blockit.Blocks[] = [];
  const textSafeDelta = new Delta(
    delta.reduce<any[]>((acc, op) => {
      if (typeof op.insert === "string") {
        op.insert.split("\n").forEach((str, idx, arr) => {
          const text = `${str}${arr.length - 1 === idx ? "" : "\n"}`;
          if (text) {
            acc.push({
              ...op,
              insert: `${str}${arr.length - 1 === idx ? "" : "\n"}`,
            });
          }
        });
      } else {
        acc.push(op);
      }

      return acc;
    }, []),
  );

  textSafeDelta.forEach(op => {
    if (isObject(op.insert) && op.insert.hasOwnProperty("fileCell")) {
      const fileData = (op.insert as IFileCellInsert).fileCell.fileData;
      if (fileData) {
        content.push({
          type: "file",
          files: [
            {
              id: fileData.fileId,
              title: fileData.file ? fileData.file.name : fileData.fileId,
            },
          ],
        });
      }
    } else if (isObject(op.insert) && op.insert.hasOwnProperty("imageCell")) {
      const imageData = (op.insert as IImageFileCellInsert).imageCell.imageData;
      if (imageData) {
        content.push({
          type: "image",
          ...imageData,
          blurHash: imageData.blur_hash ?? imageData.blurHash,
        });
      }
    } else if (
      isObject(op.insert) &&
      op.insert.hasOwnProperty("blockit-render")
    ) {
      const data = (op.insert as IBlockitRendererInsert)["blockit-render"];
      if (data && data.node) {
        content.push(data.node);
      }
    } else if (
      isObject(op.insert) &&
      op.insert.hasOwnProperty("link-preview")
    ) {
      const data = (op.insert as Record<string, any>)["link-preview"];
      if (data && data.linkPreviewData) {
        content.push({
          type: "link-preview",
          ...data.linkPreviewData,
        });
      }
    } else if (
      isObject(op.insert) &&
      op.insert.hasOwnProperty("link-preview-loader")
    ) {
      // passthrough
    } else {
      const textWrap = "";
      const text = `${textWrap}${opTextFlatten(op as any)}${textWrap}`;

      const mentionList = parseRenderSpecMention(text);
      content.push({
        type: "text",
        content: renderSpecMentionReplace(text, mentionList),
      });
    }
  });

  const mergedBlocks: Moim.Blockit.Blocks[] = [];

  content.forEach(item => {
    const prevBlock = mergedBlocks[mergedBlocks.length - 1];
    let block = item;
    if (
      Boolean(prevBlock) &&
      prevBlock.type === "text" &&
      block.type === "text"
    ) {
      if (prevBlock.content.substring(prevBlock.content.length - 1) !== "\n") {
        mergedBlocks.pop();
        block = {
          type: "text",
          content: `${prevBlock.content}${block.content}`,
        };
      }
    }
    mergedBlocks.push(block);
  });

  return mergedBlocks
    .filter(i => Boolean(i))
    .map(block => {
      if (
        block.type === "text" &&
        block.content.substring(block.content.length - 1) === "\n"
      ) {
        return {
          ...block,
          content: block.content.substring(0, block.content.length - 1),
        };
      }

      return block;
    });
}

const opTextFlatten = (op: {
  insert?: string | Record<string, unknown>;
  attributes?: {
    bold?: boolean;
    italic?: boolean;

    color?: string;
    background?: string;

    link?: {
      link: string;
      needLinkPreview: boolean;
    };
    code?: boolean;
    fontSize?: string;
  };
}): string => {
  let styledText = op.insert as string;
  let alreadyEncoded = false;

  if (isObject(op.insert)) {
    if (op.insert.hasOwnProperty("emoji")) {
      alreadyEncoded = true;
      if (
        (op.insert as { emoji: Record<string, unknown> }).emoji.hasOwnProperty(
          "native",
        )
      ) {
        const emoji = (op.insert as {
          emoji: { native: string };
        }).emoji;
        styledText = emoji.native;
      } else {
        const emoji = (op.insert as {
          emoji: { colons: string };
        }).emoji;
        styledText = emoji.colons;
      }
    }

    if (op.insert.hasOwnProperty("mention")) {
      alreadyEncoded = true;
      const mention = (op.insert as {
        mention: { id: Moim.Id; displayText: string; fallback?: string };
      }).mention;
      styledText = `<@${mention.id}${
        mention.fallback ? `|${mention.fallback}` : ""
      }>`;
    }
  }

  const plainText = userFormatEncode(styledText).trim();
  const [enterText] = REGEX_ENTER.exec(styledText) || [""];

  if (plainText) {
    if (op.attributes?.link) {
      alreadyEncoded = true;
      const { link, needLinkPreview } = op.attributes.link;
      const displayedText = plainText;
      styledText =
        link && displayedText
          ? `<${link}|${displayedText}|${needLinkPreview}>`
          : displayedText;
    }

    if (
      op.attributes?.fontSize ||
      op.attributes?.code ||
      op.attributes?.bold ||
      op.attributes?.italic ||
      op.attributes?.color ||
      op.attributes?.background
    ) {
      let attributes: string[] = [];
      if (op.attributes?.bold) {
        attributes.push(`fw="600"`);
      }
      if (op.attributes?.italic) {
        attributes.push(`i`);
      }
      if (op.attributes?.color) {
        attributes.push(`fc="${op.attributes?.color}"`);
      }
      if (op.attributes?.background) {
        attributes.push(`bc="${op.attributes?.background}"`);
      }

      if (op.attributes?.fontSize) {
        attributes.push(`fs="${op.attributes.fontSize}"`);
      }

      if (op.attributes?.code) {
        attributes.push(`c`);
        attributes = attributes.filter(
          attr => !attr.startsWith("fc") && !attr.startsWith("bc"),
        );
      }

      styledText = `<attr ${attributes.join(" ")}>${
        alreadyEncoded ? styledText : userFormatEncode(styledText)
      }</attr>${enterText}`;

      alreadyEncoded = true;
    }
  }

  return alreadyEncoded ? styledText : userFormatEncode(styledText, true);
};

const userFormatEncode = (str: string, disableEnter?: boolean): string => {
  const encoded = str
    .replace(REGEX_GT, "&gt;")
    .replace(REGEX_LT, "&lt;")
    .replace(REGEX_ASTERISK, "&#42;")
    .replace(REGEX_UNDERSCORE, "&#95;");

  if (!disableEnter) {
    encoded.replace(REGEX_ENTER, "");
  }

  return encoded;
};
