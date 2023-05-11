import { DeltaOperation } from "quill";
import Delta from "quill-delta";
import shortid from "shortid";
import { isObject } from "lodash";
import { parseServerSpecMention } from "common/helpers/moimDown";
import { serverSpecMentionReplace } from "common/helpers/moimDown/replace";
import tokenizer from "common/helpers/moimDown/tokenizer";
import { selectMentionWithEntities } from "../selector";

interface IMoimDownParam {
  id: Moim.Id;
  userEntities: Moim.User.INormalizedData;
  contents: Moim.Blockit.Blocks[];
  onFileRetry(fileId: Moim.Id, file: File): void;
  onFileDelete(fileId: Moim.Id): void;
  onImageFileDelete(payload: { fileId?: Moim.Id; UId?: Moim.Id }): void;
}

export default function moimDownConvert(params: IMoimDownParam): Delta {
  const {
    id,
    userEntities,
    contents,
    onFileRetry,
    onFileDelete,
    onImageFileDelete,
  } = params;

  const nodes: Delta = new Delta([]);

  const escapeTextNodeSafe: Moim.Blockit.Blocks[] = contents.reduce(
    (acc, currContent) => {
      if (currContent.type === "text") {
        const separatedTextNode: Moim.Blockit.ITextBlock[] = currContent.content
          .split("\n")
          .map(value => ({
            ...currContent,
            content: value,
          }));
        return [...acc, ...separatedTextNode];
      } else {
        return [...acc, currContent];
      }
    },
    [],
  );

  escapeTextNodeSafe.forEach((content, index) => {
    if (content.type === "text") {
      const mentions = parseServerSpecMention(content.content);
      const mappedMentionData = selectMentionWithEntities(
        userEntities,
        mentions,
      );
      const renderSpecMentionText = serverSpecMentionReplace(
        content.content,
        mappedMentionData,
      );

      tokenizer(renderSpecMentionText).forEach(token => {
        tokenToOps(token, {
          fontStyle:
            content.subType || content.color
              ? {
                  ...content,
                }
              : undefined,
        }).forEach(op => {
          nodes.push(op);
        });
      });

      if (escapeTextNodeSafe.length - 1 !== index) {
        nodes.insert("\n");
      }
    } else if (content.type === "file") {
      if (content.files.length) {
        nodes.insert({
          fileCell: {
            fileData: {
              fileId: content.files[0].id,
            },
            imageFileGroupName: id,
            onFileRetry,
            onFileDelete,
          },
        });
      }
    } else if (content.type === "image") {
      nodes.insert({
        imageCell: {
          imageData: {
            ...content,
            blurHash: content.blur_hash ?? content.blurHash,
          },
          imageFileGroupName: id,
          onFileRetry,
          onFileDelete: onImageFileDelete,
        },
      });
    } else if (content.type === "link-preview") {
      nodes.push({
        insert: {
          "link-preview": {
            type: "link-preview",
            linkPreviewData: content,
          },
        },
      });
    } else if (
      content.type === "reference" ||
      content.type === "section" ||
      content.type === "form" ||
      content.type === "line" ||
      content.type === "button" ||
      content.type === "input" ||
      content.type === "timer" ||
      content.type === "profile" ||
      content.type === "shavedText" ||
      content.type === "list" ||
      content.type === "itemCell" ||
      content.type === "grid" ||
      content.type === "single-line-horizontal-block" ||
      content.type === "multi-line-horizontal-block" ||
      content.type === "chip" ||
      content.type === "meeting" ||
      content.type === "carousel" ||
      content.type === "category" ||
      content.type === "product-list-preview" ||
      content.type === "product-list" ||
      content.type === "calendar" ||
      content.type === "binaryTextItemCell" ||
      content.type === "menu" ||
      content.type === "banner" ||
      content.type === "content-group-preview" ||
      content.type === "content-group" ||
      content.type === "quick-link-navigation" ||
      content.type === "embed-product-list" ||
      content.type === "nft-set-preview" ||
      content.type === "nft-summary"
    ) {
      nodes.push({
        insert: {
          "blockit-render": {
            block: content,
          },
        },
      });
    }
  });

  return linkPreviewMapper(nodes);
}

interface IParentStyle {
  bold?: boolean;
  italic?: boolean;
  inlineCode?: boolean;
  fontStyle?: Omit<Moim.Blockit.ITextBlock, "type">;
}
interface ICustomOp {
  insert: string | Record<string, unknown>;
  attributes?: Record<string, unknown>;
}

function decodeText(val: string) {
  return val
    .replace(/&gt;/g, ">")
    .replace(/&lt;/g, "<")
    .replace(/&#42;/g, "*")
    .replace(/&#95;/g, "_");
}

export const tokenToOps = (
  token: Moim.VGMarkDownTextView.IToken,
  parentStyle: IParentStyle & Record<string, unknown> = {},
): ICustomOp[] => {
  const resultArray: ICustomOp[] = [];
  switch (token.type) {
    case "codeBlock":
    case "inlineCode":
    case "text": {
      const value = decodeText(token.data.value);
      if (value !== "") {
        if (parentStyle.fontStyle) {
          resultArray.push({
            insert: {
              fontStyle: {
                ...parentStyle.fontStyle,
                content: value,
              },
            },
          });
        } else {
          resultArray.push({
            insert: value,
            attributes: parentStyle,
          });
        }
      }
      break;
    }

    case "link": {
      const value = decodeText(token.data.value);
      resultArray.push({
        insert: value,
        attributes: {
          ...parentStyle,
          link: {
            link: token.data.href,
            needLinkPreview: token.data.isPreview ?? true,
            hasLinkPreview: false,
            placeId: shortid.generate(),
          },
        },
      });
      break;
    }

    case "bold": {
      token.data.innerStyles.forEach(innerToken => {
        tokenToOps(innerToken, {
          ...parentStyle,
          bold: true,
        }).forEach(element => {
          resultArray.push(element);
        });
      });
      break;
    }

    case "italic": {
      token.data.innerStyles.forEach(innerToken => {
        tokenToOps(innerToken, {
          ...parentStyle,
          italic: true,
        }).forEach(element => {
          resultArray.push(element);
        });
      });
      break;
    }

    case "mark": {
      resultArray.push({
        insert: {
          mark: {
            value: token.data.value,
          },
        },
        attributes: {
          ...parentStyle,
        },
      });
      break;
    }

    // NOTE: Skip codeblock & inlineCode
    // case "codeBlock": {
    //   token.data.innerStyles.forEach(innerToken => {
    //     tokenToOps(innerToken, {
    //       ...parentStyle,
    //       inlineCode: false,
    //     }).map(element => {
    //       resultArray.push(element);
    //     });
    //   });
    //   break;
    // }

    // case "inlineCode": {
    //   token.data.innerStyles.forEach(innerToken => {
    //     tokenToOps(innerToken, {
    //       ...parentStyle,
    //       inlineCode: true,
    //     }).forEach(element => {
    //       resultArray.push(element);
    //     });
    //   });
    //   break;
    // }

    case "emoji": {
      resultArray.push({
        insert: {
          emoji: {
            colons: token.data.value,
          },
        },
        attributes: {
          ...parentStyle,
        },
      });
      break;
    }

    case "nativeEmoji": {
      resultArray.push({
        insert: {
          emoji: {
            native: token.data.value,
          },
        },
        attributes: {
          ...parentStyle,
        },
      });
      break;
    }

    case "mention": {
      resultArray.push({
        insert: {
          mention: {
            id: token.data.id,
            displayText: token.data.display,
            fallback: token.data.fallback,
            mentionType:
              token.data.type === "user" ? "userMention" : "channelMention",
          },
        },
        attributes: {
          ...parentStyle,
        },
      });
      break;
    }

    case "attr": {
      if (token.data.innerStyles) {
        token.data.innerStyles.forEach(innerToken => {
          tokenToOps(innerToken, {
            ...parentStyle,
            color: token.data.properties["font-color"],
            background: token.data.properties["background-color"],
            italic: token.data.properties.italic,
            bold: Boolean(token.data.properties["font-weight"]),
            code: token.data.properties.code,
            fontSize: token.data.properties["font-size"],
          }).forEach(element => {
            resultArray.push(element);
          });
        });
      } else {
        const value = decodeText(token.data.value);
        resultArray.push({
          insert: value,
          attributes: {
            color: token.data.properties["font-color"],
            background: token.data.properties["background-color"],
            italic: token.data.properties.italic,
            bold: Boolean(token.data.properties["font-weight"]),
            code: token.data.properties.code,
            fontSize: token.data.properties["font-size"],
          },
        });
      }

      break;
    }
  }
  return resultArray;
};

function linkPreviewMapper(delta: Delta): Delta {
  const newOps: DeltaOperation[] = [];
  delta.forEach((op, index) => {
    if (isObject(op.insert) && op.insert.hasOwnProperty("link-preview")) {
      if (index - 2 >= 0) {
        const prevOp = newOps[index - 2];
        if (
          isObject(prevOp.attributes) &&
          prevOp.attributes.hasOwnProperty("link") &&
          (prevOp.attributes as any).link.needLinkPreview
        ) {
          newOps[index - 2] = {
            ...prevOp,
            attributes: {
              ...prevOp.attributes,
              link: {
                ...(prevOp.attributes as any).link,
                hasLinkPreview: true,
              },
            },
          };

          newOps.push({
            ...op,
            insert: {
              "link-preview": {
                ...(op.insert as Record<string, any>)["link-preview"],
                placeId: (prevOp.attributes as any).link.placeId,
              },
            },
          });

          return;
        }
      }
    }

    newOps.push(op);
  });
  return new Delta(newOps);
}
