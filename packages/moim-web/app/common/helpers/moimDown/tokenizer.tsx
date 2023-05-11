import { defaultMemoize } from "reselect";
import emojiRegex from "emoji-regex";
import { XMLParser } from "fast-xml-parser";

const REGEXP_SPEC_BOLD = "\\*([^\\*\\n]+)?\\*";
const REGEXP_SPEC_ITALIC = "_([^_\\n]+)?_";
const REGEXP_SPEC_INLINE_CODE = "`([^`\\n]+?)`";
const REGEXP_SPEC_CODE_BLOCK = "`{3}([^]+?)`{3}";
const REGEXP_SPEC_LINK =
  "<((https|http)?:?//(|[^]+?.)[^]+?.[^]+?)(|\\|([^]+?))>";
const REGEXP_MENTION = "<(@|#)([^>]+?)(|:([^>]+?))>";
const REGEXP_ATTR = "(<[/\n\r]*attr[^>]*>)";
export const MARK_TEXT_REGEX = "<mark ([^>:]+?)>";
export const HIGHLIGHTED_TEXT_REGEX = "<highlighted ([^>:]+?)>";
export const REGEXP_EMOJI = "(:[^: \n]+?:)";
export const REGEXP_NATIVE_EMOJI = `(${emojiRegex().source})`;

const xmlParser = new XMLParser({
  allowBooleanAttributes: true,
  ignoreAttributes: false,
});

const getMentionType = (type: Moim.VGMarkDownTextView.MENTION_TYPE) => {
  switch (type) {
    case "#":
      return "channel";
    case "@":
      return "user";
  }
};

export const regexTokenizer = (
  originText: string,
): Moim.VGMarkDownTextView.IStyledToken[] => {
  const ALL_REGEXP = new RegExp(
    [
      REGEXP_ATTR,
      REGEXP_SPEC_LINK,
      REGEXP_SPEC_BOLD,
      REGEXP_SPEC_ITALIC,
      REGEXP_SPEC_INLINE_CODE,
      REGEXP_SPEC_CODE_BLOCK,
      REGEXP_MENTION,
      MARK_TEXT_REGEX,
      HIGHLIGHTED_TEXT_REGEX,
      REGEXP_EMOJI,
      REGEXP_NATIVE_EMOJI,
    ].join("|"),
    "g",
  );
  const tokens: Moim.VGMarkDownTextView.IStyledToken[] = [];
  const attrTagShard: Moim.VGMarkDownTextView.IAttrTagShard[] = [];
  let match: RegExpExecArray | null = null;

  while ((match = ALL_REGEXP.exec(originText)) !== null) {
    const [
      matchText,
      attrTag,
      linkUrl,
      ,
      ,
      ,
      linkDisplay,
      boldValue,
      italicValue,
      inlineCodeValue,
      codeBlockValue,
      mentionType,
      mentionUrl,
      ,
      mentionDisplay,
      markedText,
      highlightedText,
      emoji,
      nativeEmoji,
    ] = match;

    const offset = match.index;
    const length = matchText.trim().length;

    if (attrTagShard.length > 0 && !attrTag) {
      continue;
    }

    if (linkUrl) {
      const [displayText, isPreview] = linkDisplay
        ? linkDisplay.split("|")
        : [""];
      let href = linkUrl;
      if (linkUrl.substring(0, 2) === "//") {
        href = linkUrl.substring(2);
      }
      tokens.push({
        offset,
        length,
        type: "link",
        origin: matchText,
        data: {
          href,
          value: displayText ? displayText : href,
          isPreview: Boolean(isPreview && isPreview === "true"),
        },
      });
    } else if (mentionType && mentionUrl && mentionDisplay) {
      const mentionIdData = mentionUrl.split("|");
      tokens.push({
        offset,
        length,
        type: "mention",
        origin: matchText,
        data: {
          display: mentionDisplay,
          id: mentionIdData[0],
          fallback: mentionIdData[1],
          type: getMentionType(
            mentionType as Moim.VGMarkDownTextView.MENTION_TYPE,
          ),
        },
      });
    } else if (boldValue && boldValue.trim()) {
      tokens.push({
        offset,
        length,
        type: "bold",
        origin: matchText,
        data: {
          value: boldValue,
          innerStyles: parser(boldValue),
        },
      });
    } else if (italicValue && italicValue.trim()) {
      tokens.push({
        offset,
        length,
        type: "italic",
        origin: matchText,
        data: {
          value: italicValue,
          innerStyles: parser(italicValue),
        },
      });
    } else if (inlineCodeValue) {
      tokens.push({
        offset,
        length,
        type: "inlineCode",
        origin: matchText,
        data: {
          value: inlineCodeValue,
          innerStyles: parser(inlineCodeValue),
        },
      });
    } else if (codeBlockValue) {
      tokens.push({
        offset,
        length,
        type: "codeBlock",
        origin: matchText,
        data: {
          value: codeBlockValue,
          innerStyles: parser(codeBlockValue),
        },
      });
    } else if (emoji) {
      tokens.push({
        offset,
        length,
        type: "emoji",
        origin: matchText,
        data: {
          value: emoji,
          innerStyles: [],
        },
      });
    } else if (nativeEmoji) {
      tokens.push({
        offset,
        length,
        origin: matchText,
        type: "nativeEmoji",
        data: {
          value: nativeEmoji,
          innerStyles: [],
        },
      });
    } else if (markedText) {
      tokens.push({
        offset,
        length,
        origin: matchText,
        type: "mark",
        data: {
          value: markedText,
          innerStyles: parser(inlineCodeValue),
        },
      });
    } else if (highlightedText) {
      tokens.push({
        offset,
        length,
        origin: matchText,
        type: "highlight",
        data: {
          value: highlightedText,
          innerStyles: parser(inlineCodeValue),
        },
      });
    } else if (attrTag) {
      /**
       * NOTE: parser 에선 중첩된 경우를 허용하고 있습니다.
       * delta -> moim-down 으로 변환할때는 중첩되지 않게 해주세요.
       */
      if (attrTag.startsWith("</")) {
        const prevShard = attrTagShard.pop();
        if (prevShard) {
          const innerValue = originText.substring(
            prevShard.offset + prevShard.length,
            match.index,
          );
          const fullText = `${prevShard.matchText}${innerValue}${matchText}`;
          const parsedXml = xmlParser.parse(fullText);

          const payload: Moim.VGMarkDownTextView.IAttrTextToken = {
            offset: prevShard.offset,
            length: prevShard.length + innerValue.length + matchText.length,
            origin: fullText,
            type: "attr",
            data: {
              value: innerValue,
              innerStyles: prevShard.innerStyles,
              properties: {
                "font-color": parsedXml.attr?.["@_fc"],
                "background-color": parsedXml.attr?.["@_bc"],
                "font-weight": parsedXml.attr?.["@_fw"],
                "font-size": parsedXml.attr?.["@_fs"],
                italic: parsedXml.attr?.["@_i"],
                code: parsedXml.attr?.["@_c"],
              },
            },
          };

          if (attrTagShard.length === 0) {
            payload.data.innerStyles = parser(payload.data.value);
            tokens.push(payload);
          } else {
            if (attrTagShard[attrTagShard.length - 1].innerStyles) {
              attrTagShard[attrTagShard.length - 1].innerStyles?.push(payload);
            } else {
              attrTagShard[attrTagShard.length - 1].innerStyles = [payload];
            }
          }
        }
      } else {
        attrTagShard.push({
          offset,
          length: matchText.length,
          matchText,
        });
      }
    }
  }

  return tokens;
};

export const plainTextTokenizer = (
  originalText: string,
  styleEntityTokens: Moim.VGMarkDownTextView.IStyledToken[],
): Moim.VGMarkDownTextView.IToken[] => {
  const tokens: Moim.VGMarkDownTextView.IToken[] = [...styleEntityTokens];
  let pivot = 0;
  for (const styleEntityToken of styleEntityTokens) {
    const text = originalText.slice(pivot, styleEntityToken.offset);
    if (text) {
      tokens.push({
        offset: pivot,
        length: text.length,
        type: "text",
        data: {
          value: text,
        },
      });
    }

    pivot = styleEntityToken.offset + styleEntityToken.length;
  }

  if (pivot !== originalText.length) {
    const text = originalText.slice(pivot, originalText.length);
    tokens.push({
      offset: pivot,
      length: text.length,
      type: "text",
      data: {
        value: text,
      },
    });
  }

  return tokens;
};

export const reorderTokens = (
  tokens: Moim.VGMarkDownTextView.IToken[],
): Moim.VGMarkDownTextView.IToken[] =>
  tokens.sort((a, b) =>
    a.offset < b.offset
      ? -1
      : a.offset > b.offset
      ? 1
      : a.length < b.length
      ? -1
      : a.length > b.length
      ? 1
      : 0,
  );

const parser = defaultMemoize((text: string) => {
  if (!text) {
    return [
      {
        offset: 0,
        length: 0,
        type: "text",
        data: { value: "" },
      },
    ] as Moim.VGMarkDownTextView.IToken[];
  }
  const regexTokens = regexTokenizer(text);
  const tokens = plainTextTokenizer(text, regexTokens);
  return reorderTokens(tokens);
});

export default parser;
